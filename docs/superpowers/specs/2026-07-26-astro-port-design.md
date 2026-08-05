# Design: Port the eduTAP website from Gatsby to Astro

Date: 2026-07-26
Status: approved
Scope: platform migration only — the visual redesign is a separate follow-up project

## 1. Motivation

The site runs on Gatsby 5. Gatsby Cloud has been shut down and upstream development has
effectively stalled, so the framework is a dead end for a site that needs to be maintained
for years. Astro is the natural successor for a content-driven marketing site: it ships no
JavaScript by default, keeps the existing Tailwind setup, and deploys to GitHub Pages the
same way the current site does.

This document covers **only the platform migration**. The site must look and behave the same
afterwards. Redesigning structure and appearance is a second project that builds on this one;
separating the two keeps the migration verifiable — after the port, any visual difference is
a defect rather than an intended change.

## 2. Goals and non-goals

### Goals

- Replace Gatsby with Astro without changing URLs, content, or appearance
- Remove React entirely; ship zero client-side JavaScript except Sentry
- Validate all hand-maintained content files at build time
- Keep the existing GitHub Pages deployment model

### Non-goals

These are explicitly out of scope and deferred to the redesign project:

- The new logo (produced separately by the project owner)
- Any change to layout, typography, page structure, or navigation
- Updating the outdated roadmap content
- Populating `micro-news.json` (currently an empty array)
- Completing the "under construction" imprint page
- Adding German or any other language

## 3. Current state

Nine routes: `/`, `/news`, `/news/<slug>`, `/history`, `/presentations`, `/roadmap`,
`/about`, `/legal/imprint`, `/legal/privacy-policy`, plus a 404 page.

About 1,500 lines of React across 22 components. Content lives in `src/data/` as five JSON
files plus one Markdown post; 35 PDFs sit in `static/presentations/`, 12 images in
`src/images/`. Deployment is a push to `main`, which triggers a GitHub Actions workflow that
builds and uploads `public/` to GitHub Pages.

`/roadmap` exists as a page but is not listed in `nav.json`, so it is reachable only by
direct link.

### Defects found during analysis

These are fixed as part of the port because the affected code is being rewritten anyway:

| Issue                                                                                                                                                                            | Location                             | Fix                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------- |
| daisyUI classes `btn`, `btn-sm`, `text-base-content/70` are used, but daisyUI is never registered as a Tailwind plugin — the timeline's Slides/Event/Video links render unstyled | `src/components/milestone.tsx:68,79` | Links get real styling via the new `Button.astro`; daisyUI is dropped   |
| `console.log(milestone)` runs for every milestone in production                                                                                                                  | `src/components/milestone.tsx:31`    | Removed                                                                 |
| `useState`/`useEffect` mirror a value that never changes                                                                                                                         | `src/components/milestone.tsx:32-49` | Replaced by CSS status tokens                                           |
| Unescaped `&` in a commented-out `@import` makes the file invalid XML; strict SVG renderers fail to parse it                                                                     | `static/logo.svg:6`                  | Escaped                                                                 |
| Dead files: empty `colors.css`, `favicon-square2.png.png` (doubled extension), `test.svg`                                                                                        | `static/`                            | Not carried over                                                        |
| `Tabs` component is never imported anywhere                                                                                                                                      | `src/components/ui/tabs.tsx`         | Not carried over                                                        |
| The newest entry has a typo in its key — `"type:"` instead of `"type"` — so it matches neither group filter and is invisible on the live presentations page                      | `src/data/presentations.json:24`     | Key corrected; the new schema makes this class of error a build failure |

Two further observations, left untouched because they are editorial rather than technical:
`eduTAP-PloneConf2025.pdf` and `eduTAP-Poster-Charm-EU.pdf` sit in `static/presentations/`
without being referenced from `presentations.json`, and three team portraits
(`lmu-campus.jpg`, `lmu-campus-org.jpg`, `jfalves-org.png`) are unused.

## 4. Stack

