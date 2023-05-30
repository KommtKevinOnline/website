import { boolean, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const vodsTable = pgTable('vods', {
  transcript: text('transcript').notNull(),
  vodid: varchar('vodid', { length: 256 }).default('').primaryKey(),
  title: text('title').default(''),
  date: timestamp('date'),
  url: varchar('url', { length: 256 }).default(''),
  thumbnail: varchar('thumbnail', { length: 256 }).default(''),
  viewCount: integer('view_count').default(0),
  onlineIntendDate: timestamp('online_intend_date'),
  onlineIntend: boolean('online_intend').default(false),
});

export const alertsTable = pgTable('alerts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).default(''),
  text: text('text').default(''),
  active: boolean('active').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});