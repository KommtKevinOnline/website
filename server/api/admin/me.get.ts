export default defineEventHandler(async (event) => {
  const editor = await getEditor(event);

  if (!editor) {
    // A logged-in session without mod rights is useless on this site and
    // would otherwise trap the user in the /admin redirect; drop it so the
    // login card shows again on the next visit.
    await clearUserSession(event);
    return null;
  }

  return editor;
});
