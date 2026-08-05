import { defineCollection } from "astro:content";
// `import { z } from "astro:content"` is deprecated and slated for removal;
// Astro re-exports the zod version it validates with as `astro/zod`, so this
// import stays in step with Astro instead of pinning a second copy of zod.
import { z } from "astro/zod";
import { file, glob } from "astro/loaders";

/** Adds a stable, unique id to each entry of a plain JSON array. */
function indexed(prefix: string) {
  return (raw: string) =>
    JSON.parse(raw).map((entry: Record<string, unknown>, index: number) => ({
      id: `${prefix}-${index}`,
      ...entry,
    }));
}

/**
 * An ISO date, either YYYY-MM-DD or YYYY-MM.
 *
 * Deliberately NOT z.coerce.date(): V8 extracts a trailing year from free
 * text, so `new Date("Summer 2024")` yields 1 January 2024 rather than an
 * Invalid Date. Coercion would therefore accept the roadmap's prose dates
 * and silently invent values that are up to six months wrong. The regex
 * rejects them instead, which is the whole point of validating this field.
 */
const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}(-\d{2})?$/, "must be an ISO date: YYYY-MM-DD or YYYY-MM")
  .transform((value) => new Date(value));

export const milestoneSchema = z.object({
  title: z.string(),
  date: isoDate,
  /** Original wording, shown instead of the parsed date when present. */
  dateLabel: z.string().optional(),
  milestone_type: z.string().nullable().default(null),
  location: z.string().nullable().default(null),
  event_name: z.string().nullable().default(null),
  description: z.string().nullable().default(null),
  status: z.enum(["reached", "next", "future"]),
  event_link: z.url().nullable().default(null),
  presentation_file: z.string().nullable().default(null),
  video_link: z.url().nullable().default(null),
});

const history = defineCollection({
  loader: file("src/data/history.json", { parser: indexed("history") }),
  schema: milestoneSchema,
});

const roadmap = defineCollection({
  loader: file("src/data/roadmap.json", { parser: indexed("roadmap") }),
  schema: milestoneSchema,
});

const team = defineCollection({
  loader: file("src/data/team.json", { parser: indexed("team") }),
  schema: z.object({
    name: z.string(),
    orgs: z.array(z.string()).min(1),
    roles: z.array(z.string()).min(1),
    image: z.string(),
  }),
});

// Previously a plain `import navItems from "../data/nav.json"` in NavLinks.astro
// and Footer.astro, with no schema even though the README claimed all
// hand-maintained JSON was validated. Renaming a field (e.g. `to` -> `href`)
// would have shipped `href="undefined"` links on every page's header and
// footer with a green build. Now a content collection like every other
// editorial JSON file, so the same build-time validation applies.
const nav = defineCollection({
  loader: file("src/data/nav.json", { parser: indexed("nav") }),
  schema: z.object({
    to: z.string(),
    text: z.string(),
  }),
});

export const presentationSchema = z.object({
  title: z.string(),
  file: z.string().endsWith(".pdf"),
  description: z.string().optional(),
  type: z.enum(["lightning", "conference", "webinar"]),
});

const presentations = defineCollection({
  loader: file("src/data/presentations.json", {
    parser: indexed("presentation"),
  }),
  schema: presentationSchema,
});

const microNews = defineCollection({
  loader: file("src/data/micro-news.json", { parser: indexed("micro-news") }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: isoDate,
    url: z.url().nullable().default(null),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/news-posts" }),
  schema: z.object({
    slug: z.string().startsWith("/"),
    date: isoDate,
    title: z.string(),
    short: z.string(),
  }),
});

export const collections = {
  history,
  roadmap,
  team,
  presentations,
  microNews,
  news,
  nav,
};
