import { DateTime } from 'luxon';

export async function getPredictionOverview() {
  const drizzle = useDrizzle();

  // Day boundaries in the audience's timezone, not the server's
  const now = DateTime.now().setZone('Europe/Berlin');
  const startOfDay = now.startOf('day');
  const startOfNextDay = startOfDay.plus({ days: 1 });

  const todayPrediction = await drizzle.query.predictions.findFirst({
    where: and(
      gte(tables.predictions.date, startOfDay.toISO()!),
      lt(tables.predictions.date, startOfNextDay.toISO()!)
    ),
    orderBy: (predictions, { asc }) => asc(predictions.date),
  });

  const nextLivePrediction = await drizzle.query.predictions.findFirst({
    where: and(
      eq(tables.predictions.eventType, 'live'),
      gt(tables.predictions.date, now.toISO()!)
    ),
    orderBy: (predictions, { asc }) => asc(predictions.date),
  });

  // Actual stream starts recorded by the worker beat any prediction-based
  // guess: a late Kevin must not flip the site to "war schon Stream".
  const todayStream = await drizzle.query.streams.findFirst({
    where: gte(tables.streams.startedAt, startOfDay.toISO()!),
    orderBy: (streams, { desc }) => desc(streams.startedAt),
  });

  const hasStreamedToday = Boolean(todayStream && todayStream.endedAt);

  return {
    now,
    todayPrediction,
    nextLivePrediction,
    hasStreamedToday,
    todayStream: todayStream ?? null,
  };
}
