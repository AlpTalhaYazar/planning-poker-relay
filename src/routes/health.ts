import type { FastifyPluginAsync } from 'fastify';

export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/healthz', async () => ({ status: 'ok' }));
  fastify.get('/readyz', async () => ({ status: 'ready' }));
};
