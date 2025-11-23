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

const participantStatusChangedEvent = baseEnvelopeSchema.extend({
  event: z.literal('participant.status.changed'),
  payload: z.object({
    participantId: z.string().min(1),
    status: z.enum(['online', 'away', 'offline']),
  }),
});

const participantRoleChangedEvent = baseEnvelopeSchema.extend({
  event: z.literal('participant.role.changed'),
  payload: z.object({
    participantId: z.string().min(1),
    isObserver: z.boolean(),
    isModerator: z.boolean(),
  }),
});

const sessionPausedEvent = baseEnvelopeSchema.extend({
  event: z.literal('session.paused'),
  payload: z.object({
    actorId: z.string().min(1),
  }),
});

const sessionResumedEvent = baseEnvelopeSchema.extend({
  event: z.literal('session.resumed'),
  payload: z.object({
    actorId: z.string().min(1),
  }),
});

const sessionCompletedEvent = baseEnvelopeSchema.extend({
  event: z.literal('session.completed'),
  payload: z.object({
    completedAt: z.string().datetime(),
    actorId: z.string().min(1),
    summary: z.object({
      totalIssues: z.number(),
      estimatedIssues: z.number(),
      skippedIssues: z.number(),
      duration: z.number(),
    }),
  }),
});

const sessionSettingsUpdatedEvent = baseEnvelopeSchema.extend({
  event: z.literal('session.settings.updated'),
  payload: z.object({
    actorId: z.string().min(1),
    settings: z.object({
      autoReveal: z.boolean().optional(),
      allowChangeVote: z.boolean().optional(),
      timerEnabled: z.boolean().optional(),
      timerSeconds: z.number().optional(),
    }),
  }),
});

const voteUpdatedEvent = baseEnvelopeSchema.extend({
  event: z.literal('vote.updated'),
  payload: z.object({
    issueKey: z.string().min(1),
    participantId: z.string().min(1),
    previousValue: z.string().optional(),
    newValue: z.string().optional(),
    updatedAt: z.string().datetime(),
  }),
});

const voteRetractedEvent = baseEnvelopeSchema.extend({
  event: z.literal('vote.retracted'),
  payload: z.object({
    issueKey: z.string().min(1),
    participantId: z.string().min(1),
  }),
});

const issueSkippedEvent = baseEnvelopeSchema.extend({
  event: z.literal('issue.skipped'),
  payload: z.object({
    issueKey: z.string().min(1),
    actorId: z.string().min(1),
    reason: z.string().optional(),
  }),
});

const consensusReachedEvent = baseEnvelopeSchema.extend({
  event: z.literal('consensus.reached'),
  payload: z.object({
    issueKey: z.string().min(1),
    consensusValue: z.string().min(1),
    voteCounts: z.record(z.string(), z.number()),
    consensusType: z.enum(['unanimous', 'majority', 'moderator-override']),
  }),
});

const estimateAppliedEvent = baseEnvelopeSchema.extend({
  event: z.literal('estimate.applied'),
  payload: z.object({
    issueKey: z.string().min(1),
    estimateValue: z.string().min(1),
    appliedBy: z.string().min(1),
    appliedAt: z.string().datetime(),
  }),
});

const voteTimerStartedEvent = baseEnvelopeSchema.extend({
  event: z.literal('votes.timer.started'),
  payload: z.object({
    issueKey: z.string().min(1),
    actorId: z.string().min(1),
    durationSeconds: z.number().int().positive(),
    endsAt: z.string().datetime(),
  }),
});

const voteTimerExpiredEvent = baseEnvelopeSchema.extend({
  event: z.literal('votes.timer.expired'),
  payload: z.object({
    issueKey: z.string().min(1),
    autoReveal: z.boolean(),
  }),
});

export const relayEventEnvelopeSchema = z.discriminatedUnion('event', [
  snapshotEvent,
  voteCastEvent,
  voteUpdatedEvent,
  voteRetractedEvent,
  votesClearedEvent,
  issueRevealedEvent,
  issueAdvanceEvent,
  issueSkippedEvent,
  participantJoinedEvent,
  participantLeftEvent,
  participantReadyEvent,
  participantStatusChangedEvent,
  participantRoleChangedEvent,
  sessionBacklogUpdatedEvent,
  sessionStartedEvent,
  sessionPausedEvent,
  sessionResumedEvent,
  sessionCompletedEvent,
  sessionSettingsUpdatedEvent,
  consensusReachedEvent,
  estimateAppliedEvent,
  voteTimerStartedEvent,
  voteTimerExpiredEvent,
  baseEnvelopeSchema.extend({
    event: z.literal('game.state'),
    payload: z.object({
      bugs: z.array(z.object({
        id: z.number(),
        x: z.number(),
        y: z.number(),
        type: z.enum(['bug', 'feature']),
        createdAt: z.number(),
      })),
      scores: z.record(z.string(), z.number()),
      timeLeft: z.number(),
    }),
  }),
  baseEnvelopeSchema.extend({
    event: z.literal('game.spawn'),
    payload: z.object({
      bug: z.object({
        id: z.number(),
        x: z.number(),
        y: z.number(),
        type: z.enum(['bug', 'feature']),
        createdAt: z.number(),
      }),
    }),
  }),
  baseEnvelopeSchema.extend({
    event: z.literal('game.smashed'),
    payload: z.object({
      bugId: z.number(),
      actorId: z.string(),
      newScore: z.number(),
    }),
  }),
  baseEnvelopeSchema.extend({
    event: z.literal('game.start'),
    payload: z.object({
      sessionId: z.string(),
    }),
  }),
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
