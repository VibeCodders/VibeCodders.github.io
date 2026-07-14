---
title: GeoMSTView
slug: geomstview
order: 4
subtitle: Minimum Spanning Tree viewer on a map
description: GeoMSTView is a web app that computes and displays the Minimum Spanning Tree connecting cities from OpenStreetMap data, animating the edge-building process with GIF export.
keywords: GeoMSTView, Minimum Spanning Tree, MST, Leaflet, OpenStreetMap, Overpass API, WebAssembly, PWA, Vite, JavaScript, VibeCodders
tags: JavaScript, Leaflet, WebAssembly, Vite, PWA, OpenStreetMap
language: JavaScript
os: Web
repo: https://github.com/stignarnia/GeoMSTView
downloadLabel: ⬇️ See build instructions
download: https://github.com/stignarnia/GeoMSTView#readme
---

**GeoMSTView** is an interactive web application that computes and displays the **Minimum Spanning Tree** (MST) connecting a set of cities from **OpenStreetMap** data. Users can watch how the algorithm connects the cities with the shortest total distance, animating the edge-building process.

## Key Features

- **Multiple datasets** — built-in capitals, preset queries or custom Overpass QL
- **MST animation** — progressive edge addition with adjustable speed
- **GIF export** — export the animation up to 1080p / 15fps via WebAssembly encoding
- **Progressive Web App** — installable on mobile devices
- **Configuration** — settings via `settings.json` for tile servers and performance parameters
- **Accurate geographic distances** — great-circle computation
- **IndexedDB caching** — reduces API calls

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | JavaScript, HTML, CSS |
| Map | Leaflet |
| Heavy computation | Web Workers |
| GIF export | WebAssembly |
| Build tool | Vite |
| Data source | OpenStreetMap via Overpass API |

## Performance

The application balances computational efficiency and visual interactivity: heavy computations are offloaded to **Web Workers** so they never block the interface, while results are stored in **IndexedDB** to minimize API calls. This makes it possible to handle datasets ranging from a few dozen to hundreds of cities.
