<template>
  <v-row>
    <v-col cols="12" lg="6">
      <v-text-field v-model="url" label="Youtube Video Url" />
    </v-col>
    <v-col v-if="url !== ''">
      <v-switch v-model="flip" label="Flip" color="green" inset></v-switch>
    </v-col>
  </v-row>
  <v-row v-if="url !== ''">
    <v-col cols="12" lg="6">
      <v-img :src="thumbnailUrl" aspect-ratio="16/9">
        <v-img :src="`/api/thumbnail/image/${active}`" class="h-100 w-100" :class="flip ? '' : 'flipX'" />
      </v-img>
    </v-col>
    <v-col cols="12" lg="6">
      <v-row>
        <v-col cols="3" v-for="i in 15">
          <v-card :style="`aspect-ratio: 16/9; background-image: url(${thumbnailUrl}); background-size: cover;`"
            @click="active = i">
            <template #image>
              <v-img :class="flip ? '' : 'flipX'" :src="`/api/thumbnail/image/${i}`" />
            </template>
            <template #prepend v-if="i === active" class="bg-grey">
              <v-icon icon="mdi-check" size="large" color="light-green-accent-3" />
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row v-if="url !== ''">
    <v-col>
      <v-btn color="green" prepend-icon="mdi-download" @click="exportThumbnail" :loading="loading">Download</v-btn>
      <v-btn color="grey" prepend-icon="mdi-reload" class="ml-2" @click="reset">Reset</v-btn>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useDownload } from '~/composables/useDownload'

const loading = ref<boolean>(false)

const url = ref<string>('')
const active = ref<number>(1)
const flip = ref<boolean>(false)

function reset() {
  url.value = ''
  active.value = 1
  flip.value = false
}

async function exportThumbnail() {
  try {
    loading.value = true
    const thumbnail = await $fetch<Blob>(`/api/thumbnail/generate`, {
      method: 'POST',
      body: JSON.stringify({
        originalThumbnail: thumbnailUrl.value,
        overlayId: active.value,
        flipX: !flip.value,
      }),
    })

    useDownload(thumbnail)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const thumbnailUrl = computed(() => {
  if (url.value && url.value !== '') {
    if (!url.value.includes('https://www.youtube.com/watch?v=')) {
      return ''
    }
    const videoId = new URL(url.value).searchParams.get('v')

    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  return ''
})
</script>

<style>
.v-card-item {
  align-items: end;
  height: 100%;
}

.flipX {
  transform: scaleX(-1);
}
</style>
