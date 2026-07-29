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
      dsn: "https://591c58f7710af7e185aa4eb01bda6fd5@sentry.dev-tools.verwaltung.uni-muenchen.de/5",
      tracesSampleRate: 1.0,
      sourceMapsUploadOptions: { enabled: false },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
