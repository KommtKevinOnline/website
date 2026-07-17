export default defineEventHandler(async (event) => {
  const drizzle = useDrizzle();

  const now = new Date();
  const nowIso = now.toISOString();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const startOfNextDay = new Date(startOfDay);
  startOfNextDay.setDate(startOfNextDay.getDate() + 1);

  const todayPrediction = await drizzle.query.predictions.findFirst({
    where: and(
      gte(tables.predictions.date, startOfDay.toISOString()),
      lt(tables.predictions.date, startOfNextDay.toISOString())
    ),
    orderBy: (predictions, { asc }) => asc(predictions.date),
  });

  const nextLivePrediction = await drizzle.query.predictions.findFirst({
    where: and(
      eq(tables.predictions.eventType, 'live'),
      gt(tables.predictions.date, nowIso)
    ),
    orderBy: (predictions, { asc }) => asc(predictions.date),
  });

  const hasStreamedToday = Boolean(
    todayPrediction?.eventType === 'live'
    && todayPrediction.date
    && new Date(todayPrediction.date) <= now
  );

  return {
    prediction: todayPrediction,
    nextLivePrediction,
    hasStreamedToday,
  };
});
