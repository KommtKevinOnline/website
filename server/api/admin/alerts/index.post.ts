export default defineEventHandler(async (event) => {
  await requireEditor(event);

  const body = await useValidatedBody(event, {
    title: z.string().max(200).optional().default(''),
    text: z.string().min(1).max(1000),
    active: z.boolean().optional().default(false),
  });

  const drizzle = useDrizzle();

  const [alert] = await drizzle
    .insert(tables.alerts)
    .values(body)
    .returning();

  return alert;
});
