import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import { Server as SocketIOServer } from 'socket.io';

import { env } from '../config/env';
import { verifySocketToken } from '../security/token';

declare module 'fastify' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface FastifyInstance {
    io: SocketIOServer;
  }
}

declare module 'socket.io' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface SocketData {
    sessionId?: string;
    accountId?: string;
  }
}

const socketPlugin: FastifyPluginAsync = fp(async (fastify) => {
  const io = new SocketIOServer(fastify.server, {
    cors: {
      origin: env.allowedOrigins,
      credentials: false,
      methods: ['GET', 'POST'],
    },
  });

  io.use((socket, next) => {
    void (async () => {
      const authToken =
        (typeof socket.handshake.auth?.token === 'string' && socket.handshake.auth.token) ||
        (typeof socket.handshake.headers.authorization === 'string'
          ? socket.handshake.headers.authorization.replace('Bearer ', '').trim()
          : null);

      if (!authToken) {
        throw new Error('Missing auth token');
      }

      const claims = await verifySocketToken(authToken);
      socket.data.sessionId = claims.sessionId;
      socket.data.accountId = claims.sub;
      await socket.join(claims.sessionId);
    })()
      .then(() => next())
      .catch((error) => next(error instanceof Error ? error : new Error('Unauthorized')));
  });

  io.on('connection', (socket) => {
    const sessionId = socket.data.sessionId ?? 'unknown';
    fastify.log.info({ sessionId, accountId: socket.data.accountId }, 'Socket connected');

    socket.on('disconnect', (reason) => {
      fastify.log.info({ sessionId, reason }, 'Socket disconnected');
    });
  });

  fastify.decorate('io', io);

  fastify.addHook('onClose', async () => {
    await io.close();
  });
});

export default socketPlugin;
