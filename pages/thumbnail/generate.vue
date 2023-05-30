<template>
  <v-row>
    <v-col cols="12" md="10" lg="4" class="d-flex align-center">
      <v-text-field v-model="url" label="Youtube Video Url" hide-details />
    </v-col>
    <v-col cols="12" md="2" class="d-flex align-center">
      <v-btn color="green" prepend-icon="mdi-upload" @click="handleFileImport"
        >Eigene Datei</v-btn
      >
      <input
        ref="uploader"
        class="d-none"
        type="file"
        @change="onFileChanged"
      />
    </v-col>
  </v-row>
  <v-row v-if="thumbnailUrl !== ''">
    <v-col cols="12" lg="6">
      <h3>Ergebnis</h3>
      <v-img :src="thumbnailUrl" aspect-ratio="16/9">
        <v-img
          :src="`/overlays/${active}.png`"
          class="h-100 w-100"
          :class="flip ? '' : 'flipX'"
        />
      </v-img>
    </v-col>
    <v-col cols="12" lg="6">
      <h3>Presets</h3>
      <v-row>
        <v-col cols="6" md="3" v-for="i in 16">
          <v-card
            :style="`aspect-ratio: 16/9; background-image: url(${thumbnailUrl}); background-size: cover;`"
            @click="active = i"
          >
            <template #image>
              <v-img :class="flip ? '' : 'flipX'" :src="`/overlays/${i}.png`" />
            </template>
            <template #prepend v-if="i === active" class="bg-grey">
              <v-icon
                icon="mdi-check"
                size="large"
                color="light-green-accent-3"
              />
            </template>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row>
    <v-col v-if="thumbnailUrl !== ''" class="d-flex align-center">
      <v-switch
        v-model="flip"
        label="Flip"
        color="green"
        inset
        hide-details
      ></v-switch>
    </v-col>
  </v-row>
  <v-row v-if="thumbnailUrl !== ''">
    <v-col>
      <v-btn
        color="green"
        prepend-icon="mdi-download"
        @click="exportThumbnail"
        :loading="loading"
        >Download</v-btn
      >
      <v-btn color="grey" prepend-icon="mdi-reload" class="ml-2" @click="reset"
        >Reset</v-btn
      >
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useDownload } from "~/composables/useDownload";

useSeoMeta({
  title: "Papaplatte Thumbnail Generator",
  description: "Generiere deine eigenes Papaplatte Thumbnail",
});

const loading = ref<boolean>(false);

const url = ref<string>("");
const active = ref<number>(1);
const flip = ref<boolean>(false);
const selectedFile = ref<File>();
const uploader = ref();

function handleFileImport() {
  uploader.value.click();
}

function onFileChanged(e: Event) {
  reset();
  const files = (e.target as HTMLInputElement).files;

  if (!files) {
    throw new Error("No file selected");
  }

  selectedFile.value = files[0];
}

function reset() {
  url.value = "";
  selectedFile.value = undefined;
  active.value = 1;
  flip.value = false;
}

async function exportThumbnail() {
  try {
    loading.value = true;

    const form = new FormData();

    form.append("overlayId", active.value.toString());
    form.append("flipX", (!flip.value).toString());

    if (selectedFile.value) {
      form.append("file", selectedFile.value);
    } else {
      form.append("originalThumbnail", thumbnailUrl.value);
    }

    const thumbnail = await $fetch<Blob>(`/api/thumbnail/generate`, {
      method: "POST",
      body: form,
    });

    useDownload(thumbnail);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

const thumbnailUrl = computed(() => {
  if (url.value && url.value !== "") {
    if (!url.value.includes("https://www.youtube.com/watch?v=")) {
      return "";
    }
    const videoId = new URL(url.value).searchParams.get("v");

    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }

  if (selectedFile.value) {
    return URL.createObjectURL(selectedFile.value);
  }

  return "";
});
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
