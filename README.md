# VibeCodders

Site source for **[VibeCodders.github.io](https://VibeCodders.github.io/)** — a small showcase of our
software projects. Static site, no build step, hosted on GitHub Pages.

## Projects

| Project | Description | Stack |
|---------|-------------|-------|
| [ArtnetServer](https://github.com/VibeCodders/ArtnetServer) | Art-Net Node server that receives DMX over the network and forwards it to DMX hardware (GUI / CLI / Headless). | C#, .NET 10, WPF |
| [PostgREST](https://github.com/stignarnia/PostgREST) | Self-contained HTTP-to-PostgreSQL gateway: query, credentials and TLS certs travel inside each JSON request. | Rust, PostgreSQL, mTLS |
| [kinect2pipe-IR](https://github.com/stignarnia/kinect2pipe-IR) | Turns a Kinect 2 into an infrared webcam on Linux for Howdy facial unlock. | C++, CMake, v4l2loopback |
| [GeoMSTView](https://github.com/stignarnia/GeoMSTView) | Web app that computes and animates the Minimum Spanning Tree between cities from OpenStreetMap. | JavaScript, Leaflet, WebAssembly |

## How it works

The site is intentionally low-tech: plain HTML/CSS and a little vanilla JavaScript, no framework or
bundler.

```
.
├── index.html              # Homepage — project grid is generated at runtime
├── assets/                 # Shared, reused boilerplate for every page
│   ├── base.css            # Shared styles (reset, nav, footer, language switch)
│   ├── home.css            # Homepage-specific styles
│   ├── home.js             # Discovers projects and builds the homepage cards
│   ├── style.css           # Project-page-specific styles
│   ├── project.js          # Renders a project page from its Markdown content
│   └── lang.js             # i18n: language detection, selector, static translations
├── projects/
│   └── <slug>/
│       ├── index.html      # Tiny shell (identical for every project)
│       ├── content.it.md   # Italian content + frontmatter
│       └── content.en.md   # English content + frontmatter
├── sitemap.xml
└── robots.txt
```

### Content lives in Markdown

Each project page is the **same** HTML/CSS/JS shell. All the project-specific text — title, tags,
description, links and the page body — lives in `content.it.md` / `content.en.md`, parsed and rendered
client-side by `assets/project.js`. Editing a project means editing Markdown, not HTML.

### The homepage is dynamic

`index.html` never lists projects directly. `assets/home.js` discovers the folders under `projects/`
at runtime via the [GitHub Contents API](https://docs.github.com/rest/repos/contents) and builds one
card per folder from that folder's frontmatter. **Adding a project never requires touching
`index.html`.**

### Internationalisation

`assets/lang.js` picks the language from `localStorage` (key `vc-lang`), falling back to the browser
language (Italian for Italian browsers, English otherwise). The choice persists across visits and can be
changed with the **IT / EN** switch in the navbar. Static UI strings use `data-i18n-it` / `data-i18n-en`
attributes; project pages simply load the matching `content.<lang>.md`.

## Adding a new project

1. Create `projects/<slug>/` with:
   - `index.html` — copy it verbatim from any existing project folder (it is identical everywhere).
   - `content.it.md` and `content.en.md` — see the frontmatter fields below.
2. Commit and push.

That's it. The homepage picks the new folder up automatically once it is on the repo's default branch.
Optionally add a `<url>` entry to `sitemap.xml` (SEO only — the site works without it).

### Frontmatter fields

```yaml
---
title: My Project            # required
slug: my-project             # required — must match the folder name
order: 5                     # optional — lower sorts first on the homepage
subtitle: One-line tagline
description: Short paragraph used on the card and in <meta> tags.
keywords: comma, separated, seo, keywords
tags: Rust, CLI, Linux       # shown as pills
language: Rust               # optional — schema.org programmingLanguage
os: Linux                    # optional — schema.org operatingSystem
repo: https://github.com/owner/my-project
download: https://github.com/owner/my-project/releases/latest   # optional
downloadLabel: ⬇️ Custom label                                  # optional
---

Markdown body (headings, lists, tables, code blocks) goes here.
```

On the homepage card the second button is **Download** when `download` points at a release, otherwise a
plain **GitHub** button linking to `repo`.

## Local development

Because pages fetch Markdown with `fetch()`, open the site through a web server, not `file://`:

```bash
python3 -m http.server 8000
# then browse http://localhost:8000/
```

Note: the homepage card list is fetched from the GitHub API and reflects the repo's **default branch**,
so locally-added (uncommitted) project folders only appear on the live site after they are pushed.
Individual project pages render from local files and work offline via the local server.
