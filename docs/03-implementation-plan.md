# Socket Relay Implementation Plan

## Phase 0 – Repo & Environment Setup

**Goal:** Foundational project structure with CI/CD ready.

- Create Node.js/TypeScript monorepo (pnpm or npm) with Fastify + Socket.IO skeleton.
- Configure linting (ESLint), formatting (Prettier), testing (Vitest/Jest), commit hooks.
- Add Dockerfile, `.nvmrc`, `.editorconfig`, and environment templates.
- CI pipeline (GitHub Actions) runs lint + tests on PRs, builds Docker image on `main`.
- Define environment secrets (JWT_SIGNING_SECRET, RELAY_API_KEY, REDIS_URL*).
- Deliverable: “hello world” Socket.IO server reachable locally and via tunnel.

## Phase 1 – Auth & Connection Lifecycle

**Goal:** Secure socket connections with Forge-issued tokens.

- Implement JWT validation middleware (HS256) with claims validation.
- Add `/healthz` and `/info` endpoints.
- Handle connect/disconnect events, maintain metrics for active sessions.
- Provide sample script to mint tokens (for local testing) and document handshake flow.
- Acceptance: client with valid token joins correct room; invalid tokens rejected.

## Phase 2 – Event Publish API

**Goal:** Allow Forge to broadcast events safely.

- Implement `POST /events` with schema validation (TypeBox/Zod) and API key auth.
- Support idempotency via `nonce` header to prevent duplicate fan-out.
- Emit events to rooms with metadata envelope: `{ type, payload, issuedAt }`.
- Add structured logging (pino) for publish actions, including latency metrics.
- Write unit tests for validator + handler + event bus stub.

## Phase 3 – Resilience & Observability

**Goal:** Production readiness.

- Integrate Prometheus metrics endpoint and log shipping (JSON logs).
- Add rate limiting (per IP/session) using Fastify plugins.
- Implement exponential backoff for Redis adapter (if enabled) and automatic reconnection.
- Provide runbooks for outages (Redis down, spike in traffic, auth failures).
- Load test with artillery/k6 to validate throughput goals.

## Phase 4 – Multi-Instance Scaling (Optional at launch)

- Introduce Redis adapter for Socket.IO to support >1 instance.
- Terraform or platform config for managed Redis (Upstash, Redis Enterprise, etc.).
- Blue/green deploy strategy documented.

## Phase 5 – Nice-to-haves

- Admin endpoints (secured) to list active sessions and force disconnects.
- Signed webhooks to external analytics pipeline.
- Automatic fallback to polling if relay unreachable (coordination with frontend).

## Delivery Checklist

- [ ] Architecture diagram updated when scope changes.
- [ ] Security review complete (JWT rotation, API key storage).
- [ ] Load test evidence stored in `/docs/perf-tests` (to be created later).
- [ ] Release notes template for future iterations.
