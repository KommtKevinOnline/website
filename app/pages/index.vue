<template>
  <Hero :isOnline="isOnline" :predictionData="predictionData ?? null" />

  <UContainer class="max-w-4xl">
    <TwitchCard v-if="streamData && isOnline" :streamInfo="streamData" />

    <VideoPlayer v-else-if="vod" :vod="vod" />
  </UContainer>

  <History />

  <FAQ />
</template>

<script lang="ts" setup>
const { data: streamData } = await useFetch<Stream>(
  '/api/twitch/stream/50985620'
);

const isOnline = computed(() => {
  return streamData.value?.type === 'live';
});

const { data: vod } = await useFetch<Vod>('/api/vods/latest');

const { data: predictionData } = await useFetch<TodayPredictionResponse>(
  '/api/predictions/today'
);

const ogAnswer = computed(() => {
  if (isOnline.value) return 'Kevin ist online!';
  if (predictionData.value?.hasStreamedToday) return 'Heute war schon Stream';
  if (predictionData.value?.prediction?.eventType === 'live') return 'Ja';
  if (predictionData.value?.prediction?.eventType === 'offday') return 'Nein';
  return 'Keine Daten';
});

const ogSubtitle = computed(() => {
  const prediction = predictionData.value?.prediction;

  if (isOnline.value || prediction?.eventType !== 'live' || !prediction.date) {
    return '';
  }

  return `Geplant: ${useDateFormat(prediction.date, 'HH:mm').value} Uhr`;
});

defineOgImageComponent('TodayAnswer', {
  answer: ogAnswer.value,
  subtitle: ogSubtitle.value,
});
</script>
