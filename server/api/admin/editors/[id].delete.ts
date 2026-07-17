export default defineEventHandler(async (event) => {
  await requireOwner(event);

  const { id } = await useValidatedParams(event, {
    id: z.string(),
  });

  const drizzle = useDrizzle();

  await drizzle
    .delete(tables.editors)
    .where(eq(tables.editors.twitchUserId, id));

  return { deleted: true };
});
