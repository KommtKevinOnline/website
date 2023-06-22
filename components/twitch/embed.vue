<template>
  <iframe :src="`https://www.twitch.tv/embed/Papaplatte/chat?parent=${origin}`" height="800px" width="100%" />
</template>

<script setup lang="ts">
const origin = computed(() => window.location.host)
</script>
