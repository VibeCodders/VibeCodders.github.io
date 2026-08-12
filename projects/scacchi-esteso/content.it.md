---
title: Scacchi Esteso
slug: scacchi-esteso
order: 6
subtitle: App web per comporre e giocare una variante estesa degli scacchi
description: Scacchi Esteso è una variante estesa degli scacchi con un roster di 44 pezzi custom, sistema di composizione dell'esercito a budget punti e abilità speciali. L'app web permette di comporre il team, schierarlo e giocare la partita.
keywords: Scacchi Esteso, scacchi variante, chess variant, army building, React, TypeScript, Vite, TailwindCSS, VibeCodders
tags: React, TypeScript, Vite, TailwindCSS, Scacchi/Chess Variant
language: TypeScript
os: Web
repo: https://github.com/VibeCodders/ScacchiEsteso
demo: https://vibecodders.github.io/ScacchiEsteso/
---

**Scacchi Esteso** è una variante estesa degli scacchi con un roster di **44 pezzi custom**, un sistema di composizione dell'esercito a budget punti e numerose abilità speciali. L'app web (`team-composer/`) copre l'intero flusso: composizione del team, schieramento e partita.

## Concetto di gioco

- **Budget punti:** 247 punti a disposizione per comporre il proprio esercito, senza obbligo di spenderli tutti.
- **Limiti di composizione:** massimo 5 copie per tipo di pezzo (con un limite dinamico aggiuntivo per i pezzi più costosi), massimo 8 Pedoni, 1 Re obbligatorio, massimo 16 pezzi totali.
- **Schieramento a vista:** i giocatori posizionano i pezzi a turno nelle proprie prime due traverse, senza segretezza.
- **Regola dell'azione unica:** ogni turno si compie una sola azione — muovere un pezzo o attivare un'abilità speciale.

## Pezzi e abilità speciali

Oltre ai pezzi classici (Re, Alfiere, Cavallo, Torre, Regina, Pedone), il roster introduce pezzi con meccaniche originali, ad esempio:

- **Berserker** — dopo una cattura in mischia ottiene un secondo movimento extra gratuito.
- **Miraggio** — può sdoppiarsi in un clone illusorio indistinguibile dall'originale e poi riunirsi.
- **Grifone / Manticora / Drago** — movimenti compositi "a ginocchio" o ibridi Torre+Cavallo.
- **Paladino** — protegge gli alleati adiacenti dagli attacchi a distanza con la sua Egida.
- **Inquisitore** — silenzia le abilità a distanza dei nemici nelle caselle adiacenti.

Il regolamento completo, con la tabella di tutti i 44 pezzi (costo, copie massime, movimento e abilità), è disponibile nel [README del repository](https://github.com/VibeCodders/ScacchiEsteso).

## Tech Stack

| Componente | Tecnologia |
|------------|------------|
| Frontend | React 19, TypeScript |
| Styling | TailwindCSS |
| Build tool | Vite |
| Routing | React Router |
| Test | Vitest, Playwright, Testing Library |
