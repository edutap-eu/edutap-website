import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";

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

  it("ships no React runtime", () => {
    const html = readFileSync("dist/index.html", "utf8");
    expect(html).not.toMatch(/react/i);
  });
});
