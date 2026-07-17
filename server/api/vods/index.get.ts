export default defineEventHandler(async (event) => {
  const { limit } = await useValidatedQuery(event, {
    limit: z.coerce.number().int().min(1).max(20).default(3),
  });

  const drizzle = useDrizzle();

  const vods = await drizzle.query.vods.findMany({
    columns: {
      vodid: true,
      title: true,
      thumbnail: true,
      viewCount: true,
      date: true,
    },
    orderBy: [desc(tables.vods.date)],
    limit,
  });

  return vods;
});
