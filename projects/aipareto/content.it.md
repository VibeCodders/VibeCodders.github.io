---
title: AiPareto
slug: aipareto
order: 5
subtitle: Visualizzatore della frontiera di Pareto dei modelli AI
description: AiPareto è uno strumento interattivo che analizza e confronta i modelli di intelligenza artificiale per costo e performance, tracciando la frontiera di Pareto basata sui dati di OpenRouter e Artificial Analysis.
keywords: AiPareto, frontiera di Pareto, modelli AI, costo AI, Artificial Analysis, OpenRouter, React, TypeScript, Vite, VibeCodders
tags: React, TypeScript, Vite, OpenRouter
language: TypeScript
os: Web
repo: https://github.com/VibeCodders/AiPareto
demo: https://VibeCodders.github.io/AiPareto/
---

**AiPareto** è un'applicazione web statica sviluppata in **React** e **TypeScript** con **Vite**. Mostra graficamente il tradeoff tra costo e performance dei principali modelli di intelligenza artificiale sul mercato. Il grafico posiziona sull'asse X il costo di utilizzo del modello (in USD per 1 milione di token, basato sui prezzi di OpenRouter) e sull'asse Y il punteggio di performance (Artificial Analysis Intelligence Index), tracciando ed evidenziando automaticamente la **frontiera di Pareto** (i modelli non dominati, ovvero quelli che offrono le migliori prestazioni per ogni fascia di prezzo).

## Caratteristiche Principali

- **Analisi Costo-Performance** — Scatter plot interattivo che posiziona i modelli in base a tariffe reali e punteggi di benchmark.
- **Frontiera di Pareto dinamica** — Ricalcolo in tempo reale dei modelli ottimali (punti non dominati) al variare dei filtri e delle metriche.
- **Metriche avanzate** — Supporto a diversi indici di Artificial Analysis (Intelligence Index, Coding Index, Agentic Index, Tau2, HLE, Omniscience).
- **Personalizzazione del costo** — Possibilità di calcolare il costo blended (es. 80% input, 20% output) e di configurare scenari con token in/out specifici.
- **Filtri e Ricerca** — Selezione rapida per famiglia di modelli, soglia minima di punteggio, varianti di effort e scala (logaritmica o lineare).
- **Esportazione e Condivisione** — Salvataggio e condivisione dei filtri tramite URL, gestione di preset personalizzati in localStorage, ed export in formato CSV.

## Stack Tecnologico

| Componente | Tecnologia |
|------------|------------|
| Frontend | React, TypeScript |
| Build tool | Vite |
| Fonti dati | OpenRouter API & Artificial Analysis |
| Deploy | GitHub Actions & GitHub Pages |

## Raccolta Dati

I dati sono integrati nell'applicazione tramite snapshot statici aggiornabili periodicamente tramite uno script integrato (`npm run fetch-data`). Lo script unisce le informazioni sui prezzi in tempo reale di OpenRouter con i dati qualitativi e prestazionali estratti dal registry e dalle classifiche di Artificial Analysis, garantendo un database coerente e mappato.
