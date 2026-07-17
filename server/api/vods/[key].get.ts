export default defineEventHandler(async (event) => {
  const { key } = await useValidatedParams(event, {
    key: z.string(),
  });

  const drizzle = useDrizzle();

  const vod = await drizzle.query.vods.findFirst({
    where: eq(tables.vods.vodid, key),
    columns: {
      vodid: true,
      title: true,
      thumbnail: true,
      viewCount: true,
      date: true,
      duration: true,
      url: true,
    },
  });

  if (!vod) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Vod not found',
    });
  }

  return vod;
});
