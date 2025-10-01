<template>
  <UApp>
    <AppAlert />

    <AppHeader />

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator icon="i-bx-exclude" />

    <AppFooter />
  </UApp>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const color = computed(() =>
  colorMode.value === 'dark' ? '#111827' : 'white',
);

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
  ],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'de',
  },
});

const { title, description } = useAppConfig();

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
});
</script>
