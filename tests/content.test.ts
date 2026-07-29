import { describe, expect, it } from "vitest";
import { getCollection } from "astro:content";

describe("content collections", () => {
  it("loads all 33 presentations with unique ids", async () => {
    const entries = await getCollection("presentations");
    expect(entries).toHaveLength(33);
    expect(new Set(entries.map((e) => e.id)).size).toBe(33);
  });

  it("gives every presentation a valid type", async () => {
    const entries = await getCollection("presentations");
    for (const entry of entries) {
      expect(["lightning", "conference", "webinar"]).toContain(entry.data.type);
    }
  });

  it("loads the team with non-empty orgs and roles", async () => {
    const entries = await getCollection("team");
    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      expect(entry.data.orgs.length).toBeGreaterThan(0);
      expect(entry.data.roles.length).toBeGreaterThan(0);
    }
  });

  it("parses milestone dates into the exact expected values", async () => {
    for (const name of ["history", "roadmap"] as const) {
      const entries = await getCollection(name);
      expect(entries.length).toBeGreaterThan(0);
      for (const entry of entries) {
        expect(entry.data.date).toBeInstanceOf(Date);
        expect(Number.isNaN(entry.data.date.getTime())).toBe(false);
      }
    }

    // Assert a known value, not just "is a Date" — a schema that silently
    // coerces prose would pass the type check while inventing the value.
    const history = await getCollection("history");
    const first = history.find((entry) => entry.data.title === "First Involvement");
    expect(first?.data.date.toISOString().slice(0, 10)).toBe("2020-07-01");
  });

  it("restricts milestone status to the three known values", async () => {
    const entries = await getCollection("history");
    for (const entry of entries) {
      expect(["reached", "next", "future"]).toContain(entry.data.status);
    }
  });
});

describe("roadmap date migration", () => {
  it("keeps the original wording as dateLabel", async () => {
    const entries = await getCollection("roadmap");
    const labels = entries.map((e) => e.data.dateLabel);
    expect(labels).toEqual([
      "End of 2023",
      "Summer 2024",
      "Summer 2024",
      "starting mid 2025",
    ]);
  });

  it("orders entries chronologically by the parsed date", async () => {
    const entries = await getCollection("roadmap");
    const times = entries.map((e) => e.data.date.getTime());
    expect([...times].sort((a, b) => a - b)).toEqual(times);
  });
});
