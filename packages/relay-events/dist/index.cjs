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
var sessionJoinedEvent = baseEnvelopeSchema.extend({
  event: import_zod.z.literal("session.joined"),
  payload: import_zod.z.object({
    participantId: import_zod.z.string().min(1),
    displayName: import_zod.z.string().min(1)
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
var relayEventEnvelopeSchema = import_zod.z.discriminatedUnion("event", [
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
  participantReadyEvent
]);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  relayEventEnvelopeSchema
});
//# sourceMappingURL=index.cjs.map