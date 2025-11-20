import { z } from 'zod';

declare const relayEventEnvelopeSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
    event: z.ZodLiteral<"session.snapshot">;
    payload: z.ZodObject<{
        snapshot: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
    event: z.ZodLiteral<"vote.cast">;
    payload: z.ZodObject<{
        issueKey: z.ZodString;
        participantId: z.ZodString;
        value: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
    event: z.ZodLiteral<"votes.cleared">;
    payload: z.ZodObject<{
        issueKey: z.ZodString;
        actorId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
    event: z.ZodLiteral<"issue.revealed">;
    payload: z.ZodObject<{
        issueKey: z.ZodString;
        actorId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
    event: z.ZodLiteral<"issue.advance">;
    payload: z.ZodObject<{
        fromIssueKey: z.ZodOptional<z.ZodString>;
        toIssueKey: z.ZodString;
        actorId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
    event: z.ZodLiteral<"participant.joined">;
    payload: z.ZodObject<{
        participantId: z.ZodString;
        displayName: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
    event: z.ZodLiteral<"participant.left">;
    payload: z.ZodObject<{
        participantId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
    event: z.ZodLiteral<"session.joined">;
    payload: z.ZodObject<{
        participantId: z.ZodString;
        displayName: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    sessionId: z.ZodString;
    timestamp: z.ZodOptional<z.ZodString>;
    nonce: z.ZodOptional<z.ZodString>;
    event: z.ZodLiteral<"session.backlogUpdated">;
    payload: z.ZodObject<{
        issueCount: z.ZodNumber;
        actorId: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>], "event">;
type RelayEventEnvelope = z.infer<typeof relayEventEnvelopeSchema>;
type RelayEventName = RelayEventEnvelope['event'];
type RelayEventPayload<Name extends RelayEventName = RelayEventName> = Extract<RelayEventEnvelope, {
    event: Name;
}>['payload'];
type RelayEventPayloads = {
    [Name in RelayEventName]: RelayEventPayload<Name>;
};

export { type RelayEventEnvelope, type RelayEventName, type RelayEventPayload, type RelayEventPayloads, relayEventEnvelopeSchema };
