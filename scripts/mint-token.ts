#!/usr/bin/env tsx
import { randomUUID } from 'node:crypto';

import { config as loadEnv } from 'dotenv';
import { SignJWT } from 'jose';

loadEnv();

const args = process.argv.slice(2);

const getArg = (name: string) => {
  const index = args.findIndex((arg) => arg === name || arg.startsWith(`${name}=`));
  if (index === -1) {
    return undefined;
  }
  const value = args[index];
  if (value.includes('=')) {
    return value.split('=')[1];
  }
  return args[index + 1];
};

const sessionId = getArg('--session') ?? process.env.SESSION_ID;
const accountId = getArg('--account') ?? process.env.ACCOUNT_ID;
const scopeRaw = getArg('--scope') ?? 'subscribe';
const ttlSeconds = Number(getArg('--ttl') ?? process.env.TOKEN_TTL ?? 300);

if (!process.env.JWT_SIGNING_SECRET) {
  console.error('JWT_SIGNING_SECRET missing. Set it in .env or pass inline.');
  process.exit(1);
}

if (!sessionId) {
  console.error('Missing --session argument or SESSION_ID env variable.');
  process.exit(1);
}

if (!accountId) {
  console.error('Missing --account argument or ACCOUNT_ID env variable.');
  process.exit(1);
}

if (!Number.isFinite(ttlSeconds) || ttlSeconds <= 0) {
  console.error('TTL must be a positive number of seconds.');
  process.exit(1);
}

const scope = scopeRaw
  .split(',')
  .map((value) => value.trim())
  .filter((value) => value.length > 0);

if (!scope.includes('subscribe')) {
  scope.push('subscribe');
}

const secret = new TextEncoder().encode(process.env.JWT_SIGNING_SECRET);
const now = Math.floor(Date.now() / 1000);

const main = async () => {
  const token = await new SignJWT({
    sessionId,
    scope,
    jti: randomUUID(),
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(accountId)
    .setIssuedAt(now)
    .setExpirationTime(now + ttlSeconds)
    .sign(secret);

  console.log('Session ID:', sessionId);
  console.log('Account ID:', accountId);
  console.log('Scope:', scope.join(','));
  console.log('Expires In (s):', ttlSeconds);
  console.log('\nToken:\n');
  console.log(token);
  console.log('\nExample usage:');
  console.log(`io(RELAY_URL, { auth: { token: '${token}' } });`);
};

main().catch((error) => {
  console.error('Failed to mint token:', error);
  process.exit(1);
});
