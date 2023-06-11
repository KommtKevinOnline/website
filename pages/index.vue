<template>
  <v-container v-if="streamData?.type === 'live'">
    <v-row justify="center">
      <v-col md="12" lg="8">
        <h1
          v-if="streamData.type === 'live'"
          class="text-online text-light-green-accent-3"
        >
          Kevin ist Online
          <img
            class="ml-4"
            :src="getEmoteUrl('603cb17bc20d020014423c29')"
            height="64px"
            width="64px"
          />
        </h1>
        <h1 v-else style="font-size: 4.5rem">Kommt Kevin heute Online?</h1>
      </v-col>
    </v-row>
    <v-row justify="center" v-if="streamData.type === 'live'">
      <v-col md="8" lg="6" xl="4">
        <TwitchState :streamInfo="streamData" />
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else-if="comesOnline">
    <v-row justify="center">
      <v-col md="12" lg="8" class="d-flex align-center">
        <h1 style="font-size: 64px">Ja</h1>
        <img
          class="ml-4"
          :src="getEmoteUrl('60d1faf30256ae65b7d8c1b7')"
          height="64px"
          width="64px"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" lg="8">
        <ClientOnly>
          <iframe
            :src="
              getTwitchVodUrl(
                'CoweringCuriousCrocodileOptimizePrime-wSOS5DlXZ9Qe2Xd3'
              )
            "
            frameborder="0"
            allowfullscreen="true"
            scrolling="no"
            height="100%"
            width="100%"
          ></iframe>
        </ClientOnly>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row justify="center">
      <v-col md="12" lg="8" class="d-flex align-center">
        <h1 style="font-size: 64px">Nein</h1>
        <img
          class="ml-4"
          :src="getEmoteUrl('609ef9394c18609a1d9b10e1')"
          height="64px"
          width="64px"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
useHead({
  title: "Kommt Kevin Online?",
  link: [{ rel: "icon", type: "image/png", href: "/favicon.ico" }],
});

const comesOnline = ref(true);

const getEmoteUrl = (emoteId: string) => {
  return `https://cdn.7tv.app/emote/${emoteId}/4x.webp`;
};

const getTwitchVodUrl = (vodId: string) => {
  return `https://clips.twitch.tv/embed?clip=${vodId}&parent=${window.location.origin}`;
};

// const streamData = ref({ type: "offline" });

const { data: streamData, refresh } = await useAsyncData("streamInfo", () =>
  $fetch("/api/twitch/stream/50985620")
);
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
