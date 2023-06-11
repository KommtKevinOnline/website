import { kv } from '@vercel/kv';
import { StreamsResponse } from "../../../interfaces/StreamsResponse.interface";
import { Stream } from "../../../interfaces/Stream.interface";

const config = useRuntimeConfig()

async function getToken(): Promise<string> {
  const res = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    body: JSON.stringify({
      client_id: config.twitch.client_id,
      client_secret: config.twitch.secret,
      grant_type: 'client_credentials',
    }),
  });

  const data = await res.json();

  return data.data.access_token;
}

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id;
  let stream: Stream; 

  const cachedValue = await kv.hget<Stream>(`stream:${userId}`, "stream");

  if (cachedValue) {
    stream = cachedValue
  } else {
    const res = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        'client-id': config.twitch.client_id,
      },
    });

    const data = await res.json() as StreamsResponse;

    await kv.hset(`stream:${userId}`, {
      stream: JSON.stringify(data.data[0]),
    });

    await kv.expire(`stream:${userId}`, 60 * 5);

    stream = data.data[0]
  }

  return stream || { type: 'offline' };
})