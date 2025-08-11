<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/">
        <AppLogo class="h-8" />
      </NuxtLink>
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UButton
        to="https://github.com/nuxt-ui-pro/starter"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />
    </template>
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
    to: '/faq',
    icon: 'i-lucide-circle-help',
  },
]);
</script>
