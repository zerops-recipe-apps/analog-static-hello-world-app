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
      // Disable SSR — produce a pure client-side SPA output.
      // Output lands in dist/client/ which is then served by Nginx.
      ssr: false,
    }),
  ],
  define: {
    // Injected at build time — not readable at runtime (no Node.js process)
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    __ANALOG_VERSION__: JSON.stringify(analogVersion),
  },
});
