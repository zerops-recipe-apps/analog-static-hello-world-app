/// <reference types="vitest" />
import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import { readFileSync } from 'node:fs';

// Read installed Analog version at build time
const analogVersion = JSON.parse(
  readFileSync('./node_modules/@analogjs/platform/package.json', 'utf-8')
).version;

export default defineConfig(({ mode }) => ({
  plugins: [
    analog({
      // Prerender '/' at build time — output lands in dist/analog/public/
      prerender: {
        routes: ['/'],
      },
    }),
  ],
  define: {
    // Injected at build time — not readable at runtime (no Node.js process)
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __ANALOG_VERSION__: JSON.stringify(analogVersion),
  },
}));
