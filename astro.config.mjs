import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import sentry from "@sentry/astro";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://edutap.eu",
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
