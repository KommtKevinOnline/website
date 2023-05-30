<template>
  <v-row justify="center">
    <v-col md="12" lg="8" class="d-flex align-center">
      <h1 class="gradient" style="font-size: 64px">Ja</h1>
      <nuxt-img class="ml-4" :src="sevenTv.getEmoteUrl('60d1faf30256ae65b7d8c1b7')" height="64" width="64" />
    </v-col>
  </v-row>
  <!-- <v-row v-if="props.upcoming.content"> Stream Content
    <v-col>
      <h3>{{ props.upcoming.content }}</h3>
    </v-col>
  </v-row> -->
  <!-- <v-row justify="center" v-if="props.upcoming.vodid && props.upcoming.vodid !== ''">
    <v-col cols="12" lg="8">
      <ClientOnly>
        <v-responsive height="422px" aspectRatio="16/9">
          <div id="vodPlayer"></div>
          <iframe :src="getTwitchVodUrl(props.upcoming.vodid)" frameborder="0" allowfullscreen="true" scrolling="no"
            height="100%" width="100%"></iframe>
        </v-responsive>
      </ClientOnly>
    </v-col>
  </v-row> -->
</template>

<script setup lang="ts">
import { Vod } from '../../types/Vod';
// import { TwitchPlayer } from 'twitch-player'

const props = defineProps<{ upcoming: Vod }>();
const sevenTv = use7tv();

// onMounted(() => {
//   TwitchPlayer.FromOptions('vodPlayer', {
//     width: 422,
//     height: '100%',
//     video: props.upcoming.vodid,
//   })
// })

// const getTwitchVodUrl = (vodId: string) => {
//   return `https://clips.twitch.tv/embed?video=${vodId}&parent=${window.location.host}`;
// };
</script>
