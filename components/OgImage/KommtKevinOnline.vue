<template>
  <div class="w-full h-full flex flex-col justify-center bg-[#E5FAEF]">
    <div class="flex flex-col items-center p-24">
      <img src="../../assets/KommtKevinOnline.svg" />
      <div class="mt-14"></div>
      <h2 class="my-0 text-[12rem] font-extrabold text-[#333333]">
        {{ onlineIntend ? "JA" : "NEIN" }}
      </h2>
      <p class="text-4xl font-bold text-[#9b9b9b]">{{ date }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{ onlineIntend?: boolean; title?: string }>(),
  {
    title: "KommtKevinOnline?",
    onlineIntend: false,
  }
);

const date = computed(() => new Date().toLocaleDateString("de-DE"));
</script>
