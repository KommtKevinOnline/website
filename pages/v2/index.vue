<template>
  <div v-if="streamData">
    <V2IsLive v-if="streamData.type === 'live'" :streamData="streamData" />
    <ULandingHero
      v-else-if="streamData.type === 'offline'"
      :title="onlineInted ? 'Ja' : 'Nein'"
      :description="
        onlineInted
          ? `Kevin plant um ${onlineIntendTime} Uhr live auf Twitch zu sein.`
          : undefined
      "
      :ui="{
        title:
          '!text-[120pt] italic font-[Roboto] font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent dark:text-transparent',
      }"
    >
      <V2Player v-if="streamData?.lastVod" :vod="streamData?.lastVod" />
    </ULandingHero>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "v2",
});

useHead({
  script: [
    {
      src: "https://player.twitch.tv/js/embed/v1.js",
    },
  ],
});

const { data: streamData } = await useFetch<Stream>(
  "/api/twitch/stream/50985620"
);

const onlineInted = computed(() => {
  const lastVod = streamData.value?.lastVod;

  if (!lastVod || !lastVod.onlineIntendDate || !lastVod.date) return false;

  const onlineIntendDates = lastVod.onlineIntendDate
    .split(",")
    .map((dateString: string) => new Date(dateString));

  return hasOnlineIntend(new Date(lastVod.date), onlineIntendDates);
});

const onlineIntendTime = computed(() => {
  const lastVod = streamData.value?.lastVod;

  if (!lastVod || !lastVod.onlineIntendDate || !lastVod.date) return false;

  const onlineIntendDates = lastVod.onlineIntendDate
    .split(",")
    .map((dateString: string) => new Date(dateString));

  return onlineIntendDates[0].toLocaleTimeString("de-DE");
});
</script>
