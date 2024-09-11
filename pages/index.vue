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
import { DateTime } from "luxon";

useSeoMeta({
  title: "KommtKevinOnline?",
});

useHead({
  script: [
    {
      src: "https://player.twitch.tv/js/embed/v1.js",
    },
  ],
});

const onlineInted = computed(() => {
  const lastVod = streamData.value?.lastVod;

  if (!lastVod || !lastVod.onlineIntendDate || !lastVod.date) return false;

  const onlineIntendDates = lastVod.onlineIntendDate
    .split(",")
    .map((dateString: string) => new Date(dateString));

  return hasOnlineIntend(new Date(lastVod.date), onlineIntendDates);
});

const { data: streamData } = await useFetch<Stream>(
  "/api/twitch/stream/50985620"
);

const onlineIntendTime = computed(() => {
  const lastVod = streamData.value?.lastVod;

  if (!lastVod || !lastVod.onlineIntendDate || !lastVod.date) return false;

  const onlineIntendDates = lastVod.onlineIntendDate
    .split(",")
    .map((dateString: string) => new Date(dateString));

  const timeString = DateTime.fromJSDate(onlineIntendDates[0])
    .setZone("UTC")
    .setLocale("de")
    .toLocaleString(DateTime.TIME_24_SIMPLE);

  return timeString;
});

defineOgImageComponent("KommtKevinOnline", {
  onlineInted: onlineInted.value,
});
</script>
