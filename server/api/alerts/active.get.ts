export default defineEventHandler(async (event) => {
  const drizzle = useDrizzle();

  try {
    const alert = await drizzle.query.alerts.findFirst({
      where: eq(tables.alerts.active, true),
    });

    if (!alert) {
      return { active: false };
    }

    return alert;
  } catch (error) {
    console.error(error);
  }

  return { active: false };
});
