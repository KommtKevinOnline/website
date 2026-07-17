<template>
  <div
    v-if="failed"
    class="w-full aspect-video rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center"
  >
    <UIcon name="i-simple-icons-twitch" class="text-3xl text-muted" />
  </div>

  <NuxtImg
    v-else
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    class="w-full h-auto rounded-lg"
    loading="lazy"
    @error="failed = true"
  />
</template>

<script lang="ts" setup>
// Twitch removes VODs after a retention window; their thumbnails 404 with
// them, so dead images fall back to a neutral placeholder.
defineProps<{
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}>();

const failed = ref(false);
</script>
