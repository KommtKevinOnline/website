<template>
  <div class="subtitleWrapper" :style="{ height: `${TEXT_HEIGHT * 3}px` }">
    <div
      class="subtitles"
      :style="`transform: translateY(-${currentSegmentY}px)`"
    >
      <h3
        class="msg text-center"
        :class="{ active: currentSegment === index }"
        :style="`height: ${TEXT_HEIGHT}px`"
        v-for="(segment, index) in segments"
      >
        {{ segment.text }}
      </h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { vods } from "../db/schema";

const TEXT_HEIGHT = 70;

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

const currentSegment = computed(() => {
  if (!segments.value) return null;

  return segments.value.findIndex(
    (segment) => segment.start <= props.time && segment.end >= props.time
  );
});

const currentSegmentY = computed(() => {
  if (!currentSegment.value) return null;

  return (currentSegment.value - 1) * TEXT_HEIGHT;
});
</script>

<style scoped>
.subtitleWrapper {
  overflow: hidden;
}

.subtitles {
  container-type: inline-size;
  transition: all 250ms ease-in-out;
}

.msg {
  opacity: 50%;
  font-size: 5cqw;
  overflow: hidden;
}

.active {
  opacity: 100%;
}

.msg:hover {
  opacity: 100%;
}
</style>
