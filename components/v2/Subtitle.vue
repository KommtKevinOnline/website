<template>
  <div
    v-if="currentSegment"
    class="absolute h-9 md:h-12 max-w-max top-2 md:self-end md:bottom-20 justify-self-center bg-emerald-200 rounded-lg p-2 text-emerald-950"
  >
    <p class="text-sm md:text-lg font-bold overflow-hidden text-ellipsis">
      {{ currentSegment.text }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import type { vods } from "../../db/schema";

const props = defineProps<{ vod: typeof vods.$inferSelect; time: number }>();

const segments = computed(() =>
  (props.vod.transcript as Transcript).segments?.map((segment) => {
    if (!props.vod.duration) {
      return {
        ...segment,
        start: 0,
        end: 0,
      };
    }

    return {
      ...segment,
      start: segment.start + props.vod.duration,
      end: segment.end + props.vod.duration,
    };
  })
);

const currentSegmentIndex = computed(() => {
  if (!segments.value) return null;

  return segments.value.findIndex(
    (segment) => segment.start <= props.time && segment.end >= props.time
  );
});

const currentSegment = computed(() => {
  if (!segments.value || !currentSegmentIndex.value) return null;

  return segments.value[currentSegmentIndex.value];
});
</script>
