import * as Sentry from "@sentry/astro";

// Loaded automatically by the `@sentry/astro` integration (see `astro.config.mjs`).
// Passing `dsn`/`tracesSampleRate` straight to the integration is deprecated in
// @sentry/astro 10+; the SDK must be configured here instead.
//
// This site is fully static (no adapter, no SSR), so there is no server runtime
// to instrument — only the client SDK is enabled (see `enabled: { server: false }`
// in `astro.config.mjs`), and no `sentry.server.config.ts` is needed.
Sentry.init({
  dsn: "https://b8c11a165aeb4d17ae7b781fe9d3db24@portal-mgmt.verwaltung.uni-muenchen.de/portale/bugsink/1",
  tracesSampleRate: 1.0,
});
