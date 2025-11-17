import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],
  target: 'node20',
  sourcemap: true,
  splitting: false,
  clean: true,
  dts: false,
  minify: false,
  env: {
    NODE_ENV: process.env.NODE_ENV ?? 'production',
  },
});
