<template>
  <v-row justify="center">
    <v-col md="12" lg="8">
      <h1 class="gradient text-online text-center">
        Kevin ist Online
        <nuxt-img
          class="ml-4"
          :src="sevenTv.getEmoteUrl('603cb17bc20d020014423c29')"
          height="64"
          width="64"
        />
      </h1>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col md="8" lg="6" xl="4">
      <TwitchState :streamInfo="streamData" />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
defineProps<{ streamData: Stream }>();

const sevenTv = use7tv();
</script>
