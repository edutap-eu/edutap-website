import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/** All built HTML files, recursively. */
function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return path.endsWith(".html") ? [path] : [];
  });
}

/** Maps an internal href to the file that must exist for it to resolve. */
function targetFor(href: string): string {
  const clean = href.split("#")[0].split("?")[0];
  if (clean.endsWith("/")) return `dist${clean}index.html`;
  if (/\.[a-z0-9]+$/i.test(clean)) return `dist${clean}`;
  return `dist${clean}/index.html`;
}

describe("internal links", () => {
  it("all resolve to a built file", () => {
    const broken: string[] = [];

    for (const file of htmlFiles("dist")) {
      const html = readFileSync(file, "utf8");
      for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
        const href = match[1];
        if (href.startsWith("//")) continue;
        const target = targetFor(href);
        if (!existsSync(target)) broken.push(`${file} -> ${href}`);
      }
    }

    expect(broken).toEqual([]);
  });
});
