# Planning Poker Relay

Realtime relay service that keeps Jira Planning Poker participants synchronized via Socket.IO. Fastify handles HTTP concerns (health checks, publish endpoint, security headers) while Socket.IO fans out events to per-session rooms after validating short-lived JWTs issued by the Forge backend.

## Prerequisites

- Node.js 20 LTS+
- npm 10+
- Optional: Docker + ngrok for exposing the relay to Forge during local development

## Getting Started

1. Copy `.env.example` to `.env` and provide secure values for `JWT_SIGNING_SECRET` and `RELAY_API_KEY`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the dev server with automatic restarts:
   ```bash
   npm run dev
   ```
4. Build and run the production bundle:
   ```bash
   npm run build
   npm start
   ```

### Docker Compose

Run the relay (and optional Redis placeholder) inside containers:

```bash
docker compose up --build relay
```

The service reads `.env` for configuration. Extend `docker-compose.yml` when you introduce Redis-backed scaling or tunneling helpers.

## Scripts

- `npm run dev` – start Fastify + Socket.IO with `tsx` watcher.
- `npm run build` – bundle via `tsup` (ESM output under `dist/`).
- `npm run start` – run the compiled server.
- `npm run lint` / `lint:fix` – ESLint.
- `npm run typecheck` – strict TypeScript compile without emitting files.
- `npm run format` / `format:fix` – Prettier.
- `npm run token:mint` – mint a short-lived JWT for Socket.IO tests (see `docs/security/token-strategy.md`).

## Endpoint Overview

| Method | Path | Description |
| --- | --- | --- |
| GET | `/healthz` | Liveness probe. |
| GET | `/readyz` | Readiness probe. |
| POST | `/events` | Forge backend publishes session events (requires `X-Relay-Key` or `Authorization` header). |

Socket clients connect with `io(RELAY_URL, { auth: { token } })`; the relay verifies the JWT and joins the client to `sessionId` room for targeted event delivery.

## Token Contract & Security

`docs/security/token-strategy.md` documents claim requirements, rotation procedures, and the CLI workflow for minting test tokens. Ensure Forge and this relay share the same `JWT_SIGNING_SECRET` so handshakes succeed.
