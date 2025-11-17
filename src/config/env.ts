import { config as loadEnv } from 'dotenv';
import { z } from 'zod';

loadEnv();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  HOST: z.string().min(1).default('0.0.0.0'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
  JWT_SIGNING_SECRET: z.string().min(32, 'JWT_SIGNING_SECRET must be at least 32 chars'),
  RELAY_API_KEY: z.string().min(16, 'RELAY_API_KEY must be at least 16 chars'),
  ALLOWED_ORIGINS: z.string().default('*'),
  RATE_LIMIT_MAX: z.coerce.number().int().positive().default(120),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().int().positive().default(60_000),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment configuration');
  console.error(parsed.error.format());
  process.exit(1);
}

const raw = parsed.data;

const allowedOriginsList = raw.ALLOWED_ORIGINS === '*'
  ? '*'
  : raw.ALLOWED_ORIGINS.split(',')
      .map((origin) => origin.trim())
      .filter((origin) => origin.length > 0);

export const env = {
  ...raw,
  allowedOrigins: allowedOriginsList,
};
