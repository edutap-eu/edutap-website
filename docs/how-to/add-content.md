# How to add content to the eduTAP website

This guide walks through adding each type of content the website supports. All content is validated against a
schema defined in [`src/content.config.ts`](../../src/content.config.ts) when the site builds. If a required field
is missing, has the wrong type, or fails a format check (for example a date that isn't `YYYY-MM-DD`), `npm run
build` fails with an error naming the collection and the offending field — you get told exactly what's wrong
instead of a page silently rendering blank or broken in production.

For every procedure below, verify your change locally with:

```bash
npm run dev
```

and open the relevant page at <http://localhost:4321>. A failing schema shows up as soon as the dev server (or
`npm run build`) tries to read the collection.

## Add a news post

News posts are long-form articles with their own page, listed on the news index.

1. Create a new Markdown file in `src/data/news-posts/`, for example `src/data/news-posts/my-post.md`.
2. Add frontmatter with these fields (schema: the `news` collection in `src/content.config.ts`):

   | Field   | Type                    | Notes                                            |
   | ------- | ----------------------- | ------------------------------------------------- |
   | `slug`  | `string`, starts with `/` | The post's URL path, e.g. `/my-first-blog-post`. |
   | `date`  | `string`                 | `YYYY-MM-DD` or `YYYY-MM`.                        |
   | `title` | `string`                 | Displayed as the page heading; don't repeat it in the body. |
   | `short` | `string`                 | Short teaser shown on the news index page.        |

   ```yaml
   ---
   slug: "/my-first-blog-post"
   date: "2022-11-24"
   title: "My first blog post"
   short: "This is my first blog post"
   ---
   ```

3. Write the post body in Markdown below the frontmatter.
4. Verify: run `npm run dev`, open <http://localhost:4321/news> and check the post is listed, then open the
   post's own page at `http://localhost:4321<slug>`.

## Add a micro news entry

Micro news are short items shown on the news index page without a dedicated page.

1. Open `src/data/micro-news.json`.
2. Add an entry (schema: the `microNews` collection in `src/content.config.ts`):

   | Field         | Type                      | Notes                                              |
   | ------------- | ------------------------- | --------------------------------------------------- |
   | `title`       | `string`                  |                                                       |
   | `description` | `string`                  |                                                       |
   | `date`        | `string`                  | `YYYY-MM-DD` or `YYYY-MM`.                           |
   | `url`         | `string` (URL) or `null`  | Optional external link; use `null` if there is none. |

   ```json
   {
     "title": "Micro news",
     "description": "This is a micro news post",
     "date": "2022-11-24",
     "url": null
   }
   ```

3. Verify: run `npm run dev` and check <http://localhost:4321/news>.

## Add a presentation

1. Add the PDF file to `public/presentations/` (e.g. `public/presentations/My-Talk-2026.pdf`).
2. Generate its thumbnail:

   ```bash
   npm run thumbnails
   ```

   This requires [poppler](https://poppler.freedesktop.org/) and [webp](https://developers.google.com/speed/webp)
   to be installed locally (`brew install poppler webp`). It writes a WebP thumbnail of the PDF's first page to
   `public/presentations/thumbs/`. **Commit the generated `.webp` file together with the PDF** — thumbnails are
   generated ahead of time, not on the fly, since this is a static site.

3. Add an entry to `src/data/presentations.json` (schema: the `presentations` collection in
   `src/content.config.ts`):

   | Field         | Type                                              | Notes                                  |
   | ------------- | -------------------------------------------------- | --------------------------------------- |
   | `title`       | `string`                                            |                                          |
   | `file`        | `string`, ends with `.pdf`                          | Filename only, no path.                 |
   | `description` | `string`                                            | Optional.                               |
   | `type`        | `"lightning"` \| `"conference"` \| `"webinar"`      |                                          |

   ```json
   {
     "title": "My Talk",
     "file": "My-Talk-2026.pdf",
     "description": "A talk about eduTAP",
     "type": "conference"
   }
   ```

4. Optionally, link the presentation from a roadmap milestone by setting that milestone's `presentation_file` to
   the same filename (see "Add a milestone" below).
5. Verify: run `npm run dev` and check <http://localhost:4321/presentations> — the thumbnail and PDF link should
   both work.

## Add a team member

1. Add the portrait image (`.jpg` or `.png`) to `src/assets/team/`.
2. Add an entry to `src/data/team.json` (schema: the `team` collection in `src/content.config.ts`):

   | Field   | Type                          | Notes                                                |
   | ------- | ----------------------------- | ------------------------------------------------------ |
   | `name`  | `string`                       |                                                          |
   | `orgs`  | `string[]`, at least one entry |                                                          |
   | `roles` | `string[]`, at least one entry |                                                          |
   | `image` | `string`                       | Path relative to `src/`, e.g. `../assets/team/your-image.png`. |

   ```json
   {
     "name": "Jane Doe",
     "orgs": ["LMU Munich"],
     "roles": ["Developer"],
     "image": "../assets/team/jane-doe.jpg"
   }
   ```

3. Verify: run `npm run dev` and check the team section on <http://localhost:4321>. If the filename in `image`
   doesn't match a file in `src/assets/team/`, the build fails with an error naming the missing file.

## Add a milestone

Milestones make up the roadmap and history timelines and share one schema (`milestoneSchema` in
`src/content.config.ts`). Add upcoming or in-progress milestones to `src/data/roadmap.json`; add already-reached
milestones to `src/data/history.json`.

| Field               | Type                                         | Notes                                                    |
| ------------------- | --------------------------------------------- | --------------------------------------------------------- |
| `title`             | `string`                                       |                                                             |
| `date`              | `string`                                       | `YYYY-MM-DD` or `YYYY-MM`.                                 |
| `dateLabel`         | `string`                                       | Optional. Original wording (e.g. `"Summer 2024"`) shown instead of the parsed date when present. |
| `milestone_type`    | `string` or `null`                             | Defaults to `null` if omitted.                             |
| `location`          | `string` or `null`                             | Defaults to `null` if omitted.                             |
| `event_name`        | `string` or `null`                             | Defaults to `null` if omitted.                             |
| `description`       | `string` or `null`                             | Defaults to `null` if omitted.                             |
| `status`            | `"reached"` \| `"next"` \| `"future"`          | Required.                                                  |
| `event_link`        | `string` (URL) or `null`                       | Defaults to `null` if omitted.                             |
| `presentation_file` | `string` or `null`                             | Filename of a presentation PDF in `public/presentations/`, or `null`. |
| `video_link`        | `string` (URL) or `null`                       | Defaults to `null` if omitted.                             |

```json
{
  "title": "Prototype Implementation Common ID Pass",
  "location": "LMU Munich, Germany",
  "milestone_type": "Milestone",
  "description": null,
  "date": "2024-07-01",
  "dateLabel": "Summer 2024",
  "status": "next",
  "event_link": null,
  "presentation_file": null,
  "video_link": null
}
```

Verify: run `npm run dev` and check <http://localhost:4321/roadmap> (for `roadmap.json`) or
<http://localhost:4321/history> (for `history.json`).
