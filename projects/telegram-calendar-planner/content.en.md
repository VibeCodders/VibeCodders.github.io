---
title: Telegram Calendar Planner
slug: telegram-calendar-planner
order: 6
subtitle: Smart Telegram bot for planning, reminders, and daily task recaps
description: Telegram Calendar Planner is a Node.js Telegram bot featuring a natural language date/time parser to schedule reminders, organize tasks with hashtags, and deliver morning daily briefings.
keywords: Telegram Calendar Planner, Telegram Bot, Node.js, cron, scheduler, reminder, natural language, JavaScript, VibeCodders
tags: JavaScript, Node.js, Telegram Bot, Cron
language: JavaScript
os: Linux, macOS, Windows
repo: https://github.com/VibeCodders/telegram_calendar_planner
---

**Telegram Calendar Planner** is a backend service and **Telegram Bot** built with **Node.js**. It turns your Telegram conversations into an intelligent scheduling assistant by parsing natural language dates, relative time expressions, and hashtags from standard chat messages to automate punctual notifications and morning task briefings.

## Key Features

- **Natural Language Parsing**:
  - Relative dates: `today`, `tomorrow`, `tonight`, `in 2 hours`, `in 45 minutes`, `in 3 days`.
  - Absolute dates & times: `at 18`, `at 18:30`, `13/01/2027`, `12/06 at 8`.
  - Smart fallback defaults (`today` with no time triggers a reminder in 1 hour; `tomorrow` defaults to 09:00 AM).
- **Tag-based Organization**:
  - Instant classification of items using custom hashtags (e.g. `#work`, `#health`, `#bills`, `#ideas`).
- **Automated Morning Briefing**:
  - Daily summary delivered every morning outlining your schedule, tasks, and upcoming deadlines.
- **Lightweight & Zero-Config Storage**:
  - Persistence handled through a structured JSON file database.
- **Ready for Cloud Deployment**:
  - Easily deployable to platforms like Railway or Render with webhook support.

## Usage Examples

Send natural language messages straight to your bot:

```text
domani alle 10 chiama il medico #health
tra 2 ore spegni il forno
13/01/2027 rinnova contratto #work
alle 18 palestra
oggi alle 21 film #ideas
```

## Tech Stack

| Component | Technology |
|-----------|------------|
| Language | JavaScript (Node.js) |
| Telegram API | Telegraf / Node Telegram Bot API |
| Scheduler | Node-Cron / Timer Engine |
| Data Storage | JSON file store |

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/VibeCodders/telegram_calendar_planner.git
cd telegram_calendar_planner

# Install dependencies
npm install

# Configure environment variables (.env)
cp .env.example .env
# Set your BOT_TOKEN from @BotFather

# Start the bot
npm start
```
