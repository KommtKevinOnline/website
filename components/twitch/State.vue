<template>
  <v-card href="https://twitch.tv/papaplatte" color="purple-darken-2">
    <v-img
      :src="thumbnail"
      height="300px"
      aspect-ratio="16/9"
      cover
    />

    <v-card-title>
      {{ streamInfo.title }}
    </v-card-title>

    <v-card-text class="text-grey-lighten-1 d-flex justify-space-between">
      <b class="text-left">{{ streamInfo.game_name }}</b>
      <span class="text-right">{{ streamInfo.viewer_count }} Zuschauer</span>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { StreamResponse } from '../../interfaces/StreamResponse';

const props = defineProps<{
  streamInfo: Partial<StreamResponse>
}>();

const thumbnail = computed(() => {
  return props.streamInfo.thumbnail_url?.replace('{width}', '1920').replace('{height}', '1080');
});
</script>