| Package                             | Version | Note                                                                                                                            |
| ----------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `astro`                             | 7.1.3   |                                                                                                                                 |
| `tailwindcss` + `@tailwindcss/vite` | 4.3.3   | `@astrojs/tailwind` is deprecated and must not be used                                                                          |
| `@astrojs/sitemap`                  | 3.7.3   | replaces `gatsby-plugin-sitemap`                                                                                                |
| `@astrojs/mdx`                      | —       | **not used.** Gatsby loaded `gatsby-plugin-mdx`, but the only post is plain `.md`; Astro handles Markdown natively              |
| `@sentry/astro`                     | 10.68.0 | replaces `@sentry/gatsby`, same DSN                                                                                             |
| Node                                | 24 LTS  | `.nvmrc` currently reads `lts/*`, which is unpinned and can shift without notice; pin it. Node 24 is supported until 2028-04-30 |

React, `react-pdf`, `react-vertical-timeline-component`, `lucide-react`, `daisyui`,
`class-variance-authority`, and the Radix packages are all removed.

## 5. Project structure

```text
src/
  content.config.ts        collections and Zod schemas
  data/                    unchanged: *.json and news-posts/*.md
  pages/                   *.astro, URLs identical to today
  layouts/BaseLayout.astro
  components/              *.astro
  styles/global.css        Tailwind 4 tokens
  assets/team/             moved from src/images/team/, for astro:assets
public/
  presentations/           35 PDFs, moved from static/
  presentations/thumbs/    generated WebP thumbnails
```

## 6. Content layer

Five collections in `src/content.config.ts`, all validated with Zod. The `file()` loader
requires every entry to carry a unique `id`, which the JSON files do not have. Rather than
editing the editorial data, a `parser` callback generates ids on load:

```ts
const history = defineCollection({
  loader: file("src/data/history.json", {
    parser: (raw) =>
      JSON.parse(raw).map((entry, index) => ({
        id: `history-${index}`,
        ...entry,
      })),
  }),
  schema: milestoneSchema,
});
```

### Collections

| Collection           | Source                                  | Notes                                                                                 |
| -------------------- | --------------------------------------- | ------------------------------------------------------------------------------------- |
| `news`               | `src/data/news-posts/*.md` via `glob()` | frontmatter: `slug`, `date`, `title`, `short`                                         |
| `microNews`          | `src/data/micro-news.json`              | currently `[]`; schema defined so the documented feature works once entries are added |
| `team`               | `src/data/team.json`                    | `name`, `orgs[]`, `roles[]`, `image`                                                  |
| `presentations`      | `src/data/presentations.json`           | `title`, `file`, `description`, `type`                                                |
| `history`, `roadmap` | `src/data/*.json`                       | share one `milestoneSchema`                                                           |

### Milestone date handling

`history.json` uses ISO dates; `roadmap.json` uses free text ("End of 2023"). Both are
rendered by the same component. The schema unifies them on a real date and keeps the original
wording for display:

```ts
const milestoneSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  dateLabel: z.string().optional(),
  // ...
});
```

The four roadmap entries are converted conservatively. Rendering prefers `dateLabel` when
present, so the visible output is unchanged:

| Current value           | `date`       | `dateLabel`           |
| ----------------------- | ------------ | --------------------- |
| `"End of 2023"`         | `2023-12-31` | `"End of 2023"`       |
| `"Summer 2024"` (twice) | `2024-07-01` | `"Summer 2024"`       |
| `"starting mid 2025"`   | `2025-07-01` | `"starting mid 2025"` |

Note that all four roadmap dates are in the past and their `status` values are stale.
Correcting this is editorial work, deliberately left out of the port.

### Images

The 12 team images move to `src/assets/team/`. The relative paths in `team.json`
(`"../images/team/loechel.jpg"`) do not resolve through `astro:assets`, so an
`import.meta.glob` registry maps each path to an imported asset. The schema verifies that
every referenced path resolves — a typo breaks the build instead of rendering a blank image.

## 7. Components

All components become `.astro`. Three need real replacement work:

### Presentation card

Today the card is already an `<a href="/presentations/<file>">`; `react-pdf` only renders a
thumbnail of the first page. Thumbnails are therefore pre-generated instead:

- `npm run thumbnails` runs `pdftoppm` over `public/presentations/*.pdf` and writes
  `public/presentations/thumbs/<name>.webp` (first page, 400 px wide)
