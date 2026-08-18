---
title: Telegram Calendar Planner
slug: telegram-calendar-planner
order: 6
subtitle: Bot Telegram intelligente per pianificazione, promemoria e task
description: Telegram Calendar Planner è un bot Node.js con parser del linguaggio naturale per interpretare date/orari dai messaggi di chat e inviare promemoria automatici e recap giornalieri.
keywords: Telegram Calendar Planner, Telegram Bot, Node.js, cron, scheduler, promemoria, reminder, linguaggio naturale, JavaScript, VibeCodders
tags: JavaScript, Node.js, Telegram Bot, Cron
language: JavaScript
os: Linux, macOS, Windows
repo: https://github.com/VibeCodders/telegram_calendar_planner
---

**Telegram Calendar Planner** è un servizio backend e bot **Telegram** sviluppato in **Node.js**. Permette di trasformare una chat Telegram in un'agenda intelligente: interpreta date, orari relativi e tag inseriti in linguaggio naturale nei normali messaggi, programmando automaticamente promemoria puntuali e riepiloghi mattutini dei task.

## Caratteristiche Principali

- **Parser del Linguaggio Naturale**:
  - Comprensione di date relative: `oggi`, `domani`, `stasera`, `tra 2 ore`, `tra 45 minuti`, `tra 3 giorni`.
  - Comprensione di date assolute e orari: `alle 18`, `alle 18:30`, `13/01/2027`, `12/06 alle 8`.
  - Valori di default intelligenti (`oggi` senza orario imposta un reminder a 1 ora; `domani` alle ore 09:00).
- **Organizzazione con Tag**:
  - Categorizzazione immediata dei task con hashtag (es. `#work`, `#health`, `#bills`, `#ideas`).
- **Check Giornaliero Automatico**:
  - Invio di un messaggio mattutino con il riepilogo di tutti i task e dei promemoria previsti per la giornata.
- **Database Leggero & Zero-Config**:
  - Gestione dello stato e dei promemoria con storage JSON locale/integrato.
- **Deploy Facile**:
  - Predisposto per l'hosting cloud su piattaforme come Railway o Render con supporto ai Webhook Telegram.

## Esempi di Utilizzo

Scrivi direttamente nella chat con il bot:

```text
domani alle 10 chiama il medico #health
tra 2 ore spegni il forno
13/01/2027 rinnova contratto #work
alle 18 palestra
oggi alle 21 film #ideas
```

## Stack Tecnologico

| Componente | Tecnologia |
|------------|------------|
| Linguaggio | JavaScript (Node.js) |
| API Telegram | Telegraf / Node Telegram Bot API |
| Schedulazione | Node-Cron / Timer Engine |
| Archiviazione | JSON file store |

## Installazione e Avvio

```bash
# Clona il repository
git clone https://github.com/VibeCodders/telegram_calendar_planner.git
cd telegram_calendar_planner

# Installa le dipendenze
npm install

# Configura le variabili d'ambiente (.env)
cp .env.example .env
# Inserisci il tuo BOT_TOKEN generato con @BotFather

# Avvia il bot
npm start
```
