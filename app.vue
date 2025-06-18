<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
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
