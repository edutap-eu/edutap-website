import { describe, expect, it } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Container from "../src/components/Container.astro";
import Button from "../src/components/ui/Button.astro";
import Card from "../src/components/ui/Card.astro";
import Badge from "../src/components/ui/Badge.astro";
import Separator from "../src/components/ui/Separator.astro";

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
  it("renders an anchor when given href, carrying the default variant/size classes", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { href: "https://example.org" },
    });
    expect(html).toContain('href="https://example.org"');
    expect(html).toContain("<a");
    expect(html).toContain('data-slot="button"');
    expect(html).toContain(
      "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
    );
    expect(html).toContain("h-9 px-4 py-2 has-[>svg]:px-3");
  });

  it("renders a button element without href", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {});
    expect(html).toContain("<button");
    expect(html).toContain('data-slot="button"');
  });

  it("applies the outline variant classes", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { variant: "outline" },
    });
    expect(html).toContain(
      "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
    );
  });

  it("applies the sm size classes", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Button, {
      props: { size: "sm" },
    });
    expect(html).toContain("h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5");
  });
});

describe("Card", () => {
  it("renders the card wrapper with the shadcn card tokens", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Card, {
      slots: { default: "Body content" },
    });
    expect(html).toContain('data-slot="card"');
    expect(html).toContain(
      "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
    );
    expect(html).toContain('data-slot="card-content"');
    expect(html).toContain("Body content");
  });

  it("renders a header with title and description slots", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Card, {
      slots: {
        title: "Card title",
        description: "Card description",
        default: "Body",
      },
    });
    expect(html).toContain('data-slot="card-header"');
    expect(html).toContain("has-[data-slot=card-action]:grid-cols-[1fr_auto]");
    expect(html).toContain('data-slot="card-title"');
    expect(html).toContain("Card title");
    expect(html).toContain('data-slot="card-description"');
    expect(html).toContain("text-muted-foreground text-sm");
    expect(html).toContain("Card description");
  });

  it("omits the header entirely when no header slots are given", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Card, {
      slots: { default: "Body only" },
    });
    expect(html).not.toContain('data-slot="card-header"');
  });

  it("renders a footer when the footer slot is given", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Card, {
      slots: { default: "Body", footer: "Card footer" },
    });
    expect(html).toContain('data-slot="card-footer"');
    expect(html).toContain("flex items-center px-6 [.border-t]:pt-6");
    expect(html).toContain("Card footer");
  });
});

describe("Badge", () => {
  it("applies the default variant classes", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Badge, {
      slots: { default: "New" },
    });
    expect(html).toContain('data-slot="badge"');
    expect(html).toContain(
      "border-transparent bg-primary text-primary-foreground",
    );
    expect(html).toContain("New");
  });

  it("applies the outline variant classes", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Badge, {
      props: { variant: "outline" },
      slots: { default: "Draft" },
    });
    expect(html).toContain(
      "text-foreground [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground",
    );
  });
});

describe("Separator", () => {
  it("defaults to horizontal with the data-orientation selectors", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Separator, {});
    expect(html).toContain('data-orientation="horizontal"');
    expect(html).toContain(
      "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
    );
  });

  it("honours the vertical orientation prop", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Separator, {
      props: { orientation: "vertical" },
    });
    expect(html).toContain('data-orientation="vertical"');
  });
});
