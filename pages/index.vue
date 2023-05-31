<template>
  <v-row justify="center">
    <v-col md="12" lg="8">
      <h1 v-if="streamData.type === 'live'" class="text-online text-light-green-accent-3">
        Kevin ist Online
        <img class="ml-4" :src="getEmoteUrl('603cb17bc20d020014423c29')" height="64px" width="64px" />
      </h1>
      <h1 v-else style="font-size: 4.5rem;">Kommt Kevin heute Online?</h1>
    </v-col>
  </v-row>
  <v-row justify="center" v-if="streamData.type === 'live'">
    <v-col md="8" lg="6" xl="4">
      <TwitchState :streamInfo="streamData" />
    </v-col>
  </v-row>
  <!-- <v-row justify="center" v-else-if="false">
    <v-col md="12" lg="8" class="d-flex align-center">
      <h1 style="font-size: 64px;">JAAA</h1>
      <img class="ml-4" :src="getEmoteUrl('60d1faf30256ae65b7d8c1b7')" height="64px" width="64px" />
    </v-col>
  </v-row>
  <v-row justify="center" v-else>
    <v-col md="12" lg="8" class="d-flex align-center">
      <h1 style="font-size: 64px;">Nö</h1>
      <img class="ml-4" :src="getEmoteUrl('60ad8c93c7188f3be2332566')" height="64px" width="64px" />
    </v-col>
  </v-row> -->
</template>

<script setup lang="ts">
useHead({
  title: "Kommt Kevin Online?",
  link: [{ rel: "icon", type: "image/png", href: "/favicon.ico" }],
});

const getEmoteUrl = (emoteId: string) => {
  return `https://cdn.7tv.app/emote/${emoteId}/4x.webp`
}

const { data: streamData, refresh } = await useAsyncData(
  'streamInfo',
  () => $fetch('https://kko.niki2k1.dev/twitch/stream/50985620')
)
</script>

<style scoped>
.text-online {
  font-size: 4.5rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}
</style>