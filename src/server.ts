import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import Fastify from 'fastify';

import { env } from './config/env';
import socketPlugin from './plugins/socket';
import { eventRoutes } from './routes/events';
import { healthRoutes } from './routes/health';

export const createServer = async () => {
  const fastify = Fastify({
    logger: {
      level: env.LOG_LEVEL,
    },
  });

  await fastify.register(helmet);
  await fastify.register(cors, {
    origin: env.allowedOrigins === '*' ? true : env.allowedOrigins,
    methods: ['GET', 'POST'],
  });
  await fastify.register(rateLimit, {
    max: env.RATE_LIMIT_MAX,
    timeWindow: env.RATE_LIMIT_WINDOW_MS,
  });

  await fastify.register(socketPlugin);
  await fastify.register(healthRoutes);
  await fastify.register(eventRoutes);

  return fastify;
};

const start = async () => {
  const fastify = await createServer();
  try {
    await fastify.listen({ port: env.PORT, host: env.HOST });
    fastify.log.info(`🚀 Relay listening on ${env.HOST}:${env.PORT}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

if (import.meta.url === `file://${process.argv[1]}`) {
  start();
}
