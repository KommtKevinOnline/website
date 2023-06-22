<template>
  <a class="twitter-timeline" :href="`https://twitter.com/${user}?ref_src=twsrc%5Etfw`" data-height="800px"
    data-chrome="transparent">
    Tweets von {{ user }}
  </a>
</template>

<script setup lang="ts">
useHead({
  script: [
    {
      src: 'https://platform.twitter.com/widgets.js',
      async: true,
    }
  ]
})

const user = ref('Papaplatte')
</script>