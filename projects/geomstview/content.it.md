---
title: GeoMSTView
slug: geomstview
order: 4
subtitle: Visualizzatore di Minimum Spanning Tree su mappa
description: GeoMSTView è una web app che calcola e visualizza il Minimum Spanning Tree tra città da dati OpenStreetMap, con animazione della costruzione degli archi ed export in GIF.
keywords: GeoMSTView, Minimum Spanning Tree, MST, Leaflet, OpenStreetMap, Overpass API, WebAssembly, PWA, Vite, JavaScript, VibeCodders
tags: JavaScript, Leaflet, WebAssembly, Vite, PWA, OpenStreetMap
language: JavaScript
os: Web
repo: https://github.com/stignarnia/GeoMSTView
downloadLabel: ⬇️ Vedi le istruzioni di build
download: https://github.com/stignarnia/GeoMSTView#readme
---

**GeoMSTView** è un'applicazione web interattiva che calcola e visualizza il **Minimum Spanning Tree** (MST) che collega un insieme di città a partire da dati **OpenStreetMap**. Gli utenti possono osservare come l'algoritmo connette le città con la distanza totale minima, animando il processo di costruzione degli archi.

## Caratteristiche Principali

- **Dataset multipli** — capitali predefinite, query preimpostate oppure Overpass QL personalizzato
- **Animazione dell'MST** — aggiunta progressiva degli archi con velocità regolabile
- **Export GIF** — esportazione dell'animazione fino a 1080p / 15fps tramite encoding WebAssembly
- **Progressive Web App** — installabile su dispositivi mobili
- **Configurazione** — impostazioni via `settings.json` per tile server e parametri di performance
- **Distanze geografiche accurate** — calcolo great-circle
- **Caching in IndexedDB** — riduce le chiamate all'API

## Stack Tecnologico

| Componente | Tecnologia |
|------------|------------|
| Frontend | JavaScript, HTML, CSS |
| Mappa | Leaflet |
| Calcolo pesante | Web Workers |
| Export GIF | WebAssembly |
| Build tool | Vite |
| Sorgente dati | OpenStreetMap via Overpass API |

## Prestazioni

L'applicazione bilancia efficienza computazionale e interattività visiva: i calcoli pesanti sono delegati ai **Web Workers** per non bloccare l'interfaccia, mentre i risultati vengono memorizzati in **IndexedDB** per minimizzare le chiamate all'API. Questo permette di gestire dataset che vanno da poche decine fino a centinaia di città.
