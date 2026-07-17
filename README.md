# KommtKevinOnline? (Website)

Nuxt 4 frontend for [kommtkevinonline.de](https://kommtkevinonline.de) — shows whether and when Papaplatte (Kevin) will go live, based on predictions produced by the [kko-worker](../kko-worker).

## Features

- **Hero**: today's answer (Ja/Nein), planned time, countdown, and topic
- **Live status**: embeds the stream when Kevin is online
- **VOD history** with per-stream detail pages incl. transcript of the last 5 minutes
- **Statistiken** (`/stats`): prediction hit rate and punctuality (predicted vs. actual start)
- **Kalender** (`/calendar.ics`): subscribable calendar feed of predicted streams
- **Admin** (`/admin`): Twitch login; owners and added mods can edit predictions manually (manual edits are never overwritten by the worker) and manage alerts; owners manage the mod list
- **Chat command** (`/api/twitch/command`): plain-text answer for chat bots
- Dynamic OG image showing today's answer when the link is shared

## Setup

```bash
pnpm install
cp .env.example .env   # fill in values
pnpm dev
```

The database schema is owned by the worker (goose migrations) — run the worker once against the same Postgres before starting the site.

## Configuration

See `.env.example`. The `/admin` area needs `NUXT_SESSION_PASSWORD`, the Twitch OAuth app credentials, and `NUXT_ADMIN_TWITCH_IDS` (your own Twitch user id) to bootstrap the first owner.
