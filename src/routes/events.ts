import type { FastifyPluginAsync } from 'fastify';

import { relayEventEnvelopeSchema } from '@planning-poker/relay-events';
import { env } from '../config/env';
import { requireApiKey } from '../security/token';

export const eventRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.post('/events', async (request, reply) => {
    const apiKey = (request.headers['x-relay-key'] ?? request.headers.authorization) as string | undefined;
    requireApiKey(apiKey?.replace('Bearer ', '').trim(), reply);

    const parsed = relayEventEnvelopeSchema.safeParse(request.body);
    if (!parsed.success) {
      reply.status(400);
      return { error: 'Invalid payload', details: parsed.error.flatten() };
    }

    const payload = parsed.data;
    const issuedAt = payload.timestamp ?? new Date().toISOString();

    fastify.log.info(
      {
        sessionId: payload.sessionId,
        event: payload.event,
        nonce: payload.nonce,
      },
      'Broadcasting event'
    );

    fastify.io.to(payload.sessionId).emit(payload.event, {
      ...payload.payload,
      issuedAt,
    });

    reply.status(202);
    return { delivered: true };
  });

  fastify.get('/config', async () => ({
    cors: env.allowedOrigins,
  }));
};
