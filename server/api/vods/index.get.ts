export default defineEventHandler(async (event) => {
  const { limit } = getQuery(event);

  const drizzle = useDrizzle();

  const today = new Date().toISOString().split('T')[0];

  const vods = await drizzle.query.vods.findMany({
    where: lt(tables.predictions.date, today),
    columns: {
      vodid: true,
      title: true,
      thumbnail: true,
      viewCount: true,
      date: true,
    },
    orderBy: [desc(tables.predictions.date)],
    limit: 3,
  });

  return vods;
});