- Output is committed, so CI needs no poppler installation
- The card renders `<img loading="lazy">`; appearance is unchanged
- The commented-out type badge (lines 69–77) is not carried over
- README documents that adding a PDF requires re-running the script

### Timeline

`Timeline.astro` and `Milestone.astro` rebuild the vertical timeline in CSS Grid: centre
line, alternating cards, coloured status dot. Status colours move into `global.css` as
tokens, which also resolves the existing `TODO: make colors depend on ui theme`:

| Status    | Colour    |
| --------- | --------- |
| `reached` | `#12684A` |
| `next`    | `#3E99C0` |
| `future`  | `#24343D` |

### UI primitives

`Button`, `Card`, `Badge`, and `Separator` become `.astro` components — they are pure markup,
so this is lossless. `Tabs` is dropped as dead code.

## 8. Brand colours

Extracted from the repository and from EUGLOH's stylesheets. These are preserved exactly.
The current Tailwind tokens in `global.css` are slightly inaccurate oklch approximations
(`--primary` resolves to `#165793` rather than `#115794`); the port sets them to the exact
values.

| Role                   | Hex       | EUGLOH variable     |
| ---------------------- | --------- | ------------------- |
| Wordmark "edu", wave 1 | `#115794` | `--secondColorDark` |
| Claim, wave 2          | `#4097BE` | `--secondColor`     |
| Wave 3                 | `#F07129` | `--mainColorLight`  |
| Wordmark "TAP", wave 4 | `#D76525` | `--mainColor`       |
| Background             | `#F7F7FB` | `--backgroundColor` |
| Border                 | `#E3E3EF` | `--borderColor`     |

The eduTAP mark already uses the EUGLOH palette exactly, including background and border.
Erasmus+ currently uses `#0E3051` as its theme colour — not `#004494`, which is EU web blue.

## 9. Testing

Structure is verified automatically; appearance is reviewed manually in the browser. Suite
runs on Vitest with Astro's Container API, so no browser is required.

- **Routes** — all nine URLs from the Gatsby build exist in the Astro build, including the
  news detail route
- **Content integrity** — 33 presentation entries, 8 team members, 12 history milestones and
  4 roadmap milestones rendered; every file referenced from JSON exists on disk
- **Thumbnail coverage** — every PDF in `public/presentations/` has a matching WebP in
  `thumbs/`, so a forgotten `npm run thumbnails` fails CI instead of shipping a blank card
- **Metadata** — `<title>`, description, canonical URL, sitemap entries
- **Links** — no internal link points nowhere

Schema validation is the first line of defence: malformed content data fails the build before
any test runs.

The repository currently has no `Makefile`. The port adds one, providing the standard
interface used across these projects: `make lint`, `make reformat`, `make test-local`. Each
target wraps the corresponding npm script, so both entry points stay usable.

## 10. Deployment

`.github/workflows/pages.yaml` keeps its structure. Changes:

- artifact path `public` → `dist`
- Node pinned to 24 instead of `lts/*`
- test run added before the build

No switch to `withastro/action` is needed; `upload-pages-artifact` works unchanged.
`.nojekyll` stays.

## 11. Risks

| Risk                                                                   | Mitigation                                                                                                                         |
| ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| CSS timeline does not match the old library pixel-for-pixel            | Manual side-by-side review against the running Gatsby build before merging; the timeline is the one component rebuilt from scratch |
| Thumbnails go stale when someone adds a PDF without running the script | Documented in the README; a test asserts that every PDF has a matching thumbnail, so CI fails loudly                               |
| Sentry behaves differently under Astro than under Gatsby               | Verify events reach the LMU Sentry instance from a preview build before merging                                                    |
| Astro 7 is recent; integrations may lag                                | Only three integrations are used, all first-party and current                                                                      |

## 12. Definition of done

- All nine routes render, content complete, no internal link broken
- No React in the bundle; no client-side JavaScript other than Sentry
- Test suite green, `make lint` clean
- Appearance manually confirmed against the Gatsby build across desktop and mobile widths
- Deployment to GitHub Pages succeeds from the feature branch
