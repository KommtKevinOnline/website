<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="h-8 w-12" />
      </NuxtLink>
    </template>

    <UNavigationMenu :items="items" />
  </UHeader>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Home',
    to: '/',
    icon: 'i-lucide-house',
  },
  {
    label: 'Games',
    to: 'https://games.kommtkevinonline.de',
    icon: 'i-lucide-joystick',
  },
  {
    label: 'FAQ',
    to: '#faq',
    icon: 'i-lucide-circle-help',
  },
]);
</script>
