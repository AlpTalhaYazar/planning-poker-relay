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

  const disconnectBuffer = new Map<string, NodeJS.Timeout>();

  io.on('connection', (socket) => {
    const sessionId = socket.data.sessionId ?? 'unknown';
    const accountId = socket.data.accountId;
    
    // if (sessionId && accountId) {
    //   const key = `${sessionId}:${accountId}`;
    //   if (disconnectBuffer.has(key)) {
    //     clearTimeout(disconnectBuffer.get(key));
    //     disconnectBuffer.delete(key);
    //     fastify.log.info({ sessionId, accountId }, 'Socket reconnected, cancelled disconnect event');
    //   }
    // }

    fastify.log.info({ sessionId, accountId }, 'Socket connected');

    socket.on('disconnect', (reason) => {
      fastify.log.info({ sessionId, reason }, 'Socket disconnected');
      if (socket.data.sessionId && socket.data.accountId) {
        const key = `${socket.data.sessionId}:${socket.data.accountId}`;
        // Buffer the disconnect event to allow for quick reconnects (e.g. page refresh)
        const timeout = setTimeout(() => {
          if (socket.data.sessionId && socket.data.accountId) {
            socket.to(socket.data.sessionId).emit('participant.left', {
              sessionId: socket.data.sessionId,
              accountId: socket.data.accountId,
              reason,
            });
            disconnectBuffer.delete(key);
          }
        }, 5000); // 5 seconds buffer
        disconnectBuffer.set(key, timeout);
      }
    });
  });

  fastify.decorate('io', io);

  fastify.addHook('onClose', async () => {
    await io.close();
  });
});

export default socketPlugin;
