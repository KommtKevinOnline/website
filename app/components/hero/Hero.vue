<template>
  <div class="p-4 md:p-6 flex flex-col gap-2">
    <div class="grid">
      <div class="col-1 row-1">
        <div
          class="h-48 sm:h-[300px] lg:h-[512px] w-full relative overflow-hidden rounded-2xl"
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
          <h1
            class="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black italic text-white drop-shadow-2xl"
            :class="{
              'lg:text-7xl!': props.isOnline,
            }"
          >
            <template v-if="props.isOnline">Kevin ist online!</template>
            <template v-else-if="props.prediction?.eventType === 'live'">
              Ja
            </template>
            <template v-else-if="props.prediction?.eventType === 'offday'">
              Nein
            </template>
            <template v-else>Keine Daten vorhanden</template>
          </h1>
          <h2
            class="text-3xl lg:text-4xl text-center italic text-neutral-200 drop-shadow-2xl"
            v-if="!props.isOnline && props.prediction?.eventType === 'live'"
          >
            Kevin plant um
            {{ useDateFormat(props.prediction?.date, 'HH:mm') }} Uhr online zu
            kommen
            <b class="-ml-1.5">*</b>
          </h2>
        </div>
      </div>
    </div>
    <div v-if="!props.isOnline" class="flex justify-center">
      <h3 class="text-xs md:text-sm text-muted text-center mx-4">
        <b class="-ml-1.5">*</b>
        Die Infos werden von einer KI aus dem Stream analysiert, es kann dabei
        zu Fehlern kommen. Es gibt keine Garantie für die Genauigkeit der Infos.
      </h3>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isOnline: boolean;
  prediction: Prediction;
}>();
</script>
