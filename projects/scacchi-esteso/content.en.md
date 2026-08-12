---
title: Scacchi Esteso
slug: scacchi-esteso
order: 6
subtitle: Web app to compose and play an extended chess variant
description: Scacchi Esteso is an extended chess variant with a roster of 44 custom pieces, a points-budget army composition system and special abilities. The web app covers team composition, deployment and gameplay.
keywords: Scacchi Esteso, chess variant, army building, React, TypeScript, Vite, TailwindCSS, VibeCodders
tags: React, TypeScript, Vite, TailwindCSS, Scacchi/Chess Variant
language: TypeScript
os: Web
repo: https://github.com/VibeCodders/ScacchiEsteso
demo: https://vibecodders.github.io/ScacchiEsteso/
---

**Scacchi Esteso** ("Extended Chess") is an extended chess variant with a roster of **44 custom pieces**, a points-budget army composition system and numerous special abilities. The web app (`team-composer/`) covers the whole flow: team composition, deployment and gameplay.

## Game concept

- **Points budget:** 247 points available to build your army, with no obligation to spend it all.
- **Composition limits:** up to 5 copies per piece type (with an additional dynamic limit for the most expensive pieces), up to 8 Pawns, exactly 1 mandatory King, and 16 pieces total at most.
- **Open deployment:** players take turns placing pieces on their own first two ranks, with no secrecy.
- **Single-action rule:** each turn allows only one action — moving a piece or activating a special ability.

## Pieces and special abilities

Beyond the classic pieces (King, Bishop, Knight, Rook, Queen, Pawn), the roster introduces pieces with original mechanics, for example:

- **Berserker** — gains a free extra move immediately after a successful melee capture.
- **Mirage** — can split into an illusory clone indistinguishable from the original, then merge back.
- **Griffin / Manticore / Dragon** — composite "knight-bend" or Rook+Knight hybrid movements.
- **Paladin** — shields adjacent allies from ranged attacks with its Aegis.
- **Inquisitor** — silences the ranged abilities of enemies in adjacent squares.

The full rulebook, including the table of all 44 pieces (cost, maximum copies, movement and abilities), is available in the [repository README](https://github.com/VibeCodders/ScacchiEsteso).

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 19, TypeScript |
| Styling | TailwindCSS |
| Build tool | Vite |
| Routing | React Router |
| Testing | Vitest, Playwright, Testing Library |
