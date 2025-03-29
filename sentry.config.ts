import * as Sentry from "@sentry/gatsby";

Sentry.init({
  dsn: "https://591c58f7710af7e185aa4eb01bda6fd5@sentry.dev-tools.verwaltung.uni-muenchen.de/5",
  integrations: [
    Sentry.browserTracingIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,
});
