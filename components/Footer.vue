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
        label: "Über mich",
        to: "/about",
      },
      {
        label: "Niki2k1.dev",
        href: "https://niki2k1.dev",
        target: "_blank",
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
      {
        label: "Kontakt",
        to: "/contact",
      },
    ],
  },
];
</script>
