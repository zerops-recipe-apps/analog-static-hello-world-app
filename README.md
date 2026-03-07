# Analog Hello World Recipe App

<!-- #ZEROPS_EXTRACT_START:intro# -->
A minimal [Analog](https://analogjs.org) application — the Angular meta-framework — deployed as a static SPA on [Zerops](https://zerops.io). Built with Vite and served by Nginx, demonstrating build-time environment variable injection via the `VITE_*` convention.
Used within [Analog Hello World recipe](https://app.zerops.io/recipes/analog-hello-world) for [Zerops](https://zerops.io) platform.
<!-- #ZEROPS_EXTRACT_END:intro# -->

⬇️ **Full recipe page and deploy with one-click**

[![Deploy on Zerops](https://github.com/zeropsio/recipe-shared-assets/blob/main/deploy-button/light/deploy-button.svg)](https://app.zerops.io/recipes/analog-hello-world?environment=small-production)

![analog cover](https://github.com/zeropsio/recipe-shared-assets/blob/main/covers/svg/cover-analog.svg)

## Integration Guide

<!-- #ZEROPS_EXTRACT_START:integration-guide# -->

### 1. Adding `zerops.yaml`
The main application configuration file you place at the root of your repository, it tells Zerops how to build, deploy and run your application.

```yaml
zerops:
  # Production setup — build Analog with Node.js, serve static output via Nginx.
  # The dev setup below uses Node.js at runtime so developers can run the
  # dev server via SSH.
  - setup: prod
    build:
      # Build with Node.js (npm/npx), serve with Nginx.
      # The build container compiles Analog into static HTML/CSS/JS —
      # Node.js is NOT present at runtime.
      base: nodejs@22

      buildCommands:
        - npm ci
        # RUNTIME_ prefix lets runtime env vars reach the build shell.
        # VITE_* vars are baked into the bundle at build time — there is
        # no runtime process to read env vars in static deployments.
        - VITE_APP_ENV=${RUNTIME_APP_ENV:-production} npm run build

      # Strip dist/analog/public/ prefix — contents become the Nginx root.
      # dist/analog/public/index.html → /index.html in the served tree.
      deployFiles:
        - dist/analog/public/~

      cache:
        - node_modules

    run:
      # Nginx serves the compiled output — no Node.js at runtime.
      # Built-in SPA fallback: unmatched routes serve /index.html,
      # so Angular Router handles client-side navigation correctly.
      base: static

  # Dev setup — deploy full source so developers can run 'npm start' via SSH.
  - setup: dev
    build:
      base: nodejs@22
      os: ubuntu
      buildCommands:
        # npm install (not ci) — dev environment may lack a lock file
        - npm install
      # Deploy full working directory — source code + node_modules
      deployFiles: ./
      cache:
        - node_modules

    run:
      # nodejs@22 runtime — developer needs Node.js to run 'npm start' via SSH
      base: nodejs@22
      os: ubuntu
      # Keep the container alive without starting any server.
      # Developer SSHes in and runs: npm start
      start: zsc noop --silent
```
<!-- #ZEROPS_EXTRACT_END:integration-guide# -->
