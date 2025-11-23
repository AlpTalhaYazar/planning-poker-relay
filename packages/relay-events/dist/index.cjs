"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  relayEventEnvelopeSchema: () => relayEventEnvelopeSchema
});
module.exports = __toCommonJS(index_exports);
var import_zod = require("zod");
var baseEnvelopeSchema = import_zod.z.object({
  sessionId: import_zod.z.string().min(1),
  timestamp: import_zod.z.string().datetime().optional(),
  nonce: import_zod.z.string().min(8).optional()
});
var snapshotEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("session.snapshot"),
  payload: import_zod.z.object({
    snapshot: import_zod.z.record(import_zod.z.string(), import_zod.z.unknown()).optional()
  })
});
var voteCastEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("vote.cast"),
  payload: import_zod.z.object({
    issueKey: import_zod.z.string().min(1),
    participantId: import_zod.z.string().min(1),
    value: import_zod.z.string().min(1).optional()
  })
});
var votesClearedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("votes.cleared"),
  payload: import_zod.z.object({
    issueKey: import_zod.z.string().min(1),
    actorId: import_zod.z.string().min(1)
  })
});
var issueRevealedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("issue.revealed"),
  payload: import_zod.z.object({
    issueKey: import_zod.z.string().min(1),
    actorId: import_zod.z.string().min(1)
  })
});
var issueAdvanceEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("issue.advance"),
  payload: import_zod.z.object({
    fromIssueKey: import_zod.z.string().min(1).optional(),
    toIssueKey: import_zod.z.string().min(1),
    actorId: import_zod.z.string().min(1)
  })
});
var participantJoinedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("participant.joined"),
  payload: import_zod.z.object({
    participantId: import_zod.z.string().min(1),
    displayName: import_zod.z.string().min(1)
  })
});
var participantLeftEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("participant.left"),
  payload: import_zod.z.object({
    participantId: import_zod.z.string().min(1)
  })
});
var sessionBacklogUpdatedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("session.backlogUpdated"),
  payload: import_zod.z.object({
    issueCount: import_zod.z.number().int().min(0),
    actorId: import_zod.z.string().min(1)
  })
});
var sessionStartedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("session.started"),
  payload: import_zod.z.object({
    actorId: import_zod.z.string().min(1)
  })
});
var participantReadyEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("participant.ready"),
  payload: import_zod.z.object({
    participantId: import_zod.z.string().min(1),
    isReady: import_zod.z.boolean()
  })
});
var participantStatusChangedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("participant.status.changed"),
  payload: import_zod.z.object({
    participantId: import_zod.z.string().min(1),
    status: import_zod.z.enum(["online", "away", "offline"])
  })
});
var participantRoleChangedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("participant.role.changed"),
  payload: import_zod.z.object({
    participantId: import_zod.z.string().min(1),
    isObserver: import_zod.z.boolean(),
    isModerator: import_zod.z.boolean()
  })
});
var sessionPausedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("session.paused"),
  payload: import_zod.z.object({
    actorId: import_zod.z.string().min(1)
  })
});
var sessionResumedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("session.resumed"),
  payload: import_zod.z.object({
    actorId: import_zod.z.string().min(1)
  })
});
var sessionCompletedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("session.completed"),
  payload: import_zod.z.object({
    completedAt: import_zod.z.string().datetime(),
    actorId: import_zod.z.string().min(1),
    summary: import_zod.z.object({
      totalIssues: import_zod.z.number(),
      estimatedIssues: import_zod.z.number(),
      skippedIssues: import_zod.z.number(),
      duration: import_zod.z.number()
    })
  })
});
var sessionSettingsUpdatedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("session.settings.updated"),
  payload: import_zod.z.object({
    actorId: import_zod.z.string().min(1),
    settings: import_zod.z.object({
      autoReveal: import_zod.z.boolean().optional(),
      allowChangeVote: import_zod.z.boolean().optional(),
      timerEnabled: import_zod.z.boolean().optional(),
      timerSeconds: import_zod.z.number().optional()
    })
  })
});
var voteUpdatedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("vote.updated"),
  payload: import_zod.z.object({
    issueKey: import_zod.z.string().min(1),
    participantId: import_zod.z.string().min(1),
    previousValue: import_zod.z.string().optional(),
    newValue: import_zod.z.string().optional(),
    updatedAt: import_zod.z.string().datetime()
  })
});
var voteRetractedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("vote.retracted"),
  payload: import_zod.z.object({
    issueKey: import_zod.z.string().min(1),
    participantId: import_zod.z.string().min(1)
  })
});
var issueSkippedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("issue.skipped"),
  payload: import_zod.z.object({
    issueKey: import_zod.z.string().min(1),
    actorId: import_zod.z.string().min(1),
    reason: import_zod.z.string().optional()
  })
});
var consensusReachedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("consensus.reached"),
  payload: import_zod.z.object({
    issueKey: import_zod.z.string().min(1),
    consensusValue: import_zod.z.string().min(1),
    voteCounts: import_zod.z.record(import_zod.z.string(), import_zod.z.number()),
    consensusType: import_zod.z.enum(["unanimous", "majority", "moderator-override"])
  })
});
var estimateAppliedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("estimate.applied"),
  payload: import_zod.z.object({
    issueKey: import_zod.z.string().min(1),
    estimateValue: import_zod.z.string().min(1),
    appliedBy: import_zod.z.string().min(1),
    appliedAt: import_zod.z.string().datetime()
  })
});
var voteTimerStartedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("votes.timer.started"),
  payload: import_zod.z.object({
    issueKey: import_zod.z.string().min(1),
    actorId: import_zod.z.string().min(1),
    durationSeconds: import_zod.z.number().int().positive(),
    endsAt: import_zod.z.string().datetime()
  })
});
var voteTimerExpiredEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("votes.timer.expired"),
  payload: import_zod.z.object({
    issueKey: import_zod.z.string().min(1),
    autoReveal: import_zod.z.boolean()
  })
});
var relayEventEnvelopeSchema = import_zod.z.discriminatedUnion("event", [
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
    event: import_zod.z.literal("game.state"),
    payload: import_zod.z.object({
      bugs: import_zod.z.array(import_zod.z.object({
        id: import_zod.z.number(),
        x: import_zod.z.number(),
        y: import_zod.z.number(),
        type: import_zod.z.enum(["bug", "feature"]),
        createdAt: import_zod.z.number()
      })),
      scores: import_zod.z.record(import_zod.z.string(), import_zod.z.number()),
      timeLeft: import_zod.z.number()
    })
  }),
  baseEnvelopeSchema.extend({
    event: import_zod.z.literal("game.spawn"),
    payload: import_zod.z.object({
      bug: import_zod.z.object({
        id: import_zod.z.number(),
        x: import_zod.z.number(),
        y: import_zod.z.number(),
        type: import_zod.z.enum(["bug", "feature"]),
        createdAt: import_zod.z.number()
      })
    })
  }),
  baseEnvelopeSchema.extend({
    event: import_zod.z.literal("game.smashed"),
    payload: import_zod.z.object({
      bugId: import_zod.z.number(),
      actorId: import_zod.z.string(),
      newScore: import_zod.z.number()
    })
  }),
  baseEnvelopeSchema.extend({
    event: import_zod.z.literal("game.start"),
    payload: import_zod.z.object({
      sessionId: import_zod.z.string()
    })
  })
]);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  relayEventEnvelopeSchema
});
//# sourceMappingURL=index.cjs.map