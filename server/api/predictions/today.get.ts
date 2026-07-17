export default defineEventHandler(async () => {
  const { todayPrediction, nextLivePrediction, hasStreamedToday } =
    await getPredictionOverview();

  return {
    prediction: todayPrediction ?? null,
    nextLivePrediction: nextLivePrediction ?? null,
    hasStreamedToday,
  };
});
