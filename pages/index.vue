<template>
  <template v-if="pending">
    <v-container class="d-flex justify-center">
      <h2>Gucken ob Kevin online kommt...</h2>
      <v-progress-circular class="ml-2" indeterminate />
    </v-container>
  </template>
  <template v-else-if="streamData">
    <v-container v-if="streamData.type === 'live'">
      <TwitchIsLive :streamData="streamData" />
    </v-container>
    <v-container v-else-if="streamData.type === 'offline'">
      <TwitchOnlineIntend v-if="onlineInted" :vod="streamData.lastVod" />
      <template v-else>
        <v-row justify="center" dense>
          <v-col md="12" lg="8">
            <h2>Wird Kevin heute Online kommen?</h2>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col md="12" lg="8" class="d-flex align-center">
            <h1 class="gradient" style="font-size: 64px">Nein</h1>
            <nuxt-img
              class="ml-4"
              :src="sevenTv.getEmoteUrl('609ef9394c18609a1d9b10e1')"
              height="64px"
              width="64px"
            />
          </v-col>
        </v-row>
      </template>
      <v-row>
        <v-col>
          <twitch-vod-player
            v-if="streamData.lastVod"
            :vod="streamData.lastVod"
          />
        </v-col>
      </v-row>
    </v-container>
    <!--<ClientOnly>
      <v-row class="mt-8" justify="center">
        <v-col cols="12" lg="4">
          <twitter-embed />
        </v-col>
        <v-col cols="12" lg="4">
          <twitch-embed />
        </v-col>
      </v-row>
    </ClientOnly>-->
  </template>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Kommt Kevin Online?",
  description: "Schaue hier nach ob Papaplatte heute streamt!",
});

useHead({
  link: [{ rel: "icon", type: "image/png", href: "/favicon.ico" }],
});

const sevenTv = use7tv();

const { data: streamData, pending } = await useFetch<Stream>(
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
</script>

<style scoped>
.text-online {
  font-size: 4.5rem;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.gradient {
  background: -webkit-linear-gradient(200deg, #11998e, #38ef7d);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
