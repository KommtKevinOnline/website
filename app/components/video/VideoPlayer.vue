<template>
  <div class="relative">
    <div class="border-gradient rounded-xl">
      <div
        class="aspect-w-16 aspect-h-9 rounded-lg relative overflow-hidden border border-gray-950/10 dark:border-white/10"
      >
        <div id="player" class="w-full aspect-video"></div>
        <VideoSubtitle :vod="vod" :time="currentTime" />
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
const TWITCH_EMBED_SRC = 'https://player.twitch.tv/js/embed/v1.js';

// useHead-injected scripts load async and can lose the race against
// onMounted, so the player script is loaded and awaited explicitly.
function loadTwitchScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    if (window.Twitch?.Player) {
      return resolve();
    }

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${TWITCH_EMBED_SRC}"]`
    );

    if (!script) {
      script = document.createElement('script');
      script.src = TWITCH_EMBED_SRC;
      document.head.appendChild(script);
    }

    script.addEventListener('load', () => resolve());
    script.addEventListener('error', () =>
      reject(new Error('Failed to load Twitch player script'))
    );
  });
}

const props = defineProps<{ vod: Vod }>();

const currentTime = ref(0);

const player = ref<any>(null);

const icon = ref('i-heroicons-speaker-x-mark-20-solid');

function toggleMute() {
  if (!player.value) return;

  if (player.value.getMuted()) {
    player.value.setMuted(false);
    icon.value = 'i-heroicons-speaker-wave-20-solid';
  } else {
    player.value.setMuted(true);
    icon.value = 'i-heroicons-speaker-x-mark-20-solid';
  }
}

onMounted(async () => {
  try {
    await loadTwitchScript();
  } catch (error) {
    console.error(error);
    return;
  }

  const options = {
    width: '100%',
    height: '100%',
    video: props.vod.vodid,
    parent: [window.location.hostname],
    autoplay: true,
    muted: true,
    time: props.vod.duration,
  };
  // @ts-ignore
  player.value = new Twitch.Player('player', options);

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
