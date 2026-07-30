import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import sentry from "@sentry/astro";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://edutap.eu",
  // Vitest (via `getViteConfig`) always resolves the content layer's cache in "dev" mode,
  // reading the data store from `.astro/` rather than the default `node_modules/.astro/`.
  // Pointing `cacheDir` at the same `.astro/` directory means `astro build`/`astro sync`
  // (which run in "build" mode) populate the exact file vitest expects, so `npm run test`
  // works right after `npm run build` on a fresh checkout without ever needing `astro dev`.
  cacheDir: "./.astro/",
  integrations: [
    sitemap(),
    icon({ include: { lucide: ["*"] } }),
    sentry({
      // Static site, no adapter/SSR: the server SDK has nothing to instrument
      // at runtime, so it is disabled here. Client-side `dsn`/`tracesSampleRate`
      // are configured in `sentry.client.config.ts` (passing them here directly
      // is deprecated since @sentry/astro 10 and prints a build warning).
      enabled: { server: false },
      sourceMapsUploadOptions: { enabled: false },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
