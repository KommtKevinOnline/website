<template>
  <a href="https://twitch.tv/papaplatte">
    <UCard :ui="{ body: '!p-0' }" variant="subtle">
      <template #header>
        <h1
          class="text-2xl font-bold text-emerald-600 italic text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {{ streamInfo.title }}
        </h1>
      </template>

      <div class="grid">
        <NuxtImg
          :src="thumbnail"
          aspect-ratio="16/9"
          class="w-full col-1 row-1"
          loading="lazy"
        />

        <div
          class="col-1 row-1 flex items-center justify-center bg-radial from-black/50 to-transparent"
        >
          <UIcon name="i-lucide-external-link" class="text-4xl" />
        </div>
      </div>

      <template #footer>
        <div class="text-emerald-600 flex justify-between">
          <b class="text-left">{{ streamInfo.game_name }}</b>
          <span class="text-right">
            {{ streamInfo.viewer_count }} Zuschauer
          </span>
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
    ?.replace('{width}', '800')
    .replace('{height}', '450');
});
</script>

<style></style>
