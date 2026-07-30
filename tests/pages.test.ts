import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getCollection } from "astro:content";
import Team from "../src/components/landing/Team.astro";

describe("Team section", () => {
  it("renders every team member by name", async () => {
    const members = await getCollection("team");
    const container = await AstroContainer.create();
    const html = await container.renderToString(Team, {});
    for (const member of members) {
      expect(html).toContain(member.data.name);
    }
  });
});
