<template>
  <UPageSection
    title="Historie"
    description="Stream Historie, klicke auf einen Titel um mehr Infos zu dem Stream zu
          erhalten. (Bald verfügbar!)"
  >
    <div v-if="vods" class="flex justify-center">
      <UTimeline color="neutral" :items="items" class="w-96">
        <template #title="{ item }">
          <!-- <UButton
            v-if="item.id === 'history'"
            :to="item.url"
            color="neutral"
            variant="subtle"
            trailing-icon="i-lucide-arrow-right"
          >
            {{ item.title }}
          </UButton> -->

          <!-- <NuxtLink v-else :to="item.url" target="_blank">
            {{ item.title }}
          </NuxtLink> -->

          {{ item.title }}
        </template>

        <template #description="{ item }">
          <NuxtImg
            v-if="item.thumbnail"
            :src="item.thumbnail"
            :alt="item.title"
            class="w-full h-auto rounded-lg"
            width="480"
            height="270"
            loading="lazy"
          />
        </template>
      </UTimeline>
    </div>
  </UPageSection>
</template>

<script lang="ts" setup>
import type { TimelineItem } from '@nuxt/ui';

const { data: vods } = await useFetch<Vod[]>('/api/vods');

const items = computed(() => {
  if (!vods.value) return [];

  return [
    ...vods.value.map((vod) => ({
      id: vod.vodid,
      url: `/videos/${vod.vodid}`,
      date: useDateFormat(vod.date, 'DD. MMM YYYY').value,
      title: vod.title,
      icon: 'i-simple-icons-twitch',
      thumbnail: getThumbnailUrl(vod.thumbnail, 480, 270),
    })),
    // {
    //   id: 'history',
    //   url: '/streams',
    //   title: 'Gesamte Historie',
    //   thumbnail: null,
    //   icon: 'i-lucide-list',
    // },
  ] satisfies TimelineItem[];
});
</script>
