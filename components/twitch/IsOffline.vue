<template>
  <v-row justify="center">
    <v-col md="12" lg="8" class="d-flex align-center justify-center">
      <h1 class="gradient" style="font-size: 64px">Ja</h1>
      <nuxt-img class="ml-4" :src="sevenTv.getEmoteUrl('60d1faf30256ae65b7d8c1b7')" height="64" width="64" />
    </v-col>
  </v-row>
  <v-row justify="center" v-if="props.upcoming.vodid && props.upcoming.vodid !== ''">
    <v-col cols="12" lg="8" class="d-flex align-center justify-center">
      <div id="player"></div>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" lg="6" class="d-flex flex-column">
      <subtitle />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { Vod } from '../../types/Vod';

useHead({
  script: [
    {
      src: 'https://player.twitch.tv/js/embed/v1.js'
    }
  ]
})

const props = defineProps<{ upcoming: Vod }>();
const sevenTv = use7tv();

onMounted(() => {
  const options = {
    width: 750,
    height: 422,
    video: "1930435547",
    parent: ["localhost"],
    autoplay: true,
    muted: true
  };
  // @ts-ignore
  const player = new Twitch.Player("player", options);

  player.addEventListener('ready', () => {
    player.seek(100);
  })
})

const getTwitchVodUrl = (vodId: string) => {
  return `https://player.twitch.tv?video=1930435547&parent=localhost`;
};
</script>

<style scoped>
iframe {
  border: none;
}
</style>
