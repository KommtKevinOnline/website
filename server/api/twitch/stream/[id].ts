import { StreamsResponse } from "../../../interfaces/StreamsResponse.interface";
import { Stream } from "../../../interfaces/Stream.interface";
import { TokenResponse } from "../../../interfaces/TokenResponse.interface";
import { db } from "../../../db";
import { vodsTable } from "../../../../db/schema";
import { desc } from "drizzle-orm";

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
  let stream: Stream;

  const res = await fetch(
    `https://api.twitch.tv/helix/streams?user_id=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "client-id": process.env.TWITCH_CLIENT_ID,
      },
    }
  );

  const data = (await res.json()) as StreamsResponse;

  // If online: return twitch data
  if (data.data.length !== 0) {
    return data.data[0];
  } else {
    //TODO: Upcoming should be replaced with vods.
    // If offline: look in db for recent vods

    // const upcoming = await db.select().from(vodsTable).orderBy(desc(vodsTable.date)).limit(1)

    return {
      type: "offline",
      upcoming: [],
    };
  }
});
