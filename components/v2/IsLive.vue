<template>
  <ULandingHero :ui="{ wrapper: 'py-16' }">
    <template #title>
      <h1
        class="flex justify-center items-center text-8xl italic font-[Roboto] font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent dark:text-transparent"
      >
        Kevin ist Online
        <nuxt-img
          class="ml-4 mt-[-30px] h-24 w-24"
          :src="sevenTv.getEmoteUrl('603cb17bc20d020014423c29')"
        />
      </h1>
    </template>
    <div class="flex items-center justify-center">
      <V2TwitchCard class="w-6/12" :streamInfo="streamData" />
    </div>
  </ULandingHero>
</template>

<script lang="ts" setup>
defineProps<{ streamData: Stream }>();
const sevenTv = use7tv();
</script>

<style></style>
