<template>
  <div
    v-if="currentSegment"
    class="absolute h-12 max-w-max self-end justify-self-center bottom-20 bg-emerald-200 rounded-lg p-2 text-emerald-950"
  >
    <p class="text-lg font-bold">
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
