<template>
  <div
    class="w-full h-full flex flex-col items-center justify-center"
    :style="{
      background: 'linear-gradient(135deg, #064e3b 0%, #10b981 100%)',
    }"
  >
    <div class="text-5xl font-bold text-emerald-100 mb-6">
      Kommt Kevin online?
    </div>
    <div class="text-9xl font-black italic text-white">
      {{ answer }}
    </div>
    <div v-if="subtitle" class="text-4xl text-emerald-100 mt-6">
      {{ subtitle }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  answer: string;
  subtitle?: string;
}>();
</script>
