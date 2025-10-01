<template>
  <div
    v-if="currentSegment"
    class="absolute h-9 md:h-12 max-w-max top-2 md:self-end md:bottom-20 justify-self-center bg-[#42E695] rounded-lg p-2 text-emerald-950"
  >
    <p class="text-sm md:text-lg font-bold overflow-hidden text-ellipsis">
      {{ currentSegment.text }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ vod: Vod; time: number }>();

const { data: transcript } = await useFetch<Transcript>(
  `/api/vods/transcript/${props.vod.vodid}`,
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
  }),
);

const currentSegmentIndex = computed(() => {
  if (!segments.value) return null;

  return segments.value.findIndex(
    (segment) => segment.start <= props.time && segment.end >= props.time,
  );
});

const currentSegment = computed(() => {
  if (!segments.value || !currentSegmentIndex.value) return null;

  return segments.value[currentSegmentIndex.value];
});
</script>
