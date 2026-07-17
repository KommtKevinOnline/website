export default defineEventHandler(async (event) => {
  return await getEditor(event);
});
