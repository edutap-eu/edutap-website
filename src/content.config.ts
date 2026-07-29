import { defineCollection, z } from "astro:content";
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

const milestoneSchema = z.object({
  title: z.string(),
  date: isoDate,
  /** Original wording, shown instead of the parsed date when present. */
  dateLabel: z.string().optional(),
  milestone_type: z.string().nullable().default(null),
  location: z.string().nullable().default(null),
  event_name: z.string().nullable().default(null),
  description: z.string().nullable().default(null),
  status: z.enum(["reached", "next", "future"]),
  event_link: z.string().url().nullable().default(null),
  presentation_file: z.string().nullable().default(null),
  video_link: z.string().url().nullable().default(null),
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

const presentations = defineCollection({
  loader: file("src/data/presentations.json", { parser: indexed("presentation") }),
  schema: z.object({
    title: z.string(),
    file: z.string().endsWith(".pdf"),
    description: z.string().optional(),
    type: z.enum(["lightning", "conference", "webinar"]),
  }),
});

const microNews = defineCollection({
  loader: file("src/data/micro-news.json", { parser: indexed("micro-news") }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: isoDate,
    url: z.string().url().nullable().default(null),
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

export const collections = { history, roadmap, team, presentations, microNews, news };
