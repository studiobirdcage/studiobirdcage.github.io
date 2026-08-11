# Studio Birdcage

The personal portfolio and journal site for **Barrett Long**. It showcases web, software, mobile, and design work alongside journal entries about development and creative work.

**Live site:** [ba.rrett.dev](https://ba.rrett.dev)

## Stack

- [Astro](https://astro.build/) 7
- React 19 for interactive and reusable UI components
- Tailwind CSS 4
- MDX content collections for work case studies and journal entries
- GitHub Pages deployment via GitHub Actions

## Getting started

Requirements:

- Node.js 22.12 or newer
- npm

```sh
npm install
npm run dev
```

The local site is available at `http://localhost:4321` by default.

## Commands

| Command                       | Description                                               |
| ----------------------------- | --------------------------------------------------------- |
| `npm run dev`                 | Start the Astro development server.                       |
| `npm run build`               | Build the production site into `dist/`.                   |
| `npm run preview`             | Preview a production build locally.                       |
| `npm run format`              | Format the project with Prettier.                         |
| `npm run format:check`        | Check formatting without changing files.                  |
| `npm run content:new`         | Interactively create a journal or work draft.             |
| `npm run content:new:journal` | Interactively create a journal draft.                     |
| `npm run content:new:work`    | Interactively create a work case study draft.             |
| `npx astro check`             | Validate Astro, TypeScript, and content collection types. |

Before opening a pull request or deploying, run:

```sh
npm run format:check
npx astro check
npm run build
```

## Project structure

```text
src/
├── components/          Reusable Astro and React UI components
│   └── content/         Components available to MDX case studies
├── content/
│   ├── posts/           Journal entries as MDX
│   └── works/           Portfolio case studies as MDX
├── layouts/             Shared page layout and site metadata
├── pages/               Astro routes
├── styles/              Global Tailwind and custom CSS
└── content.config.ts    Content collection schemas

public/
├── images/              Public images, work screenshots, and app assets
├── fonts/               Self-hosted fonts
├── favicon.*            Browser and PWA favicon assets
└── site.webmanifest     Web app manifest
```

## Routes

- `/` — Home page
- `/about` — Profile, experience, expertise, and education
- `/contact` — Contact information
- `/works` — Filterable portfolio mosaic
- `/works/[slug]` — Individual work case study
- `/journal` — Filterable journal index
- `/journal/[category]/[slug]` — Individual journal article

## Content

### Create a content draft

Use the content CLI to create a new MDX file with the frontmatter required by the relevant collection schema:

```sh
# Choose journal or work interactively
npm run content:new

# Start a specific content type
npm run content:new:journal
npm run content:new:work
```

The CLI suggests a slug based on the title, uses today's date by default, sets work `publishedAt` to the current ISO timestamp, defaults the journal author to Barrett Long, and creates entries as drafts by default. It will not overwrite an existing file.

Image prompts accept filenames only. The CLI automatically writes journal image paths under `/images/uploads/blog/` and work image paths under `/images/uploads/works/`. When creating a work, it also offers an optional multi-select import for `ImageTriptych`, `TextImageBlock`, `TriptychPanels`, and `ProjectParagraph`.

### Work case studies

Add a new case study in `src/content/works/<slug>.mdx`.

Required frontmatter is defined in `src/content.config.ts`:

```yaml
---
title: "Project Name"
slug: "project-name"
date: "2026-01-01"
publishedAt: "2026-01-01T12:00:00"
featured: false
draft: false
tags: ["Web Design", "Web Development"]
heroImage: "/images/uploads/works/project-hero.jpg"
thumbnailImage: "/images/uploads/works/project-thumbnail.jpg"
when: "January 2026"
who: "Client Name"
where: "https://example.com"
what: "Web Design, Web Development"
how: "Astro, React, TypeScript"
---
```

Use `draft: true` to exclude a work from collection-driven indexes. `featured: true` includes it in the home-page work slider.

Case studies can use the MDX content components in `src/components/content/`, including:

- `ImageTriptych`
- `TextImageBlock`
- `ProjectParagraph`
- `TriptychPanels`

Place work images in `public/images/uploads/works/` and reference them with their `/images/...` public path.

### Journal entries

Add a journal entry in `src/content/posts/<slug>.mdx`.

```yaml
---
title: "Article Title"
slug: "article-title"
date: "2026-01-01"
draft: false
category: "Development Story"
categorySlug: "development-story"
tags: ["Development"]
author: "Barrett Long"
tagline: "A short article tagline."
excerpt: "A short summary used in article cards and metadata."
heroImage: "/images/uploads/blog/article-hero.jpg"
thumbnailImage: "/images/uploads/blog/article-thumbnail.jpg"
videoUrl: null
---
```

Use `draft: true` to keep an entry out of collection-driven journal indexes.

## Images and favicons

- Astro page and MDX image content should use `astro:assets` `<Image />` where practical.
- React components use regular `<img>` elements.
- Public image paths require explicit dimensions when passed to Astro `<Image />`.
- Favicon assets live at the root of `public/`. If an icon changes, bump the cache version in `src/layouts/Layout.astro` and `public/site.webmanifest` so browsers retrieve the updated file.

## Styling

Tailwind is loaded through `@tailwindcss/vite`. Global styles, custom utilities, font declarations, and larger layout rules live in `src/styles/global.css`.

Prettier is configured with Astro, Tailwind, React, and MDX support. Use the project formatting scripts instead of formatting individual files with editor defaults.

## Deployment

The site deploys to GitHub Pages through `.github/workflows/deploy.yml`.

A push to `main` runs:

1. `npm ci`
2. `npm run build`
3. GitHub Pages artifact upload and deployment

The canonical production URL is configured in `astro.config.mjs` as `https://studiobirdcage.com`.
