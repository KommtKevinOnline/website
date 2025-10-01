import {
  pgTable,
  integer,
  varchar,
  text,
  boolean,
  timestamp,
  bigint,
  serial,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const alerts = pgTable('alerts', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar(),
  text: text(),
  active: boolean().default(false),
  createdAt: timestamp('created_at', { mode: 'string' }).defaultNow().notNull(),
});

export const vods = pgTable('vods', {
  transcript: text(),
  vodid: varchar().primaryKey().notNull(),
  title: text().default(''),
  date: timestamp({ withTimezone: true, mode: 'string' }).defaultNow(),
  url: text().default(''),
  thumbnail: text().default(''),
  viewCount: bigint('view_count', { mode: 'number' }).default(0),
  onlineIntendDate: varchar('online_intend_date'),
  duration: text(),
});

export const predictions = pgTable('predictions', {
  id: serial().primaryKey().notNull(),
  clipId: varchar('clip_id'),
  type: varchar(),
  source: varchar(),
  date: timestamp({ withTimezone: true, mode: 'string' }),
  topic: text(),
  eventType: varchar('event_type'),
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const twitchTokens = pgTable('twitch_tokens', {
  id: serial().primaryKey().notNull(),
  accessToken: text('access_token').notNull(),
  refreshToken: text('refresh_token').notNull(),
  expiresIn: integer('expires_in').notNull(),
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
