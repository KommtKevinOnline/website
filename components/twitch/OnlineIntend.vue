<template>
  <v-row justify="center" dense>
    <v-col md="12" lg="8">
      <h2>Wird Kevin heute Online kommen?</h2>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col md="12" lg="8" class="d-flex align-center">
      <h1 class="gradient" style="font-size: 64px">Ja</h1>
      <nuxt-img class="ml-4" :src="sevenTv.getEmoteUrl('60d1faf30256ae65b7d8c1b7')" height="64" width="64" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { vods } from '../../db/schema';
defineProps<{ vod?: typeof vods.$inferSelect }>();
const sevenTv = use7tv();
</script>
