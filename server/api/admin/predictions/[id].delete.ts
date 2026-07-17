export default defineEventHandler(async (event) => {
  await requireEditor(event);

  const { id } = await useValidatedParams(event, {
    id: z.coerce.number().int(),
  });

  const drizzle = useDrizzle();

  await drizzle.delete(tables.predictions).where(eq(tables.predictions.id, id));

  return { deleted: true };
});
