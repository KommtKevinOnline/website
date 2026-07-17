export default defineEventHandler(async (event) => {
  await requireEditor(event);

  const { id } = await useValidatedParams(event, {
    id: z.coerce.number().int(),
  });

  const body = await useValidatedBody(event, {
    title: z.string().max(200).optional(),
    text: z.string().min(1).max(1000).optional(),
    active: z.boolean().optional(),
  });

  const drizzle = useDrizzle();

  const [alert] = await drizzle
    .update(tables.alerts)
    .set(body)
    .where(eq(tables.alerts.id, id))
    .returning();

  if (!alert) {
    throw createError({ statusCode: 404, statusMessage: 'Alert not found' });
  }

  return alert;
});
