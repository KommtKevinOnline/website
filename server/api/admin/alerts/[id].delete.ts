export default defineEventHandler(async (event) => {
  await requireEditor(event);

  const { id } = await useValidatedParams(event, {
    id: z.coerce.number().int(),
  });

  const drizzle = useDrizzle();

  await drizzle.delete(tables.alerts).where(eq(tables.alerts.id, id));

  return { deleted: true };
});
