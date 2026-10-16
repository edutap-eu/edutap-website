# eduTAP Website

The eduTAP project website, built with [Astro](https://astro.build).

## Quick start

Make sure you have [nvm](https://github.com/nvm-sh/nvm) installed, then, in the repository's root directory:

```bash
nvm use
npm install
```

Start the development server:

```bash
npm run dev
```

Your site is now running at <http://localhost:4321>. Edit and save a file in `src/pages/` or `src/components/` to
see your site update in real-time.

## Make targets

The repository exposes its common workflows through a `Makefile`:

- `make lint` — runs `astro check` (type-checks `.astro` files and content schemas) and
  `prettier --check .` (verifies formatting).
- `make reformat` — runs `prettier --write .`.
- `make test-local` — runs the test suite (`npm run test`).
- `make build` — builds the production site into `dist/`.

You can also call the underlying npm scripts directly (`npm run dev`, `npm run check`, `npm run format`,
`npm run test`, `npm run build`, `npm run preview`). `npm run test` builds the site first (via its `pretest`
script), so it is self-sufficient on a fresh checkout.

## Updating content

Content lives in three places:

- `src/data/*.json` — structured data: navigation, team, roadmap, history, presentations, micro news.
- `src/data/news-posts/*.md` — long-form news posts.
- `src/assets/team/` — team member portraits.
- `public/presentations/` — presentation PDFs (served as static files).

Every JSON file and every news post is validated against a schema (see `src/content.config.ts`) when the site
builds. If a required field is missing or has the wrong type, `npm run build` (and therefore `npm run test`) fails
with a named error pointing at the offending file — malformed content can't silently break the live site.

For the exact required fields of each content type and how to verify your change locally, see
[`docs/how-to/add-content.md`](docs/how-to/add-content.md). The short version:

### Presentations

Add the PDF to `public/presentations/`, then add an entry to `src/data/presentations.json` referencing it by
filename only (no path). Presentations can also be linked from a roadmap milestone via the `presentation_file`
field in `src/data/roadmap.json`.

**After adding a presentation PDF, you must run `npm run thumbnails` and commit the generated WebP thumbnail** —
the presentations page displays a thumbnail of the first page next to each PDF, and thumbnails are generated ahead
of time rather than at request time (this is a static site). The script skips a PDF that already has a thumbnail,
so if you **replace** a PDF under the same filename, pass `--force` to regenerate it:
`npm run thumbnails -- --force`.

`npm run thumbnails` requires [poppler](https://poppler.freedesktop.org/) (for `pdftoppm`) and
[webp](https://developers.google.com/speed/webp) (for `cwebp`) to be installed locally:

```bash
brew install poppler webp
```

### Team members

Add the portrait (`.jpg` or `.png`) to `src/assets/team/`, then add an entry to `src/data/team.json` referencing it
by its path relative to `src/`, e.g. `../assets/team/your-image.png`.

### News

The website supports two types of news: micro news and news posts. Both are shown on the news index page.

To add a **micro news** entry, add an entry to `src/data/micro-news.json`:

```json
{
  "title": "Micro news",
  "description": "This is a micro news post",
  "date": "2022-11-24",
  "url": "https://www.example.com"
}
```

The `url` field is optional and links to an external page; set it to `null` if there is none. The date must be in
the format `YYYY-MM-DD`.

To add a **news post**, add a new Markdown file to `src/data/news-posts/`, with frontmatter:

```yaml
---
slug: "/my-first-blog-post" # must have a leading slash
date: "2022-11-24" # must be in the format "YYYY-MM-DD"
title: "My first blog post" # displayed as the title of the post, don't repeat it in the body
short: "This is my first blog post" # short description shown on the news index page
---
```

## Dependency updates

Dependency updates are raised by [Renovate](https://docs.renovatebot.com), configured in
[`.github/renovate.json5`](.github/renovate.json5). That file only holds what is specific to this repository (the
Astro, Tailwind CSS and Sentry groups); everything else comes from the shared eduTAP preset
[`renovate-config.json5` in edutap-eu/.github](https://github.com/edutap-eu/.github/blob/main/renovate-config.json5):
pull requests on Mondays (Europe/Berlin), weekly lock file maintenance, GitHub Actions pinned to commit SHAs, grouped
dev tooling, and Node in `.nvmrc` only on even-numbered (LTS) releases — see <https://endoflife.date/nodejs>.
Security fixes ignore the schedule and are raised immediately, labelled `security`; Renovate takes them from
GitHub's advisories and from [osv.dev](https://osv.dev).

Renovate keeps an open "Dependency Dashboard" issue listing every pending update. It runs as the hosted
[Mend Renovate app](https://github.com/apps/renovate), not as a workflow in this repository — without the app,
`.github/renovate.json5` is inert.

## Checks and security

| Workflow                                        | Runs on                                    | What it does                                                                                    |
| ----------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| "Test Website" (`ci.yaml`)                      | every push to a branch, every pull request | `make lint` (type check, format check) and `make test-local` (build and tests)                  |
| ↳ `dependency-review`                           | pull requests                              | fails if the pull request adds a dependency with a known **critical** vulnerability             |
| "CodeQL" (`codeql.yaml`)                        | pull requests, `main`, weekly              | static analysis of TypeScript/JavaScript and of the workflow files                              |
| "zizmor" (`zizmor.yaml`)                        | changes to `.github/workflows/`            | audits the workflows for injection, broad permissions, unpinned actions                         |
| "Deploy static content to Pages" (`pages.yaml`) | pushes to `main`                           | calls "Test Website" first, then builds and publishes `dist/`; a failing check stops the deploy |

The CI calls the same Make targets as local work, so the two cannot drift apart. A branch of this repository is
tested by its push run only; the pull request run of "Test Website" is skipped for it and kept for pull requests
from forks. CodeQL and zizmor report to **Security → Code scanning**; they annotate but do not block.

### Repository settings no file can set

These live in the repository settings, not in a diff. Whoever recreates the repository has to set them again.

- **Secret scanning with push protection** is on: a push containing a recognised secret is rejected before it
  reaches the history.
- **Ruleset "main"**: changes reach `main` only through a pull request; force pushes and deleting the branch are
  blocked. The "Test Website" `test` check and `dependency-review` are required once they exist on `main`.
- **Dependabot alerts** are on, Dependabot security _updates_ are off — fixes come from Renovate alone, so there is
  one source of update pull requests.
