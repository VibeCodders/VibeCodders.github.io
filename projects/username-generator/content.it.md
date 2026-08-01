---
title: UsernameGenerator
slug: username-generator
order: 5
subtitle: Generatore di username casuali pronunciabili
description: UsernameGenerator è un piccolo strumento client-side che genera username casuali e pronunciabili, con lunghezza configurabile, stile e slider di leggibilità e pronunciabilità.
keywords: UsernameGenerator, generatore username, username casuali, pronunciabile, JavaScript, Vite, VibeCodders
tags: JavaScript, HTML, CSS, Vite
language: JavaScript
os: Web
repo: https://github.com/VibeCodders/UsernameGenerator
demo: https://vibecodders.github.io/UsernameGenerator/
---

**UsernameGenerator** è un piccolo strumento client-side che genera username casuali e pronunciabili. Non richiede build step né dipendenze per essere usato — è puro HTML/CSS/JS.

## Caratteristiche Principali

- **Lunghezza configurabile** — da 1 a 20 caratteri
- **Opzioni di stile** — Plain, Con numeri, Con_underscore, CamelCase, L33t speak
- **Slider Ease to Read / Ease to Say** (1-500) — orientano la generazione verso pattern di lettere più semplici e cluster consonantici foneticamente validi; valori sopra 100 restringono progressivamente il pool di lettere/cluster alle voci più comuni/semplici
- **Selettore lingua** — Inglese / Italiano, che cambia la frequenza delle lettere e i cluster consonantici validi usati dagli slider di facilità
- **Pulsante copia negli appunti**
- **Preferiti e cronologia** — salva gli username generati preferiti e tiene traccia della cronologia di generazione

## Struttura del Progetto

```
index.html              Markup della pagina
css/style.css            Stili
js/usernameGenerator.js  Algoritmo di generazione (senza framework/DOM)
js/app.js                Collegamento DOM / logica UI
```

## Stack Tecnologico

| Componente | Tecnologia |
|------------|------------|
| Frontend | JavaScript, HTML, CSS |
| Build tool | Vite |

## Utilizzo

```bash
npm install
npm run dev
```

Poi apri l'URL stampato da Vite (default `http://localhost:5173`). Puoi anche aprire direttamente `index.html` nel browser — non è richiesto alcun build step.
