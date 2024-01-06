<template>
  <v-row justify="center" v-if="props.vod.vodid && props.vod.vodid !== ''">
    <v-col cols="12" lg="8" class="d-flex align-center justify-center pa-0">
      <div id="player" class="w-100" style="aspect-ratio: 16/9"></div>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" lg="8" class="d-flex flex-column">
      <subtitle :vod="vod" :time="currentTime" :duration="duration" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { vods } from "../../db/schema";

useHead({
  script: [
    {
      src: "https://player.twitch.tv/js/embed/v1.js",
    },
  ],
});

const props = defineProps<{ vod: typeof vods.$inferSelect }>();

const currentTime = ref(0);
const duration = ref(0);

onMounted(() => {
  const options = {
    width: "100%",
    height: "100%",
    video: props.vod.vodid,
    parent: ["localhost"],
    autoplay: true,
    muted: true,
    time: props.vod.duration,
  };
  // @ts-ignore
  const player = new Twitch.Player("player", options);

  // @ts-ignore
  player.addEventListener(Twitch.Player.READY, () => {
    setInterval(() => {
      currentTime.value = player.getCurrentTime();
    }, 400);
  });
});
</script>

<style scoped>
iframe {
  border: none;
}
</style>
