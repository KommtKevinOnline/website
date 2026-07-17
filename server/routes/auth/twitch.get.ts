export default defineOAuthTwitchEventHandler({
  async onSuccess(event, { user }) {
    const sessionUser = {
      id: user.id,
      login: user.login,
      displayName: user.display_name,
      avatar: user.profile_image_url,
    };

    // No mod role, no session: don't leave non-mods logged in at all
    const editor = await resolveEditor(sessionUser);

    if (!editor) {
      console.info('[admin] login denied for %s (%s)', user.login, user.id);
      return sendRedirect(event, '/?login=denied');
    }

    await setUserSession(event, { user: sessionUser });

    return sendRedirect(event, '/admin');
  },
  onError(event, error) {
    console.error('Twitch OAuth error', error);
    return sendRedirect(event, '/?login=error');
  },
});
