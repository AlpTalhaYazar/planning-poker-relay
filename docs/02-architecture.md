# Socket Relay Architecture & Technical Decisions

## 1. System Overview

```
Forge Function  ──HTTP POST /events────▶  Relay API Layer ───▶ Socket.IO Rooms ──▶ Browser Clients
                        ▲                                           │
                        │                                           │
            Token Issuer (Forge)                         Redis Pub/Sub (optional)
```

1. **Publish Path**
   - Forge backend validates the action (join, vote, reveal, apply estimate) and writes canonical state to Forge storage.
   - After persistence, Forge `POST`s a JSON payload to the relay (signed with the shared secret).
   - Relay authenticates the request, enriches metadata, and emits to the Socket.IO room for `sessionId`.

2. **Subscribe Path**
   - Forge generates a signed JWT when a user joins a session and returns it to the Custom UI.
   - The frontend opens a WSS connection to the relay, sends the token, and joins the designated room.
   - Events delivered via Socket.IO update React state immediately.

## 2. Technology Choices

| Layer | Decision | Rationale |
| --- | --- | --- |
| Runtime | Node.js 20 + TypeScript | Consistent with existing repo, strong Socket.IO ecosystem. |
| WebSocket server | Socket.IO 4.x | Provides rooms, reconnection, fallbacks, ack support; simplifies client integration. |
| HTTP framework | Fastify or NestJS (Fastify preferred) | High-performance JSON parsing, built-in schema validation. |
| Auth | JWT (HS256) signed by Forge secret, exp ≤ 5 min | Easy to mint/verify, works offline, prevents replay. |
| Deployment | Containerized (Docker) on Render/Fly/Railway (TBD) | Simple WSS hosting, supports TLS termination. |
| Optional state bus | Redis (Managed) | Enables multi-instance scaling without sticky sessions. |

## 3. API Design

### 3.1 Publish Endpoint (`POST /events`)

Request:
```json
{
  "sessionId": "abc-123",
  "event": "vote.cast",
  "payload": { "issueKey": "SCRUM-1", "value": "5", "participantId": "acct-123" },
  "nonce": "uuid",
  "timestamp": "2024-05-01T10:00:00Z"
}
```

Headers: `Authorization: Bearer <relay-secret>` or HMAC signature header.

Response: `202 Accepted` when enqueued.

### 3.2 Token Exchange (`POST /tokens`)

- Called by Forge to mint a signed token for a user + session.
- Alternatively, tokens are minted in Forge and the relay only verifies (preferred to minimize endpoints). In that model no `/tokens` endpoint exists; instead the relay exposes `/socket/auth` to validate handshake tokens.

### 3.3 Client Connection Flow

1. Browser obtains token from Forge via `joinSession` response.
2. `const socket = io(RELAY_URL, { auth: { token } });`
3. Server middleware verifies token (signature, expiry, session membership) before `socket.join(sessionRoom)`.
4. Events emitted as `socket.emit('event', {...})` with simple envelope.

## 4. Security Considerations

- **Token claims**: `{ sub: accountId, sessionId, scope: ['subscribe'], exp, iat, jti }`.
- **Revocation**: include short expiry (≤5 min) and rely on Forge polling to refresh; optionally store `jti` in Redis deny list if manual revocation is needed.
- **Rate limiting**: API endpoint limited per IP + per session to thwart abuse; Socket.IO connection attempts limited per account.
- **Secret rotation**: store signing secret in the relay’s environment variables; rotate quarterly and propagate to Forge.
- **CORS/TLS**: enforce HTTPS/WSS only, with HSTS and WebSocket origin checks.

## 5. Scalability & Performance

- Single instance (no Redis) supports ~5k concurrent connections; beyond that enable Redis adapter so multiple replicas share room membership.
- Health checks: `/healthz` (internal), `/readyz` (ensures Redis reachable when enabled).
- Metrics: capture `publish_latency`, `connected_clients`, `events_per_session`, `errors_by_type` via Prometheus or StatsD.

## 6. Deployment Strategy

1. Build Docker image (multi-stage for Node + dist).
2. Push to registry (GHCR or Docker Hub).
3. Deploy via chosen platform with auto TLS (Render, Fly, Railway). Each environment (dev/stage/prod) has dedicated secrets and optional Redis.
4. CI pipeline runs lint, tests, vulnerability scan, and publishes tagged images.

## 7. Future Enhancements

- Support outbound webhooks for analytics.
- Allow optional persistence (Kafka/SQS) for replay / auditing.
- Add admin dashboard for monitoring sessions live.
- Evaluate migrating to Forge Realtime once GA; keep relay modular so we can sunset gracefully.
