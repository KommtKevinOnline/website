import { desc } from 'drizzle-orm';
import { DateTime } from 'luxon';

export default defineEventHandler(async (event) => {
  const drizzle = useDrizzle();

  const lastVod = await drizzle.query.vods.findFirst({
    orderBy: [desc(tables.vods.date)],
  });

  if (!lastVod || !lastVod.onlineIntendDate || !lastVod.date) return `4Shrug`;

  const onlineIntendDates = lastVod.onlineIntendDate
    .split(',')
    .map((dateString: string) => new Date(dateString));

  const onlineIntend = hasOnlineIntend(
    new Date(lastVod.date),
    onlineIntendDates,
  );

  if (onlineIntend) {
    const timeString = DateTime.fromJSDate(onlineIntendDates[0])
      .setZone('UTC')
      .setLocale('de')
      .toLocaleString(DateTime.TIME_24_SIMPLE);

    return `Kevin plant um ${timeString} Uhr online zu gehen. Pag`;
  }

  return `Kevin kommt heute nicht online. Saj`;
});
