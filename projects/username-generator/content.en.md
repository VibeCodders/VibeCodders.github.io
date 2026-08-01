---
title: UsernameGenerator
slug: username-generator
order: 5
subtitle: Pronounceable random username generator
description: UsernameGenerator is a small client-side tool that generates pronounceable, random usernames with configurable length, style, readability and pronounceability sliders.
keywords: UsernameGenerator, username generator, random usernames, pronounceable, JavaScript, Vite, VibeCodders
tags: JavaScript, HTML, CSS, Vite
language: JavaScript
os: Web
repo: https://github.com/VibeCodders/UsernameGenerator
demo: https://vibecodders.github.io/UsernameGenerator/
---

**UsernameGenerator** is a small client-side tool that generates pronounceable, random usernames. No build step or dependencies are required to use it — it's plain HTML/CSS/JS.

## Key Features

- **Configurable length** — from 1 to 20 characters
- **Style options** — Plain, With numbers, With_underscore, CamelCase, L33t speak
- **Ease to Read / Ease to Say sliders** (1-500) — bias generation toward simpler letter patterns and phonotactically valid consonant clusters; values above 100 progressively narrow the letter/cluster pool down to the most common/easiest entries
- **Language selector** — English / Italiano, changing letter frequency and valid consonant clusters used by the ease sliders
- **Copy-to-clipboard button**
- **Favorites and history** — save favorite generated usernames and track generation history

## Project Structure

```
index.html              Page markup
css/style.css            Styles
js/usernameGenerator.js  Generation algorithm (framework/DOM free)
js/app.js                DOM wiring / UI logic
```

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | JavaScript, HTML, CSS |
| Build tool | Vite |

## Usage

```bash
npm install
npm run dev
```

Then open the URL Vite prints (defaults to `http://localhost:5173`). You can also just open `index.html` directly in a browser — no build step is required.
