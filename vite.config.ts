import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import { readFileSync } from 'node:fs';

// Read installed Analog version at build time
const analogVersion = JSON.parse(
  readFileSync('./node_modules/@analogjs/platform/package.json', 'utf-8')
).version;

export default defineConfig({
  plugins: [
    analog({
      // Client-only SPA. Empty prerender routes are required — Analog still
      // defaults prerender to ['/'], which forces an SSR Vite environment
      // that rolls up .ts without the Angular transform and fails the build.
      ssr: false,
      static: true,
      prerender: {
        routes: [],
      },
    }),
  ],
  define: {
    // Injected at build time — not readable at runtime (no Node.js process)
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __ANALOG_VERSION__: JSON.stringify(analogVersion),
  },
});
