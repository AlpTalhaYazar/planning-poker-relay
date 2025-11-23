import { z } from 'zod';

const baseEnvelopeSchema = z.object({
  sessionId: z.string().min(1),
  timestamp: z.string().datetime().optional(),
  nonce: z.string().min(8).optional(),
});

const snapshotEvent = baseEnvelopeSchema.extend({
  event: z.literal('session.snapshot'),
  payload: z.object({
    snapshot: z.record(z.string(), z.unknown()).optional(),
  }),
});

const voteCastEvent = baseEnvelopeSchema.extend({
  event: z.literal('vote.cast'),
  payload: z.object({
    issueKey: z.string().min(1),
    participantId: z.string().min(1),
    value: z.string().min(1).optional(),
  }),
});

const votesClearedEvent = baseEnvelopeSchema.extend({
  event: z.literal('votes.cleared'),
  payload: z.object({
    issueKey: z.string().min(1),
    actorId: z.string().min(1),
  }),
});

const issueRevealedEvent = baseEnvelopeSchema.extend({
  event: z.literal('issue.revealed'),
  payload: z.object({
    issueKey: z.string().min(1),
    actorId: z.string().min(1),
  }),
});

const issueAdvanceEvent = baseEnvelopeSchema.extend({
  event: z.literal('issue.advance'),
  payload: z.object({
    fromIssueKey: z.string().min(1).optional(),
    toIssueKey: z.string().min(1),
    actorId: z.string().min(1),
  }),
});

const participantJoinedEvent = baseEnvelopeSchema.extend({
  event: z.literal('participant.joined'),
  payload: z.object({
    participantId: z.string().min(1),
    displayName: z.string().min(1),
  }),
});

const participantLeftEvent = baseEnvelopeSchema.extend({
  event: z.literal('participant.left'),
  payload: z.object({
    participantId: z.string().min(1),
  }),
});

const sessionJoinedEvent = baseEnvelopeSchema.extend({
  event: z.literal('session.joined'),
  payload: z.object({
    participantId: z.string().min(1),
    displayName: z.string().min(1),
  }),
});

const sessionBacklogUpdatedEvent = baseEnvelopeSchema.extend({
  event: z.literal('session.backlogUpdated'),
  payload: z.object({
    issueCount: z.number().int().min(0),
    actorId: z.string().min(1),
  }),
});

const sessionStartedEvent = baseEnvelopeSchema.extend({
  event: z.literal('session.started'),
  payload: z.object({
    actorId: z.string().min(1),
  }),
});

const participantReadyEvent = baseEnvelopeSchema.extend({
  event: z.literal('participant.ready'),
  payload: z.object({
    participantId: z.string().min(1),
    isReady: z.boolean(),
  }),
});

export const relayEventEnvelopeSchema = z.discriminatedUnion('event', [
  snapshotEvent,
  voteCastEvent,
  votesClearedEvent,
  issueRevealedEvent,
  issueAdvanceEvent,
  participantJoinedEvent,
  participantLeftEvent,
  sessionJoinedEvent,
  sessionJoinedEvent,
  sessionBacklogUpdatedEvent,
  sessionStartedEvent,
  participantReadyEvent,
]);

export type RelayEventEnvelope = z.infer<typeof relayEventEnvelopeSchema>;
export type RelayEventName = RelayEventEnvelope['event'];

export type RelayEventPayload<Name extends RelayEventName = RelayEventName> = Extract<
  RelayEventEnvelope,
  { event: Name }
>['payload'];

export type RelayEventPayloads = {
  [Name in RelayEventName]: RelayEventPayload<Name>;
};
