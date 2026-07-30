import { describe, expect, it } from "vitest";
import { getCollection } from "astro:content";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import NewsItem from "../src/components/NewsItem.astro";

describe("news", () => {
  it("has a post whose slug starts with a slash", async () => {
    const posts = await getCollection("news");
    expect(posts.length).toBeGreaterThan(0);
    for (const post of posts) {
      expect(post.data.slug.startsWith("/")).toBe(true);
    }
  });

  it("merges micro news and posts newest first", async () => {
    const [posts, micro] = await Promise.all([
      getCollection("news"),
      getCollection("microNews"),
    ]);
    const merged = [...posts, ...micro].sort(
      (a, b) => b.data.date.getTime() - a.data.date.getTime(),
    );
    const times = merged.map((e) => e.data.date.getTime());
    expect([...times].sort((a, b) => b - a)).toEqual(times);
  });
});

describe("NewsItem", () => {
  const item = {
    date: new Date("2025-03-31"),
    title: "First Post",
    description: "We added a blog!",
  };

  it("opens external links in a new tab", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(NewsItem, {
      props: { ...item, url: "https://example.org/news", isInternal: false },
    });
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noreferrer"');
  });

  it("keeps internal links in the same tab", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(NewsItem, {
      props: { ...item, url: "/news/first-post", isInternal: true },
    });
    expect(html).not.toContain('target="_blank"');
  });

  it("renders without a url", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(NewsItem, { props: item });
    expect(html).toContain("First Post");
  });
});
