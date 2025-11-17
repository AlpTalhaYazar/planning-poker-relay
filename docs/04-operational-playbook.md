# Operational Playbook

## 1. Environments

| Env | Purpose | Hosting | Notes |
| --- | --- | --- | --- |
| Local | Developer iteration | Docker Compose + ngrok | Uses mock JWT signer. |
| Dev | Integration w/ Forge dev site | PaaS (Render/Fly) | Single instance, no Redis. |
| Stage | Pre-prod load & chaos testing | Same as prod | Mirrors prod config, includes Redis. |
| Prod | Customer traffic | Redundant instances + Redis | Autoscaling + monitoring. |

## 2. Configuration Matrix

| Variable | Description | Example |
| --- | --- | --- |
| `JWT_SIGNING_SECRET` | Shared secret w/ Forge backend | Random 64-char string |
| `RELAY_API_KEY` | API key for `/events` endpoint | `relay_dev_abc123` |
| `REDIS_URL` | Optional; enables multi-node adapter | `rediss://:<pwd>@host:port` |
| `LOG_LEVEL` | `info`/`debug`| `info` |
| `ALLOWED_ORIGINS` | CSV of domains allowed to open sockets | `https://*.atlassian.net` |

Secrets stored via platform-specific secret store; never committed.

## 3. Monitoring & Alerting

- **Metrics**: `connected_clients`, `events_per_second`, `publish_errors`, `latency_ms`, `socket_disconnects`, `rate_limiter_blocked`.
- **Dashboards**: Build Grafana panels for overall load, per-session distribution, and error spike detection.
- **Alerts**: PagerDuty/Slack when publish error rate > 1% for 5 min, or active connections drop sharply (possible outage).

## 4. Incident Response

1. **Triage**: Identify scope (single region vs all). Review logs for auth failures, rate limits, or Redis disconnects.
2. **Contain**: If API key compromised, rotate `RELAY_API_KEY` and restart instances. If JWT secret leaks, update Forge + relay secrets simultaneously.
3. **Mitigate**: Scale out to handle spikes, or toggle feature flag to revert clients to polling.
4. **Postmortem**: Document timeline, root cause, follow-up actions in repo `/docs/postmortems/` (future folder).

## 5. Deployment Workflow

1. Developer opens PR with changes + updated docs/tests.
2. GitHub Actions runs tests + lint; if green, reviewer approves.
3. Merge to `main` triggers image build + push.
4. ArgoCD / Render auto deploys dev environment. Manual promotion to stage/prod with change tickets.
5. After deploy, monitor dashboards for 30 minutes. Roll back via previous container image if necessary.

## 6. Local Development Notes

- Use `.env.local` for secrets; run `docker compose up relay redis` to start server + Redis.
- For Forge integration, expose relay via `ngrok http 3000` and set `RELAY_BASE_URL` env variable in Forge.
- Test script `scripts/mock-publish.ts` will send sample events for manual verification.

## 7. Compliance & Security

- Perform dependency scanning (npm audit, Snyk) each release.
- Ensure TLS certificates auto-renew (Let’s Encrypt via hosting provider).
- Log retention: 30 days raw logs, archived to S3/Cloud storage for 6 months.
- Access control: limit production access to designated engineers, use SSO + MFA for hosting provider.

## 8. Documentation Hygiene

- Keep this playbook updated per release.
- Add runbooks for new failure modes (e.g., Redis failover, CPU saturation).
- Document token format and rotation schedule in `/docs/security/token-strategy.md` (future file).
