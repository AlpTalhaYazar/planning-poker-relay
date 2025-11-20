import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'tsup';

const cwd = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  entry: [join(cwd, 'src/index.ts')],
  format: ['esm', 'cjs'],
  target: 'node20',
  tsconfig: join(cwd, 'tsconfig.json'),
  dts: true,
  sourcemap: true,
  outDir: join(cwd, 'dist'),
  clean: true,
});
