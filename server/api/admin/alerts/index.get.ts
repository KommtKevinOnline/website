export default defineEventHandler(async (event) => {
  await requireEditor(event);

  const drizzle = useDrizzle();

  return await drizzle.query.alerts.findMany({
    orderBy: (alerts, { desc }) => desc(alerts.createdAt),
  });
});
