import { DateTime } from 'luxon';

export default defineEventHandler(async (event) => {
  await requireEditor(event);

  const drizzle = useDrizzle();

  // Recent past for context, plus everything upcoming
  const from = DateTime.now()
    .setZone('Europe/Berlin')
    .startOf('day')
    .minus({ days: 7 });

  return await drizzle.query.predictions.findMany({
    where: gte(tables.predictions.date, from.toISO()!),
    orderBy: (predictions, { asc }) => asc(predictions.date),
  });
});
