<template>
  <UContainer>
    <UPageSection
      v-if="data"
      :title="data.title"
      :description="data.duration"
      orientation="horizontal"
      reverse
    >
      <NuxtImg
        v-if="data.thumbnail"
        :src="getThumbnailUrl(data.thumbnail, 1920, 1080)"
        aspect-ratio="16/9"
        class="w-full col-1 row-1 rounded-lg"
        loading="lazy"
      />
    </UPageSection>

    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 md:col-span-8 flex flex-col gap-4">
        <TwitchViewerChart
          :period="period"
          :range="range"
          :total="data?.viewCount"
        />

        <TwitchMessageChart />
      </div>

      <UCard class="col-span-12 md:col-span-4">
        <template #header>
          <h2 class="text-2xl font-bold">Top Chatter</h2>
        </template>

        <UPageList class="flex flex-col gap-2">
          <div v-for="(user, index) in users" :key="index">
            <UUser
              :name="user.name"
              :description="`${user.description} Nachrichten`"
              :avatar="{
                alt: user.name,
                src: `https://static-cdn.jtvnw.net/jtv_user_pictures/${user.id}-profile_image-70x70.png`,
              }"
              size="xl"
              class="relative"
            />
          </div>
        </UPageList>
      </UCard>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
import { sub } from 'date-fns';

const route = useRoute();

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});
const period = ref<Period>('daily');

const { data } = await useFetch(`/api/vods/${route.params.id}`);

const users = [
  {
    id: '4ec4858d-cecb-447a-bfd1-9a4854863eff',
    name: 'timfinitor',
    description: 2191,
  },
  {
    id: '4ec4858d-cecb-447a-bfd1-9a4854863eff',
    name: 'night_rxder',
    description: 2068,
  },
  {
    id: '4ec4858d-cecb-447a-bfd1-9a4854863eff',
    name: 'cronxz_tv',
    description: 1627,
  },
  {
    id: '4ec4858d-cecb-447a-bfd1-9a4854863eff',
    name: 'iceetoast',
    description: 1611,
  },
  {
    id: '4ec4858d-cecb-447a-bfd1-9a4854863eff',
    name: 'neisterkestis',
    description: 1053,
  },
  {
    id: '4ec4858d-cecb-447a-bfd1-9a4854863eff',
    name: 'vyakura',
    description: 995,
  },
  {
    id: '4ec4858d-cecb-447a-bfd1-9a4854863eff',
    name: 'fossabot',
    description: 973,
  },
  {
    id: '4ec4858d-cecb-447a-bfd1-9a4854863eff',
    name: 'devopsdavid',
    description: 838,
  },
  {
    id: '4ec4858d-cecb-447a-bfd1-9a4854863eff',
    name: 'moosdiamant',
    description: 835,
  },
  {
    id: '4ec4858d-cecb-447a-bfd1-9a4854863eff',
    name: 'mzntori',
    description: 791,
  },
];
</script>
