<template>
  <v-container v-if="(alerts?.length || 0) > 0">
    <v-row justify="center">
      <v-col cols="8">
        <v-alert v-for="alert in alerts" class="bg-warn-gradient" :title="alert.title" :text="alert.text"></v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const { data: alerts } = await useLazyFetch('/api/alerts/active');
</script>

<style scoped>
.bg-warn-gradient {
  background: #f12711;
  background: -webkit-linear-gradient(-200deg, #f5af19, #f12711);
  background: linear-gradient(-200deg, #f5af19, #f12711);
}
</style>