import {
  pgTable,
  integer,
  varchar,
  text,
  boolean,
  timestamp,
  bigint,
  serial,
  date,
  real,
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
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
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
  day: date(),
  topic: text(),
  eventType: varchar('event_type'),
  confidence: real(),
  quote: text().default(''),
  quoteStart: real('quote_start'),
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const streams = pgTable('streams', {
  id: varchar().primaryKey().notNull(),
  startedAt: timestamp('started_at', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
  endedAt: timestamp('ended_at', { withTimezone: true, mode: 'string' }),
  title: text().default(''),
  category: text().default(''),
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const editors = pgTable('editors', {
  twitchUserId: varchar('twitch_user_id').primaryKey().notNull(),
  login: varchar().notNull(),
  displayName: varchar('display_name').default(''),
  avatar: varchar().default(''),
  addedBy: varchar('added_by').default(''),
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
