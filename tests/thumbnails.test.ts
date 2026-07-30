import { describe, expect, it } from "vitest";
import { existsSync, readdirSync } from "node:fs";
import { basename, extname } from "node:path";

describe("presentation thumbnails", () => {
  it("has a thumbnail for every PDF", () => {
    const pdfs = readdirSync("public/presentations").filter(
      (name) => extname(name).toLowerCase() === ".pdf",
    );
    expect(pdfs.length).toBeGreaterThan(0);

    const missing = pdfs.filter(
      (pdf) => !existsSync(`public/presentations/thumbs/${basename(pdf, ".pdf")}.webp`),
    );
    expect(missing).toEqual([]);
  });
});
