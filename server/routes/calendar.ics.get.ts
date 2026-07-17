import { DateTime } from 'luxon';

function icsEscape(value: string) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

function icsDate(value: string) {
  return parseDbDate(value).toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'");
}

export default defineCachedEventHandler(
  async (event) => {
    const drizzle = useDrizzle();

    const from = DateTime.now()
      .setZone('Europe/Berlin')
      .startOf('day')
      .minus({ days: 7 });

    const predictions = await drizzle.query.predictions.findMany({
      where: and(
        eq(tables.predictions.eventType, 'live'),
        gte(tables.predictions.date, from.toISO()!)
      ),
      orderBy: (predictions, { asc }) => asc(predictions.date),
    });

    const events = predictions
      .filter((prediction) => prediction.date)
      .map((prediction) => {
        const start = icsDate(prediction.date!);
        // Predicted streams have no known end; block out four hours
        const end = parseDbDate(prediction.date!)
          .plus({ hours: 4 })
          .toUTC()
          .toFormat("yyyyMMdd'T'HHmmss'Z'");
        const summary = prediction.topic
          ? `Kevin Stream: ${prediction.topic}`
          : 'Kevin Stream';

        return [
          'BEGIN:VEVENT',
          `UID:kko-prediction-${prediction.id}@kommtkevinonline.de`,
          `DTSTAMP:${icsDate(prediction.createdAt)}`,
          `DTSTART:${start}`,
          `DTEND:${end}`,
          `SUMMARY:${icsEscape(summary)}`,
          'DESCRIPTION:Vorhergesagter Stream von Papaplatte (KI-basiert\\, ohne Gewähr) — https://kommtkevinonline.de',
          'URL:https://twitch.tv/papaplatte',
          'END:VEVENT',
        ].join('\r\n');
      });

    const calendar = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//kommtkevinonline.de//predictions//DE',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'X-WR-CALNAME:KommtKevinOnline?',
      'X-WR-TIMEZONE:Europe/Berlin',
      ...events,
      'END:VCALENDAR',
    ].join('\r\n');

    setResponseHeader(event, 'Content-Type', 'text/calendar; charset=utf-8');

    return calendar;
  },
  {
    swr: true,
    maxAge: 60 * 5,
  }
);
