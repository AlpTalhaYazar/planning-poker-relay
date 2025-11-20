# @planning-poker/relay-events

Shared event contracts for the Planning Poker relay and integrations. Provides the canonical Zod schemas and TypeScript types so the relay and client apps agree on event names and payload shapes.

## Events

- `session.snapshot` — `{ snapshot?: Record<string, unknown> }`
- `vote.cast` — `{ issueKey: string; participantId: string; value?: string }` (value is optional to keep votes private until reveal)
- `votes.cleared` — `{ issueKey: string; actorId: string }`
- `issue.revealed` — `{ issueKey: string; actorId: string }`
- `issue.advance` — `{ fromIssueKey?: string; toIssueKey: string; actorId: string }`
- `participant.joined` — `{ participantId: string; displayName: string }`
- `participant.left` — `{ participantId: string }`
- `session.joined` — `{ participantId: string; displayName: string }`
- `session.backlogUpdated` — `{ issueCount: number; actorId: string }`

## Usage

```ts
import {
  relayEventEnvelopeSchema,
  type RelayEventName,
  type RelayEventPayload,
} from '@planning-poker/relay-events';

function handleEnvelope(envelope: unknown) {
  const parsed = relayEventEnvelopeSchema.parse(envelope);
  const payload: RelayEventPayload<typeof parsed.event> = parsed.payload;
  // your logic
}
```

If you publish this package to npm/GitHub Packages, consumers can install it with:

```bash
npm install @planning-poker/relay-events
```
