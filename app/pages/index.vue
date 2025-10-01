<template>
  <Hero :isOnline="isOnline" :prediction="prediction" />

  <UContainer class="max-w-4xl">
    <TwitchCard v-if="streamData && isOnline" :streamInfo="streamData" />

    <VideoPlayer v-else-if="vod" :vod="vod" />
  </UContainer>

  <History />

  <FAQ />
</template>

<script lang="ts" setup>
useHead({
  script: [
    {
      src: 'https://player.twitch.tv/js/embed/v1.js',
    },
  ],
});

const { data: streamData } = await useFetch<Stream>(
  '/api/twitch/stream/50985620',
);

const isOnline = computed(() => {
  return streamData.value?.type === 'live';
});

const { data: vod } = await useFetch<Vod>('/api/vods/latest');

const { data: prediction } = await useFetch<Prediction>(
  '/api/predictions/today',
);
</script>
