import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Container from "../src/components/Container.astro";
import Button from "../src/components/ui/Button.astro";

describe("Container", () => {
  it("applies the lg max width by default", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Container, {});
    expect(html).toContain("max-w-screen-2xl");
  });

  it("honours the size prop", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Container, {
      props: { size: "md" },
    });
    expect(html).toContain("max-w-screen-xl");
  });

  it("renders a custom element via the as prop", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Container, {
      props: { as: "section" },
    });
    expect(html).toContain("<section");
  });
});

describe("Button", () => {
  it("renders an anchor when given href", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { href: "https://example.org" },
    });
    expect(html).toContain('href="https://example.org"');
    expect(html).toContain("<a");
  });

  it("renders a button element without href", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {});
    expect(html).toContain("<button");
  });
});
