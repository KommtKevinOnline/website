<template>
  <UContainer class="mb-16">
    <UPageSection
      title="Transkript-Suche"
      description="Was hat Kevin gesagt? Durchsucht die transkribierten letzten 5 Minuten aller erfassten Streams."
      :ui="{ container: 'py-8 sm:py-8 lg:py-10' }"
    >
      <div class="max-w-2xl mx-auto flex flex-col gap-6">
        <UInput
          v-model="query"
          size="xl"
          icon="i-lucide-search"
          placeholder="z.B. morgen, Pause, Reved …"
          autofocus
          @keydown.enter="search"
        >
          <template #trailing>
            <UButton
              color="primary"
              variant="soft"
              :loading="status === 'pending'"
              :disabled="query.trim().length < 2"
              @click="search"
            >
              Suchen
            </UButton>
          </template>
        </UInput>

        <div v-if="results?.length" class="flex flex-col gap-3">
          <UCard v-for="(hit, index) in results" :key="index">
            <div class="flex gap-4 items-start">
              <VodThumbnail
                v-if="hit.thumbnail"
                :src="getThumbnailUrl(hit.thumbnail, 160, 90)"
                :width="160"
                :height="90"
                class="shrink-0 hidden sm:block max-w-40"
              />

              <div class="flex-1 min-w-0">
                <p class="italic">„{{ hit.text }}“</p>
                <p class="text-sm text-muted mt-1">
                  {{ hit.title || 'Stream' }} —
                  {{
                    hit.date ? useDateFormat(hit.date, 'DD.MM.YYYY').value : ''
                  }}
                </p>
              </div>

              <UButton
                :to="`https://www.twitch.tv/videos/${hit.vodid}?t=${formatTwitchTimestamp(hit.timestamp)}`"
                target="_blank"
                icon="i-simple-icons-twitch"
                variant="subtle"
                color="primary"
                size="sm"
              >
                Anhören
              </UButton>
            </div>
          </UCard>
        </div>

        <UAlert
          v-else-if="searched && status !== 'pending'"
          icon="i-lucide-search-x"
          color="neutral"
          variant="subtle"
          title="Keine Treffer"
        />
      </div>
    </UPageSection>
  </UContainer>
</template>

<script lang="ts" setup>
const query = ref('');
const searched = ref(false);

const {
  data: results,
  status,
  execute,
} = await useFetch('/api/search', {
  query: { q: query },
  immediate: false,
  watch: false,
});

async function search() {
  if (query.value.trim().length < 2) return;

  await execute();
  searched.value = true;
}

function formatTwitchTimestamp(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return `${h}h${m}m${s}s`;
}

useSeoMeta({
  title: 'Transkript-Suche — KommtKevinOnline?',
  description: 'Durchsuche die Transkripte von Papaplattes Stream-Enden.',
});
</script>
