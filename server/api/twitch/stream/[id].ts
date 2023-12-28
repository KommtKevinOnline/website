import { db } from "../../../db";
import { vods } from "../../../../db/schema";
import { desc } from "drizzle-orm";
import type { TokenResponse } from "../../../../interfaces/TokenResponse.interface";
import type { StreamsResponse } from "../../../../interfaces/StreamsResponse.interface";

async function getToken(): Promise<string> {
  const res = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: "client_credentials",
    }),
  });

  const data = (await res.json()) as TokenResponse;

  return data.access_token;
}

export default defineEventHandler(async (event) => {
  if (!process.env.TWITCH_CLIENT_ID) {
    throw new Error("Missing TWITCH_CLIENT_ID");
  }

  const userId = event.context.params?.id;

  const res = await fetch(
    `https://api.twitch.tv/helix/streams?user_id=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "client-id": process.env.TWITCH_CLIENT_ID,
      },
    }
  );

  const streamRes = (await res.json()) as StreamsResponse | null;

  // If online: return twitch data
  if (streamRes && streamRes.data && streamRes.data.length !== 0) {
    return streamRes.data[0];
  } else {
    // If offline: look in db for most recent vod
    const lastVod = await db.query.vods.findFirst({
      orderBy: [desc(vods.date)],
    });

    return {
      type: "offline",
      lastVod,
    };
  }
});
