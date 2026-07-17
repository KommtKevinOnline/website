export default defineEventHandler(async () => {
  const drizzle = useDrizzle();

  // Twitch removes VODs after ~60 days; don't hand the player a dead one
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 60);

  const vod = await drizzle.query.vods.findFirst({
    where: gte(tables.vods.date, cutoff.toISOString()),
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
