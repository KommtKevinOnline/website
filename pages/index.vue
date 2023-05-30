<template>
  <v-row justify="center">
    <v-col md="12" lg="8">
      <h1 v-if="streamInfo.type === 'live'" class="text-online text-light-green-accent-3">
        Kevin ist Online
        <img class="ml-4" :src="getEmoteUrl('603cb17bc20d020014423c29')" height="64px" width="64px" />
      </h1>
      <h1 v-else style="font-size: 4.5rem;">Kommt Kevin heute Online?</h1>
    </v-col>
  </v-row>
  <v-row justify="center" v-if="streamInfo.type === 'live'">
    <v-col md="8" lg="6" xl="4">
      <TwitchState :streamInfo="streamInfo" />
    </v-col>
  </v-row>
  <v-row justify="center" v-else-if="true">
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
  </v-row>
</template>

<script setup lang="ts">
useHead({
  title: "Kommt Kevin Online?",
  link: [{ rel: "icon", type: "image/png", href: "/favicon.ico" }],
});

const getEmoteUrl = (emoteId: string) => {
  return `https://cdn.7tv.app/emote/${emoteId}/4x.webp`
}

const streamInfo = ref({
  "id": "39632928965",
  "user_id": "50985620",
  "user_login": "papaplatte",
  "user_name": "Papaplatte",
  "game_id": "1502494668",
  "game_name": "Poly Bridge 3",
  "type": "live",
  "title": "ICK HAB STURMFREI FREUNDE // POLYBRIDGE 3 POGGERS // TIKTOKS ABER JEDES MAL WENN ICH LACHE WIRD ES TEURER",
  "viewer_count": 23530,
  "started_at": "2023-05-30T13:01:22Z",
  "language": "de",
  "thumbnail_url": "https://static-cdn.jtvnw.net/previews-ttv/live_user_papaplatte-{width}x{height}.jpg",
  "tag_ids": [],
  "tags": [
    "dumm",
    "wer",
    "guckt",
    "german",
    "Deutsch"
  ],
  "is_mature": false
})
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