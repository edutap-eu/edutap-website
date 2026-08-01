import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import NavLinks from "../src/components/NavLinks.astro";

describe("NavLinks", () => {
  it("renders every entry from nav.json", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(NavLinks, {
      props: { pathname: "/" },
    });
    for (const label of ["Overview", "News", "History", "Presentations", "About"]) {
      expect(html).toContain(label);
    }
  });

  it("marks the current route as active", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(NavLinks, {
      props: { pathname: "/news" },
    });
    expect(html).toMatch(/href="\/news"[^>]*class="[^"]*font-bold/);
  });
});
