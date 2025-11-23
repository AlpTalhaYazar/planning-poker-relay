import { z } from 'zod';

declare const relayEventEnvelopeSchema: z.ZodDiscriminatedUnion<"event", [z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"session.snapshot">;
    payload: z.ZodObject<{
        snapshot: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        snapshot?: Record<string, unknown> | undefined;
    }, {
        snapshot?: Record<string, unknown> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "session.snapshot";
    payload: {
        snapshot?: Record<string, unknown> | undefined;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "session.snapshot";
    payload: {
        snapshot?: Record<string, unknown> | undefined;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"vote.cast">;
    payload: z.ZodObject<{
        issueKey: z.ZodString;
        participantId: z.ZodString;
        value: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        issueKey: string;
        participantId: string;
        value?: string | undefined;
    }, {
        issueKey: string;
        participantId: string;
        value?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "vote.cast";
    payload: {
        issueKey: string;
        participantId: string;
        value?: string | undefined;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "vote.cast";
    payload: {
        issueKey: string;
        participantId: string;
        value?: string | undefined;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"votes.cleared">;
    payload: z.ZodObject<{
        issueKey: z.ZodString;
        actorId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        issueKey: string;
        actorId: string;
    }, {
        issueKey: string;
        actorId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "votes.cleared";
    payload: {
        issueKey: string;
        actorId: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "votes.cleared";
    payload: {
        issueKey: string;
        actorId: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"issue.revealed">;
    payload: z.ZodObject<{
        issueKey: z.ZodString;
        actorId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        issueKey: string;
        actorId: string;
    }, {
        issueKey: string;
        actorId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "issue.revealed";
    payload: {
        issueKey: string;
        actorId: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "issue.revealed";
    payload: {
        issueKey: string;
        actorId: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"issue.advance">;
    payload: z.ZodObject<{
        fromIssueKey: z.ZodOptional<z.ZodString>;
        toIssueKey: z.ZodString;
        actorId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        actorId: string;
        toIssueKey: string;
        fromIssueKey?: string | undefined;
    }, {
        actorId: string;
        toIssueKey: string;
        fromIssueKey?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "issue.advance";
    payload: {
        actorId: string;
        toIssueKey: string;
        fromIssueKey?: string | undefined;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "issue.advance";
    payload: {
        actorId: string;
        toIssueKey: string;
        fromIssueKey?: string | undefined;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"participant.joined">;
    payload: z.ZodObject<{
        participantId: z.ZodString;
        displayName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        participantId: string;
        displayName: string;
    }, {
        participantId: string;
        displayName: string;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "participant.joined";
    payload: {
        participantId: string;
        displayName: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "participant.joined";
    payload: {
        participantId: string;
        displayName: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"participant.left">;
    payload: z.ZodObject<{
        participantId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        participantId: string;
    }, {
        participantId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "participant.left";
    payload: {
        participantId: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "participant.left";
    payload: {
        participantId: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"session.joined">;
    payload: z.ZodObject<{
        participantId: z.ZodString;
        displayName: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        participantId: string;
        displayName: string;
    }, {
        participantId: string;
        displayName: string;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "session.joined";
    payload: {
        participantId: string;
        displayName: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "session.joined";
    payload: {
        participantId: string;
        displayName: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"session.backlogUpdated">;
    payload: z.ZodObject<{
        issueCount: z.ZodNumber;
        actorId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        actorId: string;
        issueCount: number;
    }, {
        actorId: string;
        issueCount: number;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "session.backlogUpdated";
    payload: {
        actorId: string;
        issueCount: number;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "session.backlogUpdated";
    payload: {
        actorId: string;
        issueCount: number;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"session.started">;
    payload: z.ZodObject<{
        actorId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        actorId: string;
    }, {
        actorId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "session.started";
    payload: {
        actorId: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "session.started";
    payload: {
        actorId: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"participant.ready">;
    payload: z.ZodObject<{
        participantId: z.ZodString;
        isReady: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        participantId: string;
        isReady: boolean;
    }, {
        participantId: string;
        isReady: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "participant.ready";
    payload: {
        participantId: string;
        isReady: boolean;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "participant.ready";
    payload: {
        participantId: string;
        isReady: boolean;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"game.state">;
    payload: z.ZodObject<{
        bugs: z.ZodArray<z.ZodObject<{
            id: z.ZodNumber;
            x: z.ZodNumber;
            y: z.ZodNumber;
            type: z.ZodEnum<["bug", "feature"]>;
            createdAt: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: "bug" | "feature";
            id: number;
            x: number;
            y: number;
            createdAt: number;
        }, {
            type: "bug" | "feature";
            id: number;
            x: number;
            y: number;
            createdAt: number;
        }>, "many">;
        scores: z.ZodRecord<z.ZodString, z.ZodNumber>;
        timeLeft: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        bugs: {
            type: "bug" | "feature";
            id: number;
            x: number;
            y: number;
            createdAt: number;
        }[];
        scores: Record<string, number>;
        timeLeft: number;
    }, {
        bugs: {
            type: "bug" | "feature";
            id: number;
            x: number;
            y: number;
            createdAt: number;
        }[];
        scores: Record<string, number>;
        timeLeft: number;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "game.state";
    payload: {
        bugs: {
            type: "bug" | "feature";
            id: number;
            x: number;
            y: number;
            createdAt: number;
        }[];
        scores: Record<string, number>;
        timeLeft: number;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "game.state";
    payload: {
        bugs: {
            type: "bug" | "feature";
            id: number;
            x: number;
            y: number;
            createdAt: number;
        }[];
        scores: Record<string, number>;
        timeLeft: number;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"game.spawn">;
    payload: z.ZodObject<{
        bug: z.ZodObject<{
            id: z.ZodNumber;
            x: z.ZodNumber;
            y: z.ZodNumber;
            type: z.ZodEnum<["bug", "feature"]>;
            createdAt: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: "bug" | "feature";
            id: number;
            x: number;
            y: number;
            createdAt: number;
        }, {
            type: "bug" | "feature";
            id: number;
            x: number;
            y: number;
            createdAt: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        bug: {
            type: "bug" | "feature";
            id: number;
            x: number;
            y: number;
            createdAt: number;
        };
    }, {
        bug: {
            type: "bug" | "feature";
            id: number;
            x: number;
            y: number;
            createdAt: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "game.spawn";
    payload: {
        bug: {
            type: "bug" | "feature";
            id: number;
            x: number;
            y: number;
            createdAt: number;
        };
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "game.spawn";
    payload: {
        bug: {
            type: "bug" | "feature";
            id: number;
            x: number;
            y: number;
            createdAt: number;
        };
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"game.smashed">;
    payload: z.ZodObject<{
        bugId: z.ZodNumber;
        actorId: z.ZodString;
        newScore: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        actorId: string;
        bugId: number;
        newScore: number;
    }, {
        actorId: string;
        bugId: number;
        newScore: number;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "game.smashed";
    payload: {
        actorId: string;
        bugId: number;
        newScore: number;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "game.smashed";
    payload: {
        actorId: string;
        bugId: number;
        newScore: number;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"game.start">;
    payload: z.ZodObject<{
        sessionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        sessionId: string;
    }, {
        sessionId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "game.start";
    payload: {
        sessionId: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "game.start";
    payload: {
        sessionId: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>]>;
type RelayEventEnvelope = z.infer<typeof relayEventEnvelopeSchema>;
type RelayEventName = RelayEventEnvelope['event'];
type RelayEventPayload<Name extends RelayEventName = RelayEventName> = Extract<RelayEventEnvelope, {
    event: Name;
}>['payload'];
type RelayEventPayloads = {
    [Name in RelayEventName]: RelayEventPayload<Name>;
};

export { type RelayEventEnvelope, type RelayEventName, type RelayEventPayload, type RelayEventPayloads, relayEventEnvelopeSchema };
