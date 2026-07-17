interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
}

export const getTwitchAppToken = defineCachedFunction(
  async () => {
    const data = await $fetch<TokenResponse>(
      'https://id.twitch.tv/oauth2/token',
      {
        method: 'POST',
        body: {
          client_id: process.env.TWITCH_CLIENT_ID,
          client_secret: process.env.TWITCH_CLIENT_SECRET,
          grant_type: 'client_credentials',
        },
      }
    );

    return data.access_token;
  },
  {
    // Twitch app tokens live ~60 days; refresh well before that
    maxAge: 60 * 60 * 24,
    name: 'twitchAppToken',
    getKey: () => 'app',
  }
);

export async function getTwitchUserByLogin(
  login: string
): Promise<TwitchUser | null> {
  const res = await $fetch<{ data: TwitchUser[] }>(
    'https://api.twitch.tv/helix/users',
    {
      query: { login },
      headers: {
        Authorization: `Bearer ${await getTwitchAppToken()}`,
        'client-id': process.env.TWITCH_CLIENT_ID!,
      },
    }
  );

  return res.data[0] ?? null;
}
