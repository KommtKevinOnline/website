<template>
  <div
    class="bg-orange-500 py-4 text-center text-white font-semibold flex justify-center gap-2"
  >
    <UIcon name="i-heroicons-information-circle" class="size-6" />
    Kevin streamt aktuell unregelmäßig, daher kann KommtKevinOnline falsche
    Daten anzeigen. Informiert euch lieber über Whatsapp oder Instagram.
  </div>
  <Header />

  <UMain>
    <slot />
  </UMain>

  <Footer />
</template>

<script setup lang="ts"></script>
