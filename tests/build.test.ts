import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";

describe("astro build", () => {
  it("emits an index page into dist/", () => {
    expect(existsSync("dist/index.html")).toBe(true);
  });
});
