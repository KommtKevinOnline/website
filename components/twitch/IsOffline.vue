<template>
  <v-row justify="center">
    <v-col md="12" lg="8" class="d-flex align-center">
      <h1 class="gradient" style="font-size: 64px">Ja</h1>
      <img
        class="ml-4"
        :src="sevenTv.getEmoteUrl('60d1faf30256ae65b7d8c1b7')"
        height="64px"
        width="64px"
      />
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="12" lg="8">
      <ClientOnly>
        <v-responsive height="422px" aspectRatio="16/9">
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
        </v-responsive>
      </ClientOnly>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const sevenTv = use7tv()

const getTwitchVodUrl = (vodId: string) => {
  return `https://clips.twitch.tv/embed?clip=${vodId}&parent=${window.location.host}`;
};
</script>