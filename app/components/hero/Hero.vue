<template>
  <div class="p-4 md:p-6 flex flex-col gap-2">
    <div class="grid">
      <div class="col-1 row-1">
        <div
          class="h-[400px] md:h-[512px] w-full relative overflow-hidden rounded-2xl"
        >
          <HeroBackgroundSilk
            :speed="4"
            :scale="0.8"
            :color="'#42E695'"
            :noise-intensity="1.2"
            :rotation="1.2"
            class="rounded-2xl h-96"
            background-color="white"
          />
        </div>
      </div>
      <div class="col-1 row-1 z-10">
        <div class="flex flex-col items-center justify-center h-full">
          <h1 class="text-9xl font-black italic text-white drop-shadow-2xl">
            Ja
          </h1>
          <h2 class="text-2xl text-center italic text-white drop-shadow-2xl">
            Kevin plant um 17:00 online zu kommen
            <b class="-ml-1.5">*</b>
          </h2>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <h3 class="text-xs md:text-sm text-muted text-center mx-4">
        <b class="-ml-1.5">*</b>
        Die Infos werden von einer KI aus dem Stream analysiert, es kann dabei
        zu Fehlern kommen. Es gibt keine Garantie für die Genauigkeit der Infos.
      </h3>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
