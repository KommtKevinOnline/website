<template>
  <Header />

  <UMain>
    <slot />
  </UMain>

  <Footer />
</template>

<script setup lang="ts">
useHead({
  script: [
    {
      src: "https://analytics.niki2k1.dev/js/script.js",
      defer: true,
      "data-domain": "kommtkevinonline.de",
    },
  ],
  htmlAttrs: {
    lang: "de",
  },
});
</script>

<style>
:root {
  font-family: Roboto;
}
</style>
