export default defineEventHandler(async (event) => {
  const { key } = await useValidatedParams(event, {
    key: z.string(),
  });

  const drizzle = useDrizzle();

  const vod = await drizzle.query.vods.findFirst({
    where: eq(tables.vods.vodid, key),
  });

  return vod;
});
