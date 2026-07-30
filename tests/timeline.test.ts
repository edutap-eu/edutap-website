import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Milestone from "../src/components/Milestone.astro";

const base = {
  title: "Initial Idea eduTAP",
  date: new Date("2020-07-01"),
  milestone_type: null,
  location: "online",
  event_name: null,
  description: "a description",
  status: "reached" as const,
  event_link: null,
  presentation_file: null,
  video_link: null,
};

describe("Milestone", () => {
  it("shows a checkmark for reached milestones", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Milestone, {
      props: { milestone: base, side: "left" },
    });
    expect(html).toContain("✓");
  });

  it("shows no checkmark for future milestones", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Milestone, {
      props: { milestone: { ...base, status: "future" }, side: "left" },
    });
    expect(html).not.toContain("✓");
  });

  it("prefers dateLabel over the parsed date", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Milestone, {
      props: {
        milestone: { ...base, dateLabel: "Summer 2024" },
        side: "left",
      },
    });
    expect(html).toContain("Summer 2024");
  });

  it("links slides, event and video when present", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Milestone, {
      props: {
        milestone: {
          ...base,
          presentation_file: "ECCA-2022.pdf",
          event_link: "https://example.org/event",
          video_link: "https://youtu.be/abc",
        },
        side: "right",
      },
    });
    expect(html).toContain('href="/presentations/ECCA-2022.pdf"');
    expect(html).toContain('href="https://example.org/event"');
    expect(html).toContain('href="https://youtu.be/abc"');
  });
});
