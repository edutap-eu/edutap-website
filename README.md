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
[`.github/renovate.json5`](.github/renovate.json5). Renovate keeps an open "Dependency Dashboard" issue listing
every pending update, and opens grouped pull requests once a week (Monday morning, Europe/Berlin). Security
fixes ignore that schedule and are raised immediately, labelled `security`.

Renovate runs as a hosted GitHub App, not as a workflow in this repository — **the configuration only takes effect
once the [Mend Renovate app](https://github.com/apps/renovate) is installed for the organisation (or at least for
this repository)**. Until then, `.github/renovate.json5` is inert.

Updates are grouped so that packages which are only meaningful together end up in one pull request: Astro and its
integrations, Tailwind CSS, Sentry, all non-major dev tooling, and GitHub Actions. Every pull request is
type-checked, format-checked and tested by the "Test Website" workflow (see below), so a broken update fails
before it can be merged. Node in `.nvmrc` is only offered even-numbered (LTS) releases —
see <https://endoflife.date/nodejs>.

## Deployment

Every pull request and every push to a branch other than `main` runs the "Test Website" workflow
(`.github/workflows/ci.yaml`): it type-checks the project (`npm run check`), verifies formatting
(`npm run format:check`) and runs the test suite (which builds the site as part of its `pretest` step). The deploy
workflow below runs the tests but not those two checks, since a change reaching `main` has already passed them
here.

Pushing to `main` triggers the "Deploy static content to Pages" GitHub Actions workflow
(`.github/workflows/pages.yaml`), which installs dependencies, runs the test suite (which builds the site as part
of its `pretest` step), and publishes `dist/` to GitHub Pages.
