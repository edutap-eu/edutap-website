import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

/** All built HTML files, recursively. */
function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return path.endsWith(".html") ? [path] : [];
  });
}

/** All `.astro` source files, recursively. */
function astroFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return astroFiles(path);
    return path.endsWith(".astro") ? [path] : [];
  });
}

const ROUTES = [
  "index.html",
  "news/index.html",
  "news/first-post/index.html",
  "history/index.html",
  "presentations/index.html",
  "roadmap/index.html",
  "about/index.html",
  "legal/imprint/index.html",
  "legal/privacy-policy/index.html",
  "404.html",
];

describe("routes", () => {
  it.each(ROUTES)("builds %s", (route) => {
    expect(existsSync(`dist/${route}`)).toBe(true);
  });

  // The project owner decided titles stay descriptive ("About | eduTAP",
  // "News | eduTAP", ...) even though the live Gatsby site shows a generic
  // "eduTAP" almost everywhere; the homepage alone keeps the plain "eduTAP".
  // So this only asserts a non-empty title and description on every route,
  // never a specific string - that would fight the deliberate divergence.
  it.each(ROUTES)("gives %s a title and description", (route) => {
    const html = readFileSync(`dist/${route}`, "utf8");
    expect(html).toMatch(/<title>[^<]+<\/title>/);
    expect(html).toMatch(/<meta name="description" content="[^"]+"/);
  });

  // Gatsby's news/{markdownRemark.frontmatter__slug}.tsx built /news/first-post
  // from a frontmatter slug of "/first-post". The Astro port re-derives the
  // route param by stripping that leading slash; if that stripping regresses,
  // the route becomes /news//first-post instead and this route disappears.
  it("does not double the slash on the frontmatter-slugged news post", () => {
    expect(existsSync("dist/news/first-post/index.html")).toBe(true);
    expect(existsSync("dist/news/index.html")).toBe(true);
  });

  it("emits a sitemap", () => {
    expect(existsSync("dist/sitemap-index.xml")).toBe(true);
  });

  // A regex over dist/index.html's own markup for the word "react" cannot
  // prove there is no React runtime: the Sentry SDK bundle already ships the
  // literal string "React" inside a content-hashed dist/_astro/*.js file,
  // invisible to a check that only reads the HTML, and a genuinely hydrated
  // component referenced through a <script src="..."> would evade it just
  // as easily. Astro's own hydration marker is the reliable signal instead -
  // any hydrated island renders an <astro-island> custom element into the
  // HTML regardless of which framework or bundle produced it, so the first
  // assertion below is the one that actually detects hydration. The other
  // two rule out the ways an island could exist without yet being rendered
  // (a component imported but not used anywhere, or the integration wired
  // up but not invoked).
  it("ships no React runtime", () => {
    for (const file of htmlFiles("dist")) {
      expect(readFileSync(file, "utf8")).not.toMatch(/<astro-island\b/);
    }

    for (const file of astroFiles("src")) {
      expect(readFileSync(file, "utf8")).not.toMatch(
        /client:(load|idle|visible|media|only)\b/,
      );
    }

    expect(readFileSync("astro.config.mjs", "utf8")).not.toMatch(
      /@astrojs\/react/,
    );
    const pkg = JSON.parse(readFileSync("package.json", "utf8"));
    expect(Object.keys(pkg.dependencies ?? {})).not.toContain("@astrojs/react");
  });
});
