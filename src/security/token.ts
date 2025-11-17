import type { FastifyReply } from 'fastify';
import { jwtVerify } from 'jose';

import { env } from '../config/env';

const encoder = new TextEncoder();
const secretKey = encoder.encode(env.JWT_SIGNING_SECRET);

export interface SocketTokenClaims {
  sub: string;
  sessionId: string;
  scope: string[];
  exp: number;
  iat: number;
  jti: string;
}

export const verifySocketToken = async (token: string): Promise<SocketTokenClaims> => {
  const { payload } = await jwtVerify(token, secretKey, {
    algorithms: ['HS256'],
  });

  const sessionId = payload.sessionId;
  const scope = payload.scope;

  if (typeof sessionId !== 'string' || !sessionId.length) {
    throw new Error('Invalid token payload (sessionId)');
  }
  if (!Array.isArray(scope) || !scope.includes('subscribe')) {
    throw new Error('Token missing subscribe scope');
  }
  if (typeof payload.sub !== 'string') {
    throw new Error('Missing subject claim');
  }

  return {
    sub: payload.sub,
    sessionId,
    scope,
    exp: Number(payload.exp),
    iat: Number(payload.iat),
    jti: String(payload.jti ?? ''),
  };
};

export const requireApiKey = (provided: string | undefined, reply: FastifyReply) => {
  if (!provided || provided !== env.RELAY_API_KEY) {
    reply.status(401);
    throw new Error('Unauthorized');
  }
};
