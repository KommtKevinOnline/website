import { DateTime } from 'luxon';

export interface DayComparison {
  day: string;
  predictedAt: string | null;
  topic: string | null;
  actualStart: string | null;
  delayMinutes: number | null;
}

export default defineCachedEventHandler(
  async () => {
    const drizzle = useDrizzle();

    const now = DateTime.now().setZone('Europe/Berlin');

    const streams = await drizzle.query.streams.findMany({
      orderBy: (streams, { asc }) => asc(streams.startedAt),
    });

    const livePredictions = await drizzle.query.predictions.findMany({
      where: and(
        eq(tables.predictions.eventType, 'live'),
        lt(tables.predictions.date, now.toISO()!)
      ),
      orderBy: (predictions, { asc }) => asc(predictions.date),
    });

    const streamsByDay = new Map<string, string>();
    for (const stream of streams) {
      const day = parseDbDate(stream.startedAt)
        .setZone('Europe/Berlin')
        .toISODate()!;

      // keep the earliest start per day
      if (!streamsByDay.has(day)) {
        streamsByDay.set(day, stream.startedAt);
      }
    }

    // The streams table only fills from stream.online events going forward;
    // archive VODs carry the actual broadcast start, so they backfill days
    // recorded before that (and days where an event was missed).
    const vods = await drizzle.query.vods.findMany({
      columns: { date: true },
      orderBy: (vods, { asc }) => asc(vods.date),
    });

    let vodDays = 0;
    for (const vod of vods) {
      if (!vod.date) continue;

      const day = parseDbDate(vod.date).setZone('Europe/Berlin').toISODate()!;

      if (!streamsByDay.has(day)) {
        streamsByDay.set(day, vod.date);
        vodDays++;
      }
    }

    const comparisons: DayComparison[] = livePredictions
      .filter((prediction) => prediction.date)
      .map((prediction) => {
        const predicted = parseDbDate(prediction.date!).setZone(
          'Europe/Berlin'
        );
        const day = predicted.toISODate()!;
        const actualStart = streamsByDay.get(day) ?? null;

        let delayMinutes: number | null = null;
        if (actualStart) {
          delayMinutes = Math.round(
            parseDbDate(actualStart).diff(predicted, 'minutes').minutes
          );
        }

        return {
          day,
          predictedAt: prediction.date,
          topic: prediction.topic,
          actualStart,
          delayMinutes,
        };
      });

    const matched = comparisons.filter((c) => c.delayMinutes !== null);
    const delays = matched.map((c) => c.delayMinutes!) as number[];

    const avgDelayMinutes = delays.length
      ? Math.round(delays.reduce((a, b) => a + b, 0) / delays.length)
      : null;

    const onTimeCount = delays.filter((d) => Math.abs(d) <= 15).length;

    return {
      totalStreams: streams.length + vodDays,
      totalLivePredictions: comparisons.length,
      matchedPredictions: matched.length,
      hitRate: comparisons.length
        ? Math.round((matched.length / comparisons.length) * 100)
        : null,
      avgDelayMinutes,
      onTimeRate: delays.length
        ? Math.round((onTimeCount / delays.length) * 100)
        : null,
      recent: comparisons.slice(-30).reverse(),
    };
  },
  {
    swr: true,
    maxAge: 60 * 10,
  }
);
