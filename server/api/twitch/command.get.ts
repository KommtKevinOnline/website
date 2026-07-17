import { DateTime } from 'luxon';

function formatTime(value: string) {
  return parseDbDate(value).setZone('Europe/Berlin').toFormat('HH:mm');
}

function formatDay(value: string) {
  return parseDbDate(value)
    .setZone('Europe/Berlin')
    .setLocale('de')
    .toFormat('cccc dd.MM.');
}

export default defineEventHandler(async () => {
  const { now, todayPrediction, nextLivePrediction } =
    await getPredictionOverview();

  if (
    todayPrediction?.eventType === 'live'
    && todayPrediction.date
    && parseDbDate(todayPrediction.date) > now
  ) {
    return `Kevin plant um ${formatTime(todayPrediction.date)} Uhr online zu gehen. Pag`;
  }

  if (todayPrediction?.eventType === 'offday') {
    if (nextLivePrediction?.date) {
      return `Kevin kommt heute nicht online. Saj Nächster Stream voraussichtlich am ${formatDay(nextLivePrediction.date)} um ${formatTime(nextLivePrediction.date)} Uhr.`;
    }

    return `Kevin kommt heute nicht online. Saj`;
  }

  if (nextLivePrediction?.date) {
    return `Nächster Stream voraussichtlich am ${formatDay(nextLivePrediction.date)} um ${formatTime(nextLivePrediction.date)} Uhr. Pag`;
  }

  return `4Shrug`;
});
