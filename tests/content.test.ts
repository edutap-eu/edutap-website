import { describe, expect, it } from "vitest";
import { getCollection } from "astro:content";
import { milestoneSchema, presentationSchema } from "../src/content.config";

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

describe("schema validation rejects malformed content", () => {
  // A valid milestone, used as the baseline that each case below mutates.
  // Keeping one baseline object (rather than repeating all fields per test)
  // makes it obvious that exactly one field is what causes rejection.
  const validMilestone = {
    title: "Prototype Implementation",
    date: "2024-07-01",
    status: "next",
  };

  it("rejects a prose date instead of silently coercing it, per the isoDate comment above", () => {
    // This is the regression the port's date decision exists to prevent: if
    // isoDate were ever reverted to z.coerce.date(), this would start
    // passing (V8 extracts "2024" from the string) while every other test
    // in this file stays green, because none of them feed in prose.
    const result = milestoneSchema.safeParse({
      ...validMilestone,
      date: "Summer 2024",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a milestone missing its required status field", () => {
    const { status: _status, ...withoutStatus } = validMilestone;
    const result = milestoneSchema.safeParse(withoutStatus);
    expect(result.success).toBe(false);
  });

  it("rejects a milestone status outside the reached/next/future enum", () => {
    const result = milestoneSchema.safeParse({
      ...validMilestone,
      status: "someday",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a presentation type outside the lightning/conference/webinar enum", () => {
    const result = presentationSchema.safeParse({
      title: "A Talk",
      file: "a-talk.pdf",
      type: "keynote",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a presentation file that doesn't end in .pdf", () => {
    const result = presentationSchema.safeParse({
      title: "A Talk",
      file: "a-talk.pptx",
      type: "conference",
    });
    expect(result.success).toBe(false);
  });

  it("accepts the baseline milestone unmodified, proving the cases above fail because of the mutation and not the fixture", () => {
    expect(milestoneSchema.safeParse(validMilestone).success).toBe(true);
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
