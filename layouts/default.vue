<template>
  <div
    v-if="false"
    class="bg-orange-500 py-4 text-center text-white font-semibold flex justify-center gap-2"
  >
    <UIcon name="i-heroicons-information-circle" class="size-6" />
    Kevin macht die Restliche Woche was mit seiner Family. Der Nächste Stream
    ist am Montag den 1. Dezember.
  </div>
  <Header />

  <UMain>
    <slot />
  </UMain>

  <Footer />
</template>

<script setup lang="ts"></script>
