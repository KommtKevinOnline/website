<template>
  <UFooter>
    <template #top>
      <UContainer>
        <UFooterColumns :columns />
      </UContainer>
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }} Niklas Lausch. Alle Rechte
        vorbehalten.
      </p>
    </template>

    <UColorModeButton />

    <template #right>
      <UButton
        to="https://github.com/KommtKevinOnline"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="neutral"
        variant="ghost"
      />

      <UButton
        to="https://x.com/niki2k1"
        target="_blank"
        icon="i-simple-icons-x"
        aria-label="X (Twitter)"
        color="neutral"
        variant="ghost"
      />

      <UButton
        to="https://instagram.com/niki2k1"
        target="_blank"
        icon="i-simple-icons-instagram"
        aria-label="Instagram"
        color="neutral"
        variant="ghost"
      />

      <UButton
        to="https://youtube.com/@niki2k1"
        target="_blank"
        icon="i-simple-icons-youtube"
        aria-label="YouTube"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui';

const columns: FooterColumn[] = [
  {
    label: 'Info',
    children: [
      {
        label: 'Niki2k1.dev',
        to: 'https://niki2k1.dev',
        target: '_blank',
      },
      {
        label: 'FAQ',
        to: '#faq',
      },
    ],
  },
  {
    label: 'Rechtliches',
    children: [
      {
        label: 'Impressum',
        to: 'https://niki2k1.dev/impressum',
      },
    ],
  },
  {
    label: 'Mehr Tools',
    children: [
      {
        label: 'Games',
        to: 'https://games.kommtkevinonline.de',
      },
      {
        label: 'Papaplattify',
        to: 'https://chromewebstore.google.com/detail/youtube-papaplattify/nodlbljncllmcgidfnihmpbkladalhld?hl=de',
      },
    ],
  },
];
</script>
