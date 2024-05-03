<template>
  <a href="https://twitch.tv/papaplatte">
    <UCard
      class="bg-emerald-50 dark:bg-emerald-950"
      :ui="{ body: { padding: '!p-0' } }"
    >
      <template #header>
        <h1
          class="text-2xl font-bold text-emerald-600 italic text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {{ streamInfo.title }}
        </h1>
      </template>

      <nuxt-img :src="thumbnail" aspect-ratio="16/9" class="w-full" />

      <template #footer>
        <div class="text-emerald-600 flex justify-between">
          <b class="text-left">{{ streamInfo.game_name }}</b>
          <span class="text-right"
            >{{ streamInfo.viewer_count }} Zuschauer</span
          >
        </div>
      </template>
    </UCard>
  </a>
</template>

<script lang="ts" setup>
const props = defineProps<{
  streamInfo: Partial<Stream>;
}>();

const thumbnail = computed(() => {
  return props.streamInfo.thumbnail_url
    ?.replace("{width}", "1920")
    .replace("{height}", "1080");
});
</script>

<style></style>
