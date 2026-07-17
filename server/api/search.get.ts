import type { Transcript } from '~~/shared/types/Transcript';

interface SearchHit {
  vodid: string;
  title: string | null;
  date: string | null;
  thumbnail: string | null;
  text: string;
  // seconds into the full VOD (transcript offset + segment start)
  timestamp: number;
}

export default defineEventHandler(async (event) => {
  const { q } = await useValidatedQuery(event, {
    q: z.string().min(2).max(100),
  });

  const drizzle = useDrizzle();

  const vods = await drizzle.query.vods.findMany({
    where: sql`${tables.vods.transcript} ILIKE ${'%' + q + '%'}`,
    columns: {
      vodid: true,
      title: true,
      date: true,
      thumbnail: true,
      transcript: true,
      duration: true,
    },
    orderBy: [desc(tables.vods.date)],
    limit: 20,
  });

  const needle = q.toLowerCase();
  const hits: SearchHit[] = [];

  for (const vod of vods) {
    if (!vod.transcript) continue;

    let transcript: Transcript;
    try {
      transcript = JSON.parse(vod.transcript);
    } catch {
      continue;
    }

    const offset = Number(vod.duration ?? 0);

    for (const segment of transcript.segments ?? []) {
      if (!segment.text.toLowerCase().includes(needle)) continue;

      hits.push({
        vodid: vod.vodid,
        title: vod.title,
        date: vod.date,
        thumbnail: vod.thumbnail,
        text: segment.text.trim(),
        timestamp: Math.max(0, Math.floor(offset + segment.start)),
      });

      if (hits.length >= 50) break;
    }

    if (hits.length >= 50) break;
  }

  return hits;
});
