export default defineEventHandler(async () => {
  const drizzle = useDrizzle();

  const vod = await drizzle.query.vods.findFirst({
    columns: {
      vodid: true,
      title: true,
      thumbnail: true,
      viewCount: true,
      date: true,
      duration: true,
    },
    orderBy: [desc(tables.vods.date)],
  });

  return vod;
});
