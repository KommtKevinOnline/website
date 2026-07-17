export default defineEventHandler(async () => {
  const drizzle = useDrizzle();

  try {
    const alert = await drizzle.query.alerts.findFirst({
      where: eq(tables.alerts.active, true),
    });

    return alert ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
});
