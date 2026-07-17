<template>
  <UContainer>
    <UPageSection
      v-if="data"
      :title="data.title || 'Stream'"
      :description="streamMeta"
      orientation="horizontal"
      reverse
    >
      <VodThumbnail
        v-if="data.thumbnail"
        :src="getThumbnailUrl(data.thumbnail, 1920, 1080)"
        :alt="data.title ?? 'Stream'"
        :width="1920"
        :height="1080"
        class="col-1 row-1"
      />
    </UPageSection>

    <div v-if="data" class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      <UCard>
        <p class="text-xs text-muted uppercase mb-1.5">Aufrufe</p>
        <p class="text-3xl text-highlighted font-semibold">
          {{ formattedViewCount }}
        </p>
      </UCard>

      <UCard>
        <p class="text-xs text-muted uppercase mb-1.5">Datum</p>
        <p class="text-3xl text-highlighted font-semibold">
          {{ formattedDate }}
        </p>
      </UCard>

      <UCard class="col-span-2 md:col-span-1">
        <p class="text-xs text-muted uppercase mb-1.5">VOD</p>
        <UButton
          :to="`https://www.twitch.tv/videos/${data.vodid}`"
          target="_blank"
          color="primary"
          variant="subtle"
          icon="i-simple-icons-twitch"
        >
          Auf Twitch ansehen
        </UButton>
      </UCard>
    </div>

    <UCard v-if="transcript?.segments?.length" class="mb-8">
      <template #header>
        <h2 class="text-2xl font-bold">Die letzten 5 Minuten im Wortlaut</h2>
        <p class="text-sm text-muted">
          Automatisch transkribiert — auf dieser Basis entsteht die Vorhersage.
        </p>
      </template>

      <div class="flex flex-col gap-3 max-h-[32rem] overflow-y-auto pr-2">
        <div
          v-for="segment in transcript.segments"
          :key="segment.id"
          class="flex gap-3"
        >
          <span class="text-xs text-muted font-mono shrink-0 pt-1">
            {{ formatSegmentTime(segment.start) }}
          </span>
          <p>{{ segment.text }}</p>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

<script lang="ts" setup>
const route = useRoute();

const { data } = await useFetch(`/api/vods/${route.params.id}`);

const { data: transcript } = await useFetch<Transcript>(
  `/api/vods/transcript/${route.params.id}`
);

const formattedDate = computed(() =>
  data.value?.date ? useDateFormat(data.value.date, 'DD.MM.YYYY').value : '—'
);

const formattedViewCount = computed(() =>
  data.value?.viewCount != null
    ? new Intl.NumberFormat('de-DE').format(data.value.viewCount)
    : '—'
);

const streamMeta = computed(() => `Stream vom ${formattedDate.value}`);

// Segment times are relative to the transcribed tail of the VOD;
// vod.duration marks where that tail starts within the full VOD.
function formatSegmentTime(start: number) {
  const offset = Number(data.value?.duration ?? 0);
  const total = Math.max(0, Math.floor(offset + start));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

useSeoMeta({
  title: () => data.value?.title ?? 'Stream',
});
</script>
