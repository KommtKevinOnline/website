import { kv } from '@vercel/kv';
import { sql } from "@vercel/postgres";
import { StreamsResponse } from "../../../interfaces/StreamsResponse.interface";
import { Stream } from "../../../interfaces/Stream.interface";
import { TokenResponse } from '../../../interfaces/TokenResponse.interface';

async function getToken(): Promise<string> {
  const res = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials',
    }),
  });

  const data = await res.json() as TokenResponse;

  console.log(data)

  return data.access_token;
}

export default defineEventHandler(async (event) => {
  if (!process.env.TWITCH_CLIENT_ID) {
    throw new Error('Missing TWITCH_CLIENT_ID');
  }

  const userId = event.context.params?.id;
  let stream: Stream; 

  const cachedValue = await kv.hget<Stream>(`stream:${userId}`, "stream");

  if (cachedValue) {
    stream = cachedValue
  } else {
    const res = await fetch(`https://api.twitch.tv/helix/streams?user_id=${userId}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        'client-id': process.env.TWITCH_CLIENT_ID,
      },
    });

    const data = await res.json() as StreamsResponse;

    console.log(data)

    await kv.hset(`stream:${userId}`, {
      stream: JSON.stringify(data.data[0]),
    });

    await kv.expire(`stream:${userId}`, 60 * 5);

    stream = data.data[0]
  }

  if (stream.type !== 'live') {
    const { rows: upcomingStreams } = await sql`SELECT * FROM upcoming_streams WHERE date > NOW()`;

    return {
      type: 'offline',
      upcoming: upcomingStreams,
    }
  }

  return stream;
})