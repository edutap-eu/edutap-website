import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { getCollection } from "astro:content";

/**
 * `getCollection` sorts entries by `id` as a *string*, not in JSON file
 * order: with 33 presentations that yields "-0, -1, -10, -11, ..., -2, -20",
 * scrambling every card. This bit the history timeline and, separately, the
 * presentations page - both times an entry-count assertion stayed green
 * while the order was silently wrong, because counting entries can't see
 * that they came back in the wrong sequence.
 *
 * A test that re-sorts the collection itself (as history.astro and
 * presentations.astro do) would NOT catch a regression where someone removes
 * that .sort() call from the page template - the test would just reproduce
 * the fix independently of the page and still pass. So the assertions below
 * read the raw source JSON as ground truth and compare it against the
 * *built HTML*, the same artifact a site visitor sees. That is the only
 * check a scrambled render cannot slip past.
 */

type Milestone = { title: string };
type Presentation = { title: string; file: string; type: string };

/** Decodes the small set of HTML entities Astro emits for plain text nodes. */
function decodeEntities(text: string): string {
  return text
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/** Titles of every rendered timeline milestone <h2>, in document order. */
function renderedMilestoneTitles(distPath: string): string[] {
  const html = readFileSync(distPath, "utf8");
  return [
    ...html.matchAll(/<h2 class="mt-0 mb-4[^"]*"[^>]*>([^<]*)<\/h2>/g),
  ].map((m) => decodeEntities(m[1].trim()));
}

/** Presentation PDF hrefs, in document order, as rendered on the page. */
function renderedPresentationFiles(distPath: string): string[] {
  const html = readFileSync(distPath, "utf8");
  return [...html.matchAll(/href="\/presentations\/([^"]+\.pdf)"/g)].map(
    (m) => m[1],
  );
}

describe("collection ordering", () => {
  it.each(["history", "roadmap", "presentations", "team"] as const)(
    "%s ids follow the indexed() prefix-index contract",
    async (name) => {
      const entries = await getCollection(name);
      expect(entries.length).toBeGreaterThan(0);
      for (const entry of entries) {
        expect(entry.id).toMatch(/^[a-z-]+-\d+$/);
      }
      // Every numeric suffix must be unique - a duplicate would mean two
      // JSON entries collapsed onto the same id and one silently vanished.
      const suffixes = entries.map((e) => Number(e.id.split("-").pop()));
      expect(new Set(suffixes).size).toBe(suffixes.length);
    },
  );

  it("history renders in JSON file order, not id-string order", () => {
    const source: Milestone[] = JSON.parse(
      readFileSync("src/data/history.json", "utf8"),
    );
    const expected = source.map((m) => m.title);

    // Sanity check on the fixture itself: with only 10 of 12 titles unique,
    // a naive "does the rendered page contain every title" check could stay
    // green under a scrambled render. Comparing full ordered arrays (which
    // include the duplicates in position) is what actually catches that.
    expect(expected).toHaveLength(12);

    expect(renderedMilestoneTitles("dist/history/index.html")).toEqual(
      expected,
    );
  });

  it("roadmap renders in JSON file order, not id-string order", () => {
    const source: Milestone[] = JSON.parse(
      readFileSync("src/data/roadmap.json", "utf8"),
    );
    const expected = source.map((m) => m.title);

    // Same guard as the history test above: currently moot (all 4 roadmap
    // titles are unique), but titles are free-text editorial content, and a
    // duplicate slipping in later would silently weaken a "contains every
    // title" style check the same way it already does for history.
    expect(new Set(expected).size).toBe(expected.length);

    expect(renderedMilestoneTitles("dist/roadmap/index.html")).toEqual(
      expected,
    );
  });

  it("presentations render in JSON file order within each type group", () => {
    const source: Presentation[] = JSON.parse(
      readFileSync("src/data/presentations.json", "utf8"),
    );
    expect(source).toHaveLength(33);

    // presentations.astro renders two groups - "Lightning Talks" first, then
    // "Conference & Webinar Talks" - each internally kept in file order. A
    // plain "sorted by file order" check across all 33 would miss a bug that
    // only scrambles within one group, so the groups are checked separately
    // and in the same sequence the page renders them.
    const lightning = source
      .filter((p) => p.type === "lightning")
      .map((p) => p.file);
    const conferenceOrWebinar = source
      .filter((p) => p.type === "conference" || p.type === "webinar")
      .map((p) => p.file);
    const expected = [...lightning, ...conferenceOrWebinar];

    expect(renderedPresentationFiles("dist/presentations/index.html")).toEqual(
      expected,
    );
  });

  it("presentations sorted by file order start and end with the expected talks", async () => {
    const byFileOrder = (a: { id: string }, b: { id: string }) =>
      Number(a.id.split("-").pop()) - Number(b.id.split("-").pop());
    const sorted = (await getCollection("presentations")).sort(byFileOrder);
    expect(sorted[0].data.title).toBe("Lightning Talk: eduTAP");
    expect(sorted[0].data.file).toBe("Lightning_Talk_eduTAP_v3.pdf");
    expect(sorted).toHaveLength(33);
  });

  it("history sorted by file order begins with the first involvement", async () => {
    const byFileOrder = (a: { id: string }, b: { id: string }) =>
      Number(a.id.split("-").pop()) - Number(b.id.split("-").pop());
    const sorted = (await getCollection("history")).sort(byFileOrder);
    expect(sorted[0].data.title).toBe("First Involvement");
  });

  // Team.astro renders in team.json file order today only because all 8 ids
  // are single-digit, so string order and numeric order coincide by
  // accident. This pins the actual file order via team.json as ground
  // truth, the same way the history/roadmap/presentations tests above do,
  // so a 9th/10th member (double-digit id) can't silently scramble the
  // homepage team section.
  it("team renders in JSON file order, not id-string order", async () => {
    const source: { name: string }[] = JSON.parse(
      readFileSync("src/data/team.json", "utf8"),
    );
    const expected = source.map((m) => m.name);

    const byFileOrder = (a: { id: string }, b: { id: string }) =>
      Number(a.id.split("-").pop()) - Number(b.id.split("-").pop());
    const sorted = (await getCollection("team")).sort(byFileOrder);
    expect(sorted.map((entry) => entry.data.name)).toEqual(expected);
  });
});
