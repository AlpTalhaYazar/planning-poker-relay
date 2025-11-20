// src/index.ts
import { z } from "zod";
var baseEnvelopeSchema = z.object({
  sessionId: z.string().min(1),
  timestamp: z.string().datetime().optional(),
  nonce: z.string().min(8).optional()
});
var snapshotEvent = baseEnvelopeSchema.extend({
  event: z.literal("session.snapshot"),
  payload: z.object({
    snapshot: z.record(z.string(), z.unknown()).optional()
  })
});
var voteCastEvent = baseEnvelopeSchema.extend({
  event: z.literal("vote.cast"),
  payload: z.object({
    issueKey: z.string().min(1),
    participantId: z.string().min(1),
    value: z.string().min(1).optional()
  })
});
var votesClearedEvent = baseEnvelopeSchema.extend({
  event: z.literal("votes.cleared"),
  payload: z.object({
    issueKey: z.string().min(1),
    actorId: z.string().min(1)
  })
});
var issueRevealedEvent = baseEnvelopeSchema.extend({
  event: z.literal("issue.revealed"),
  payload: z.object({
    issueKey: z.string().min(1),
    actorId: z.string().min(1)
  })
});
var issueAdvanceEvent = baseEnvelopeSchema.extend({
  event: z.literal("issue.advance"),
  payload: z.object({
    fromIssueKey: z.string().min(1).optional(),
    toIssueKey: z.string().min(1),
    actorId: z.string().min(1)
  })
});
var participantJoinedEvent = baseEnvelopeSchema.extend({
  event: z.literal("participant.joined"),
  payload: z.object({
    participantId: z.string().min(1),
    displayName: z.string().min(1)
  })
});
var participantLeftEvent = baseEnvelopeSchema.extend({
  event: z.literal("participant.left"),
  payload: z.object({
    participantId: z.string().min(1)
  })
});
var sessionJoinedEvent = baseEnvelopeSchema.extend({
  event: z.literal("session.joined"),
  payload: z.object({
    participantId: z.string().min(1),
    displayName: z.string().min(1)
  })
});
var sessionBacklogUpdatedEvent = baseEnvelopeSchema.extend({
  event: z.literal("session.backlogUpdated"),
  payload: z.object({
    issueCount: z.number().int().min(0),
    actorId: z.string().min(1)
  })
});
var relayEventEnvelopeSchema = z.discriminatedUnion("event", [
  snapshotEvent,
  voteCastEvent,
  votesClearedEvent,
  issueRevealedEvent,
  issueAdvanceEvent,
  participantJoinedEvent,
  participantLeftEvent,
  sessionJoinedEvent,
  sessionBacklogUpdatedEvent
]);
export {
  relayEventEnvelopeSchema
};
//# sourceMappingURL=index.js.map