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
    event: z.ZodLiteral<"vote.updated">;
    payload: z.ZodObject<{
        issueKey: z.ZodString;
        participantId: z.ZodString;
        previousValue: z.ZodOptional<z.ZodString>;
        newValue: z.ZodOptional<z.ZodString>;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        issueKey: string;
        participantId: string;
        updatedAt: string;
        previousValue?: string | undefined;
        newValue?: string | undefined;
    }, {
        issueKey: string;
        participantId: string;
        updatedAt: string;
        previousValue?: string | undefined;
        newValue?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "vote.updated";
    payload: {
        issueKey: string;
        participantId: string;
        updatedAt: string;
        previousValue?: string | undefined;
        newValue?: string | undefined;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "vote.updated";
    payload: {
        issueKey: string;
        participantId: string;
        updatedAt: string;
        previousValue?: string | undefined;
        newValue?: string | undefined;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"vote.retracted">;
    payload: z.ZodObject<{
        issueKey: z.ZodString;
        participantId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        issueKey: string;
        participantId: string;
    }, {
        issueKey: string;
        participantId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "vote.retracted";
    payload: {
        issueKey: string;
        participantId: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "vote.retracted";
    payload: {
        issueKey: string;
        participantId: string;
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
    event: z.ZodLiteral<"issue.skipped">;
    payload: z.ZodObject<{
        issueKey: z.ZodString;
        actorId: z.ZodString;
        reason: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        issueKey: string;
        actorId: string;
        reason?: string | undefined;
    }, {
        issueKey: string;
        actorId: string;
        reason?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "issue.skipped";
    payload: {
        issueKey: string;
        actorId: string;
        reason?: string | undefined;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "issue.skipped";
    payload: {
        issueKey: string;
        actorId: string;
        reason?: string | undefined;
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
    event: z.ZodLiteral<"participant.status.changed">;
    payload: z.ZodObject<{
        participantId: z.ZodString;
        status: z.ZodEnum<["online", "away", "offline"]>;
    }, "strip", z.ZodTypeAny, {
        status: "online" | "away" | "offline";
        participantId: string;
    }, {
        status: "online" | "away" | "offline";
        participantId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "participant.status.changed";
    payload: {
        status: "online" | "away" | "offline";
        participantId: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "participant.status.changed";
    payload: {
        status: "online" | "away" | "offline";
        participantId: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"participant.role.changed">;
    payload: z.ZodObject<{
        participantId: z.ZodString;
        isObserver: z.ZodBoolean;
        isModerator: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        participantId: string;
        isObserver: boolean;
        isModerator: boolean;
    }, {
        participantId: string;
        isObserver: boolean;
        isModerator: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "participant.role.changed";
    payload: {
        participantId: string;
        isObserver: boolean;
        isModerator: boolean;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "participant.role.changed";
    payload: {
        participantId: string;
        isObserver: boolean;
        isModerator: boolean;
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
    event: z.ZodLiteral<"session.paused">;
    payload: z.ZodObject<{
        actorId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        actorId: string;
    }, {
        actorId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "session.paused";
    payload: {
        actorId: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "session.paused";
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
    event: z.ZodLiteral<"session.resumed">;
    payload: z.ZodObject<{
        actorId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        actorId: string;
    }, {
        actorId: string;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "session.resumed";
    payload: {
        actorId: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "session.resumed";
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
    event: z.ZodLiteral<"session.completed">;
    payload: z.ZodObject<{
        completedAt: z.ZodString;
        actorId: z.ZodString;
        summary: z.ZodObject<{
            totalIssues: z.ZodNumber;
            estimatedIssues: z.ZodNumber;
            skippedIssues: z.ZodNumber;
            duration: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            totalIssues: number;
            estimatedIssues: number;
            skippedIssues: number;
            duration: number;
        }, {
            totalIssues: number;
            estimatedIssues: number;
            skippedIssues: number;
            duration: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        actorId: string;
        completedAt: string;
        summary: {
            totalIssues: number;
            estimatedIssues: number;
            skippedIssues: number;
            duration: number;
        };
    }, {
        actorId: string;
        completedAt: string;
        summary: {
            totalIssues: number;
            estimatedIssues: number;
            skippedIssues: number;
            duration: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "session.completed";
    payload: {
        actorId: string;
        completedAt: string;
        summary: {
            totalIssues: number;
            estimatedIssues: number;
            skippedIssues: number;
            duration: number;
        };
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "session.completed";
    payload: {
        actorId: string;
        completedAt: string;
        summary: {
            totalIssues: number;
            estimatedIssues: number;
            skippedIssues: number;
            duration: number;
        };
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"session.settings.updated">;
    payload: z.ZodObject<{
        actorId: z.ZodString;
        settings: z.ZodObject<{
            autoReveal: z.ZodOptional<z.ZodBoolean>;
            allowChangeVote: z.ZodOptional<z.ZodBoolean>;
            timerEnabled: z.ZodOptional<z.ZodBoolean>;
            timerSeconds: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            autoReveal?: boolean | undefined;
            allowChangeVote?: boolean | undefined;
            timerEnabled?: boolean | undefined;
            timerSeconds?: number | undefined;
        }, {
            autoReveal?: boolean | undefined;
            allowChangeVote?: boolean | undefined;
            timerEnabled?: boolean | undefined;
            timerSeconds?: number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        actorId: string;
        settings: {
            autoReveal?: boolean | undefined;
            allowChangeVote?: boolean | undefined;
            timerEnabled?: boolean | undefined;
            timerSeconds?: number | undefined;
        };
    }, {
        actorId: string;
        settings: {
            autoReveal?: boolean | undefined;
            allowChangeVote?: boolean | undefined;
            timerEnabled?: boolean | undefined;
            timerSeconds?: number | undefined;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "session.settings.updated";
    payload: {
        actorId: string;
        settings: {
            autoReveal?: boolean | undefined;
            allowChangeVote?: boolean | undefined;
            timerEnabled?: boolean | undefined;
            timerSeconds?: number | undefined;
        };
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "session.settings.updated";
    payload: {
        actorId: string;
        settings: {
            autoReveal?: boolean | undefined;
            allowChangeVote?: boolean | undefined;
            timerEnabled?: boolean | undefined;
            timerSeconds?: number | undefined;
        };
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"consensus.reached">;
    payload: z.ZodObject<{
        issueKey: z.ZodString;
        consensusValue: z.ZodString;
        voteCounts: z.ZodRecord<z.ZodString, z.ZodNumber>;
        consensusType: z.ZodEnum<["unanimous", "majority", "moderator-override"]>;
    }, "strip", z.ZodTypeAny, {
        issueKey: string;
        consensusValue: string;
        voteCounts: Record<string, number>;
        consensusType: "unanimous" | "majority" | "moderator-override";
    }, {
        issueKey: string;
        consensusValue: string;
        voteCounts: Record<string, number>;
        consensusType: "unanimous" | "majority" | "moderator-override";
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "consensus.reached";
    payload: {
        issueKey: string;
        consensusValue: string;
        voteCounts: Record<string, number>;
        consensusType: "unanimous" | "majority" | "moderator-override";
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "consensus.reached";
    payload: {
        issueKey: string;
        consensusValue: string;
        voteCounts: Record<string, number>;
        consensusType: "unanimous" | "majority" | "moderator-override";
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"estimate.applied">;
    payload: z.ZodObject<{
        issueKey: z.ZodString;
        estimateValue: z.ZodString;
        appliedBy: z.ZodString;
        appliedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        issueKey: string;
        estimateValue: string;
        appliedBy: string;
        appliedAt: string;
    }, {
        issueKey: string;
        estimateValue: string;
        appliedBy: string;
        appliedAt: string;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "estimate.applied";
    payload: {
        issueKey: string;
        estimateValue: string;
        appliedBy: string;
        appliedAt: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "estimate.applied";
    payload: {
        issueKey: string;
        estimateValue: string;
        appliedBy: string;
        appliedAt: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"votes.timer.started">;
    payload: z.ZodObject<{
        issueKey: z.ZodString;
        actorId: z.ZodString;
        durationSeconds: z.ZodNumber;
        endsAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        issueKey: string;
        actorId: string;
        durationSeconds: number;
        endsAt: string;
    }, {
        issueKey: string;
        actorId: string;
        durationSeconds: number;
        endsAt: string;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "votes.timer.started";
    payload: {
        issueKey: string;
        actorId: string;
        durationSeconds: number;
        endsAt: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "votes.timer.started";
    payload: {
        issueKey: string;
        actorId: string;
        durationSeconds: number;
        endsAt: string;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
} & {
    event: z.ZodLiteral<"votes.timer.expired">;
    payload: z.ZodObject<{
        issueKey: z.ZodString;
        autoReveal: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        issueKey: string;
        autoReveal: boolean;
    }, {
        issueKey: string;
        autoReveal: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    sessionId: string;
    event: "votes.timer.expired";
    payload: {
        issueKey: string;
        autoReveal: boolean;
    };
    timestamp?: string | undefined;
    nonce?: string | undefined;
}, {
    sessionId: string;
    event: "votes.timer.expired";
    payload: {
        issueKey: string;
        autoReveal: boolean;
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
