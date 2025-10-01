export default defineEventHandler(async (event) => {
  const drizzle = useDrizzle();

  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const startOfNextDay = new Date(startOfDay);
  startOfNextDay.setDate(startOfNextDay.getDate() + 1);

  const prediction = await drizzle.query.predictions.findFirst({
    where: and(
      gte(tables.predictions.date, startOfDay.toISOString()),
      lt(tables.predictions.date, startOfNextDay.toISOString()),
    ),
  });

  return prediction;
});
