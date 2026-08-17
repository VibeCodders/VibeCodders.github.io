---
title: AiPareto
slug: aipareto
order: 5
subtitle: AI models Pareto frontier viewer
description: AiPareto is an interactive tool that analyzes and compares AI models by cost and performance, mapping the Pareto frontier based on OpenRouter and Artificial Analysis data.
keywords: AiPareto, Pareto frontier, AI models, AI cost, Artificial Analysis, OpenRouter, React, TypeScript, Vite, VibeCodders
tags: React, TypeScript, Vite, OpenRouter
language: TypeScript
os: Web
repo: https://github.com/VibeCodders/AiPareto
demo: https://VibeCodders.github.io/AiPareto/
---

**AiPareto** is a static web application built with **React**, **TypeScript**, and **Vite**. It provides an interactive visualization of the cost vs. performance tradeoff for the main AI models currently available. The application maps usage costs on the X-axis (in USD per 1 million tokens, sourced from OpenRouter pricing) against performance scores on the Y-axis (Artificial Analysis Intelligence Index), automatically computing and highlighting the **Pareto frontier** (the non-dominated models that offer the best efficiency at any given price point).

## Key Features

- **Cost-Performance Analysis** — Interactive scatter plot positioning AI models based on real-time pricing and benchmark scores.
- **Dynamic Pareto Frontier** — Real-time calculation of optimal models (non-dominated points) as filters and metrics are updated.
- **Advanced Metrics** — Support for multiple Artificial Analysis indices (Intelligence Index, Coding Index, Agentic Index, Tau2, HLE, Omniscience).
- **Custom Cost Calculation** — Custom blended costs (e.g., 80% input, 20% output) and configurable task-specific token counts.
- **Search & Filtering** — Quick selection by model family, minimum score thresholds, effort variants, and linear/logarithmic axis scales.
- **Export & Share** — Save and share filter combinations via URL, store custom presets in localStorage, and export raw data to CSV.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React, TypeScript |
| Build tool | Vite |
| Data sources | OpenRouter API & Artificial Analysis |
| Deployment | GitHub Actions & GitHub Pages |

## Data Collection

Model statistics are embedded in the app as static snapshots, which can be easily updated using a built-in script (`npm run fetch-data`). This utility merges real-time API pricing from OpenRouter with comprehensive benchmarks scraped from Artificial Analysis leaderboards and model registries using a curated mapping table.
