# High-Level Backlog

## 1. Foundation

1. **Repo bootstrap** – Node/TS setup, lint/test config.
2. **Local Docker compose** – relay + Redis + ngrok helper container.
3. **Health endpoints** – `/healthz`, `/readyz`.

## 2. Security

1. JWT signing utilities shared with Forge repo (publish as private npm package?).
2. API key rotation tooling (`scripts/rotate-api-key.ts`).
3. Rate limiting middleware instrumentation.

## 3. Core Relay Features

1. Token validation + room join handshake (Socket.IO middleware).
2. Event bus abstraction (in-memory + Redis implementation).
3. Publish endpoint with schema validation and idempotency cache.
4. Delivery acknowledgements: optional `ack` path so Forge can confirm fan-out.

## 4. Observability

1. Structured logging (request/response IDs, session IDs).
2. Metrics exporter (Prometheus) + dashboards.
3. Alert definitions stored as code (e.g., Grafana JSON, Terraform).

## 5. Tooling

1. Load test scenarios (artillery scripts) for join/vote/reveal flows.
2. Chaos testing script to simulate Redis outages and verify failover.
3. Integration test harness that spins up relay and hits endpoints (using Vitest + supertest).

## 6. Documentation Tasks

1. Security doc for token & secret management.
2. API reference (OpenAPI) to share with Forge team.
3. Runbook templates for incidents.
4. Postmortem template (Markdown) stored in `docs/postmortems/template.md`.

## 7. Stretch Goals

- Multi-tenancy support (namespacing by Jira site ID).
- Pluggable transports (SSE fallback, MQTT?).
- UI dashboard for live session monitoring.
- Auto-scaling policies codified via Terraform.
