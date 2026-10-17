---
title: Shelfly
slug: shelfly
order: 7
subtitle: TV shows and movies tracker for Android with WebDAV sync
description: Shelfly is an Android TV show and movie tracking app that replaces proprietary cloud sync with scheduled WebDAV backups to infrastructure you own and control.
keywords: Shelfly, Android, TV shows, movies tracker, WebDAV, TMDB, Obtainium, Nextcloud, open source, privacy, VibeCodders
tags: Kotlin, Android, WebDAV, TMDB
language: Kotlin
os: Android
repo: https://github.com/stignarnia/shelfly
download: https://github.com/stignarnia/shelfly/releases/latest
---

**Shelfly** is an open-source Android application for tracking movies and TV shows, designed to put users in full control of their watch history and metadata. Built as a specialized fork of Showly, Shelfly eliminates reliance on third-party cloud accounts by replacing proprietary sync with direct, automated **WebDAV backups** to personal infrastructure such as Nextcloud, a NAS, or any WebDAV-compatible server.

Catalog data is fetched directly from **The Movie Database (TMDB)** using the user's own free API key provided on first launch, ensuring complete privacy and independence from proprietary platforms.

## Key Features

- **Self-Hosted WebDAV Sync** — Automated, scheduled backups and seamless restores to and from your own private server (Nextcloud, NAS, WebDAV storage) with zero third-party intermediaries.
- **Local-First & Private** — All watch history and tracking state remain on your device and private storage. No user accounts, tracking, or subscriptions.
- **Direct TMDB Catalog** — Rich metadata, episode details, and movie information supplied via user-configured TMDB API keys.
- **Streaming Service Filters** — Regional watch provider filters powered by TMDB, dynamically showing what is available to stream in your area.
- **Modern Android Theming** — Full Material You dynamic color support (Android 14+), pure-black AMOLED option, and adaptive themes for light and dark modes.
- **Customizable Themed Widgets** — Home screen widgets that dynamically match system themes with customizable transparency, row density, and layouts (Android 12+).
- **Adaptive Layouts** — Responsive design supporting screen rotation, foldables, and tablets with landscape navigation.
- **Automated Updates** — Full compatibility with [Obtainium](https://github.com/ImranR98/Obtainium) for automatic update tracking directly from GitHub Releases.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Language | Kotlin |
| Platform | Android (minSdk 24 / Android 7.0+) |
| Architecture | Multi-module Clean Architecture (MVVM, Coroutines, Flow) |
| Local Storage | Room Database, EncryptedSharedPreferences |
| Network & Sync | Retrofit, OkHttp, WebDAV protocol |
| Remote Catalog | TMDB API (The Movie Database) |
| UI & Theming | Material Design Components, Dynamic Colors, Jetpack Compose / View Binding |

## Why WebDAV?

Traditional tracking apps lock your viewing history inside centralized platforms. Shelfly removes the middleman: your collection is safely backed up to hardware you already run. Scheduled exports run automatically in the background without needing manual user intervention.
