<template>
  <UPageSection title="Historie">
    <template #description>
      <p>
        Stream Historie, klicke auf einen Titel um mehr Infos zu dem Stream zu
        erhalten.
      </p>
    </template>

    <div v-if="vods" class="flex justify-center">
      <UTimeline color="neutral" :items="items" class="w-96">
        <template #title="{ item }">
          <NuxtLink :to="item.url" class="hover:underline">
            {{ item.title }}
          </NuxtLink>
        </template>

        <template #description="{ item }">
          <NuxtLink :to="item.url">
            <NuxtImg
              v-if="item.thumbnail"
              :src="item.thumbnail"
              :alt="item.title"
              class="w-full h-auto rounded-lg"
              width="480"
              height="270"
              loading="lazy"
            />
          </NuxtLink>
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

  return vods.value.map((vod) => ({
    id: vod.vodid,
    url: `/videos/${vod.vodid}`,
    date: useDateFormat(vod.date, 'DD. MMM YYYY').value,
    title: vod.title,
    icon: 'i-simple-icons-twitch',
    thumbnail: getThumbnailUrl(vod.thumbnail, 480, 270),
  })) satisfies TimelineItem[];
});
</script>
