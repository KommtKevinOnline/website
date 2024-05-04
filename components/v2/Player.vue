<template>
  <div class="relative">
    <div class="bg-background border-gradient rounded-xl p-4">
      <div
        class="aspect-w-16 aspect-h-9 rounded-lg relative overflow-hidden border border-gray-950/10 dark:border-white/10"
      >
        <div id="player" class="w-full aspect-video"></div>
        <v2-subtitle :vod="vod" :time="currentTime" />
      </div>
      <div class="mt-2 flex justify-center md:hidden">
        <UButton color="primary" size="xl" @click="toggleMute">
          <UIcon :name="icon" />
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { vods } from "../../db/schema";

useHead({
  script: [
    {
      src: "https://player.twitch.tv/js/embed/v1.js",
    },
  ],
});

const props = defineProps<{ vod: typeof vods.$inferSelect }>();

const currentTime = ref(0);

const player = ref<any>(null);

const icon = ref("i-heroicons-speaker-x-mark-20-solid");

function toggleMute() {
  if (!player.value) return;

  if (player.value.getMuted()) {
    player.value.setMuted(false);
    icon.value = "i-heroicons-speaker-wave-20-solid";
  } else {
    player.value.setMuted(true);
    icon.value = "i-heroicons-speaker-x-mark-20-solid";
  }
}

onMounted(() => {
  const options = {
    width: "100%",
    height: "100%",
    video: props.vod.vodid,
    parent: ["localhost"],
    autoplay: true,
    muted: true,
    time: props.vod.duration,
  };
  // @ts-ignore
  player.value = new Twitch.Player("player", options);

  // @ts-ignore
  player.value.addEventListener(Twitch.Player.READY, () => {
    setInterval(() => {
      currentTime.value = player.value.getCurrentTime();
    }, 400);
  });
});
</script>

<style scoped>
iframe {
  border: none;
}
</style>
