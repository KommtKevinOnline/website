<template>
  <v-row justify="center" dense>
    <v-col md="12" lg="8">
      <h2>Wird Kevin heute Online kommen?</h2>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col md="12" lg="8" class="d-flex align-center">
      <h1 class="gradient" style="font-size: 64px">Ja</h1>
      <nuxt-img
        class="ml-4"
        :src="sevenTv.getEmoteUrl('60d1faf30256ae65b7d8c1b7')"
        height="64"
        width="64"
      />
    </v-col>
  </v-row>
  <v-row justify="center" v-show="isLate">
    <v-col md="12" lg="8">
      <v-card>
        <template #text>
          <nuxt-img
            class="mx-2"
            :src="sevenTv.getEmoteUrl('61b63b648ffada6c4bafacc5')"
            height="32"
          />
          <span class="text-h5"
            >Ich habe es langsam satt! 😠 Jeden Tag das selbe "wir sehen uns
            morgen 15 Uhr" 🤡 dann bin ich um 15 Uhr da und er ist immer zu
            spät</span
          >
          <nuxt-img
            class="mx-2"
            :src="sevenTv.getEmoteUrl('61b63b648ffada6c4bafacc5')"
            height="32"
          />
          <span class="text-h5">dann immer diese ausreden</span>
          <nuxt-img
            class="mx-2"
            :src="sevenTv.getEmoteUrl('61f5a7454f8c353cf9fbde43')"
            height="32"
          />
          <span class="text-h5"
            >"yo sry chat war heute nen tuff day yk, sry das ich zu spät bin war
            noch im gym und musste paar</span
          >
          <nuxt-img
            class="mx-2"
            :src="sevenTv.getEmoteUrl('6323a49345b4346d6d4845a0')"
            height="32"
          />
          <span class="text-h5">sachen abklären"</span>
          <nuxt-img
            class="mx-2"
            :src="sevenTv.getEmoteUrl('6117e133d3fbf90af76216be')"
            height="32"
          />
          <span class="text-h5">so etwas kaufe ich ihm nicht mehr ab!</span>
          <nuxt-img
            class="mx-2"
            :src="sevenTv.getEmoteUrl('62f15919947ca7b836564272')"
            height="32"
          />
        </template>
      </v-card>
    </v-col>
  </v-row>
  <twitch-vod-player v-if="vod" :vod="vod" />
</template>

<script setup lang="ts">
import { vods } from "../../db/schema";
const props = defineProps<{ vod?: typeof vods.$inferSelect }>();

const sevenTv = use7tv();

const nextStreamingIntends = computed(() => {
  const onlineIntendDates = props.vod?.onlineIntendDate?.split(",");

  if (!onlineIntendDates) return [];

  return onlineIntendDates
    .map((date) => new Date(date))
    .sort((a, b) => a.getTime() - b.getTime());
});

const isLate = computed(() => {
  let isLate = false;

  if (!nextStreamingIntends.value) return false;

  const now = new Date();

  for (const date of nextStreamingIntends.value) {
    if (now > date) {
      isLate = true;
    }
  }

  return isLate;
});
</script>
