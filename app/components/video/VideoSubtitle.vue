<template>
  <div
    v-if="currentSegment"
    class="absolute top-2 md:top-auto md:bottom-20 left-1/2 -translate-x-1/2 w-max max-w-[calc(100%-1rem)] bg-[#42E695] rounded-lg p-2 text-emerald-950"
  >
    <p class="text-sm md:text-lg font-bold text-center">
      {{ currentSegment.text }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ vod: Vod; time: number }>();

const { data: transcript } = await useFetch<Transcript>(
  `/api/vods/transcript/${props.vod.vodid}`
);

const segments = computed(() =>
  (transcript.value as Transcript)?.segments?.map((segment) => {
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
  if (!segments.value || currentSegmentIndex.value == null) return null;
  if (currentSegmentIndex.value < 0) return null;

  return segments.value[currentSegmentIndex.value];
});
</script>
