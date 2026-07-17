export default defineOAuthTwitchEventHandler({
  async onSuccess(event, { user }) {
    await setUserSession(event, {
      user: {
        id: user.id,
        login: user.login,
        displayName: user.display_name,
        avatar: user.profile_image_url,
      },
    });

    return sendRedirect(event, '/admin');
  },
  onError(event, error) {
    console.error('Twitch OAuth error', error);
    return sendRedirect(event, '/');
  },
});
