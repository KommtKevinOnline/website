import { DateTime } from 'luxon';

export default defineEventHandler(async (event) => {
  const editor = await requireEditor(event);

  const body = await useValidatedBody(event, {
    day: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    time: z.string().regex(/^\d{2}:\d{2}$/),
    eventType: z.enum(['live', 'offday']),
    topic: z.string().max(500).optional().default(''),
  });

  const date = DateTime.fromISO(`${body.day}T${body.time}`, {
    zone: 'Europe/Berlin',
  });

  if (!date.isValid) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid date' });
  }

  const drizzle = useDrizzle();

  const [prediction] = await drizzle
    .insert(tables.predictions)
    .values({
      clipId: `manual:${editor.login}`,
      source: 'manual',
      date: date.toISO()!,
      day: body.day,
      topic: body.topic,
      eventType: body.eventType,
      confidence: 1,
      quote: '',
      quoteStart: null,
    })
    .onConflictDoUpdate({
      target: tables.predictions.day,
      set: {
        clipId: `manual:${editor.login}`,
        source: 'manual',
        date: date.toISO()!,
        topic: body.topic,
        eventType: body.eventType,
        confidence: 1,
        quote: '',
        quoteStart: null,
        createdAt: sql`CURRENT_TIMESTAMP`,
      },
    })
    .returning();

  return prediction;
});
