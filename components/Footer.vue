<template>
  <UFooter>
    <template #top>
      <UFooterColumns :links="links" />
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Copyright © {{ new Date().getFullYear() }} Niklas Lausch. Alle Rechte
        vorbehalten.
      </p>
    </template>

    <template #right>
      <UButton
        to="https://github.com/KommtKevinOnline"
        target="_blank"
        icon="i-simple-icons-github"
        aria-label="GitHub"
        color="gray"
        variant="ghost"
      />

      <UColorModeButton size="sm" />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
const links = [
  {
    label: "Info",
    children: [
      {
        label: "Niki2k1.dev",
        to: "https://niki2k1.dev",
        target: "_blank",
      },
      {
        label: "FAQ",
        to: "/faq",
      },
    ],
  },
  {
    label: "Rechtliches",
    children: [
      {
        label: "Impressum",
        to: "/impressum",
      },
    ],
  },
  {
    label: "Mehr von mir",
    children: [
      {
        label: "Games",
        to: "https://games.kommtkevinonline.de",
      },
      {
        label: "Papaplattify",
        to: "https://chromewebstore.google.com/detail/youtube-papaplattify/nodlbljncllmcgidfnihmpbkladalhld?hl=de",
      },
    ],
  },
];
</script>
