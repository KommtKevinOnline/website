export default defineEventHandler(async (event) => {
  await requireEditor(event);

  const drizzle = useDrizzle();

  return await drizzle.query.editors.findMany({
    orderBy: (editors, { asc }) => asc(editors.createdAt),
  });
});
