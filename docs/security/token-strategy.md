# Token Strategy

This relay trusts Forge-generated JSON Web Tokens (JWT) to authenticate WebSocket clients and authorize event publishing. Every token is short-lived (≤5 minutes) and scoped to a single session so it cannot be replayed elsewhere.

## Claims

| Claim | Description |
| --- | --- |
| `sub` | Jira accountId of the participant. |
| `sessionId` | Planning Poker session identifier; doubles as the Socket.IO room name. |
| `scope` | Array of permissions. Currently `subscribe` (required) and optional future values such as `publish`. |
| `iat` | Issued-at timestamp (seconds). |
| `exp` | Expiration timestamp (seconds). |
| `jti` | Unique token id for auditing and optional revocation. |

Tokens are signed with HS256, using `JWT_SIGNING_SECRET` stored both in Forge (via environment variables/secrets) and this relay. Rotate the secret quarterly or whenever compromise is suspected.

## Minting Tokens

During development, you can mint tokens locally:

```bash
npm run token:mint -- --session SESSION_ID --account ACCOUNT_ID --ttl 600
```

Optional flags:

- `--scope subscribe,admin` to add extra scopes
- `--ttl <seconds>` (default `300`)
- `SESSION_ID`, `ACCOUNT_ID`, `TOKEN_TTL` environment variables can substitute CLI flags

The script reads `.env` to obtain `JWT_SIGNING_SECRET` and prints a ready-to-use token along with a sample Socket.IO connection snippet.

## Validation Flow

1. Forge resolver validates the user action, then calls `POST /events` with the internal API key.
2. Forge also mints a JWT for the participant and sends it back to the Custom UI.
3. The browser connects via Socket.IO, providing the JWT in `auth.token` or `Authorization` header.
4. `verifySocketToken` (`src/security/token.ts`) verifies signature + claims and joins the socket to the matching `sessionId` room.

If verification fails, the connection is rejected with an `Unauthorized` error.

## Rotation Procedure

1. Generate a new random 32+ character secret.
2. Update `JWT_SIGNING_SECRET` in Forge environments (dev/stage/prod) and deploy the backend.
3. Update this relay’s environment variables (e.g., via `.env`, hosting secrets, or `docker-compose` overrides) and restart the service.
4. Revoke outstanding tokens by changing the secret—existing tokens immediately fail verification.

Document rotations in the Operational Playbook (`docs/04-operational-playbook.md`) along with timestamps and operators.
