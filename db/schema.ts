import { boolean, integer, pgTable, serial, text, timestamp, varchar, json } from 'drizzle-orm/pg-core';

export const vods = pgTable('vods', {
  transcript: json('transcript').notNull(),
  vodid: varchar('vodid', { length: 256 }).default('').primaryKey(),
  title: text('title').default(''),
  date: timestamp('date'),
  url: varchar('url', { length: 256 }).default(''),
  thumbnail: varchar('thumbnail', { length: 256 }).default(''),
  viewCount: integer('view_count').default(0),
  onlineIntendDate: varchar('online_intend_date', { length: 256 }).default(''),
  duration: integer('duration'),
});

export const alerts = pgTable('alerts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).default(''),
  text: text('text').default(''),
  active: boolean('active').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});