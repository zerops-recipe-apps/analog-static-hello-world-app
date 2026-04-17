# analog-static-hello-world-app

Analog (Angular meta-framework) SPA built via Vite — static build served by nginx in prod; dev container runs the Vite dev server over SSH.

## Zerops service facts

- HTTP port: dev `5173` (Vite) / prod `80` (nginx)
- Siblings: —
- Runtime base: dev `nodejs@22` / prod `static`

## Zerops dev

`setup: dev` idles on `zsc noop --silent`; the agent starts the dev server.

- Dev command: `npm start`
- In-container rebuild without deploy: `npm run build`

**All platform operations (start/stop/status/logs of the dev server, deploy, env / scaling / storage / domains) go through the Zerops development workflow via `zcp` MCP tools. Don't shell out to `zcli`.**

## Notes

- Analog is configured with `ssr: false` — pure client-side SPA output in `dist/analog/public/`; prod deploys that directory flattened (`dist/analog/public/~`) as the nginx document root.
- Static deployments have no runtime process — `VITE_*` / `PUBLIC_*` values must be baked at build time. Use the `RUNTIME_` prefix pattern (e.g. `VITE_APP_ENV=${RUNTIME_APP_ENV:-production}`) in `buildCommands` to inject service env vars into the compiled bundle.
- `vite.config.ts` embeds the installed Analog version into the bundle at build time as `__ANALOG_VERSION__`.
