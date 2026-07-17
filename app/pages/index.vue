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
const route = useRoute();
const toast = useToast();

onMounted(() => {
  if (route.query.login === 'denied') {
    toast.add({
      title: 'Kein Zugriff',
      description: 'Dein Twitch-Account ist kein Mod dieser Seite.',
      color: 'error',
      icon: 'i-lucide-circle-x',
    });
  } else if (route.query.login === 'error') {
    toast.add({
      title: 'Login fehlgeschlagen',
      description: 'Bitte versuche es später erneut.',
      color: 'error',
      icon: 'i-lucide-circle-x',
    });
  }

  if (route.query.login) {
    navigateTo('/', { replace: true });
  }
});

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
