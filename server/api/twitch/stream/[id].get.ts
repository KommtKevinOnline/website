export default defineCachedEventHandler(
  async (event) => {
    if (!process.env.TWITCH_CLIENT_ID) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Missing TWITCH_CLIENT_ID',
      });
    }

    const { id } = await useValidatedParams(event, {
      id: z.string().regex(/^\d+$/),
    });

    try {
      const streamRes = await $fetch<StreamsResponse>(
        `https://api.twitch.tv/helix/streams?user_id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${await getTwitchAppToken()}`,
            'client-id': process.env.TWITCH_CLIENT_ID,
          },
        }
      );

      if (streamRes?.data?.length) {
        return streamRes.data[0];
      }
    } catch (error) {
      console.error('Twitch stream lookup failed', error);
    }

    return {
      type: 'offline',
    };
  },
  {
    swr: true,
    maxAge: 60,
  }
);
