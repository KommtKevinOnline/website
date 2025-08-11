<template>
  <Hero />
</template>

<script lang="ts" setup>
useHead({
  script: [
    {
      src: 'https://player.twitch.tv/js/embed/v1.js',
    },
  ],
});
</script>
