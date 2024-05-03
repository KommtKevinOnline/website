<template>
  <UHeader :links="links">
    <template #logo>
      <span class="text-emerald-400">KommtKevinOnline</span>
    </template>

    <template #panel>
      <UAsideLinks :links="links" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const links = computed(() => [
  {
    label: "Home",
    to: "/v2",
    icon: "i-heroicons-home-20-solid",
  },
  {
    label: "Thumbnail Generator",
    to: "/thumbnail/generate",
    icon: "i-heroicons-photo",
  },
  {
    label: "Games",
    to: "https://games.kommtkevinonline.de",
    icon: "i-streamline-controller-1",
  },
  {
    label: "FAQ",
    to: "/v2/faq",
    icon: "i-heroicons-question-mark-circle-20-solid",
  },
]);
</script>
