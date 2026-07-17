export default defineEventHandler(async (event) => {
  const owner = await requireOwner(event);

  const body = await useValidatedBody(event, {
    name: z.string().min(1).max(50),
  });

  const twitchUser = await getTwitchUserByLogin(body.name);

  if (!twitchUser) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Twitch user not found',
    });
  }

  const drizzle = useDrizzle();

  const [editor] = await drizzle
    .insert(tables.editors)
    .values({
      twitchUserId: twitchUser.id,
      login: twitchUser.login,
      displayName: twitchUser.display_name,
      avatar: twitchUser.profile_image_url,
      addedBy: owner.login,
    })
    .onConflictDoUpdate({
      target: tables.editors.twitchUserId,
      set: {
        login: twitchUser.login,
        displayName: twitchUser.display_name,
        avatar: twitchUser.profile_image_url,
      },
    })
    .returning();

  return editor;
});
