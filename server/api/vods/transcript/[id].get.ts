export default defineCachedEventHandler(
  async (event) => {
    const id = getRouterParam(event, 'id');

    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid Id',
      });
    }

    const drizzle = await useDrizzle();

    const vod = await drizzle.query.vods.findFirst({
      where: eq(tables.vods.vodid, id),
      columns: {
        transcript: true,
      },
    });

    if (!vod) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Vod not found',
      });
    }

    setResponseHeader(event, 'Content-Type', 'application/json');

    return vod.transcript;
  },
  {
    swr: true,
    maxAge: 60 * 5,
  },
);
