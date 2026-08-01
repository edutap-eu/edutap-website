import * as Sentry from "@sentry/astro";

// Loaded automatically by the `@sentry/astro` integration (see `astro.config.mjs`).
// Passing `dsn`/`tracesSampleRate` straight to the integration is deprecated in
// @sentry/astro 10+; the SDK must be configured here instead.
//
// This site is fully static (no adapter, no SSR), so there is no server runtime
// to instrument — only the client SDK is enabled (see `enabled: { server: false }`
// in `astro.config.mjs`), and no `sentry.server.config.ts` is needed.
Sentry.init({
  dsn: "https://591c58f7710af7e185aa4eb01bda6fd5@sentry.dev-tools.verwaltung.uni-muenchen.de/5",
  tracesSampleRate: 1.0,
});
