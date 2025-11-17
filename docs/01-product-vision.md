# Socket Relay Service – Product Vision

## 1. Purpose

Provide a dedicated realtime relay that keeps Jira Planning Poker participants in sync without polling. The relay exposes a minimal HTTPS API for Forge functions to publish session events and maintains persistent WebSocket connections (Socket.IO) so browsers receive updates instantly.

## 2. Goals

- **Sub-second alignment** between moderators and participants after any action (join, vote, reveal, advance issue).
- **Stateless, horizontally scalable** service that keeps shared session data small (only transient messages, no canonical state).
- **Secure by default** with short-lived signed tokens from Forge so only Jira users in a session can subscribe and publish.
- **Operational simplicity**: easy to deploy, monitor, and roll back; dev prod parity via Infrastructure-as-Code and containers.

## 3. Success Metrics

| Metric | Target |
| --- | --- |
| Median event fan-out latency | < 250 ms |
| Connection recovery success rate | > 99% reconnects within 5 seconds |
| Error budget | < 0.5% failed publishes per week |
| Operational toil | < 1 on-call page per quarter |

## 4. Target Users

- **Planning Poker frontend**: subscribes to session channels.
- **Forge backend functions**: call a REST endpoint to broadcast events.
- Future consumers (analytics, other in-app modules) can subscribe to the same channels if authorized.

## 5. Non-Goals (initial release)

- Persisting historical events or acting as the source of truth (Forge storage remains canonical).
- Integrating with Atlassian Forge Realtime (the relay is a fallback until that product is GA).
- Handling binary payloads or attachments; JSON-only payloads keep the API simple.

## 6. Constraints & Assumptions

- Service must be reachable over the public internet via HTTPS/WSS; Forge cannot reach localhost.
- Each Forge call should complete within 2 seconds, so publishing must stay lightweight.
- Multi-tenant safety: a token minted for session `A` must not join or publish to session `B`.

## 7. Guiding Principles

1. **Small surface area** – only the functionality required for Planning Poker.
2. **Security first** – treat tokens like credentials, rotate keys, add rate limiting.
3. **Observability baked in** – structured logs, metrics, tracing hooks from day one.
4. **Document everything** – this docs folder explains architecture, processes, and future work so the team can onboard quickly.
