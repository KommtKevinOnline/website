<template>
  <UContainer class="py-4 md:py-6 flex flex-col gap-2">
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
            <template v-else-if="props.predictionData?.hasStreamedToday">
              Heute war schon Stream
            </template>
            <template v-else-if="todayPrediction?.eventType === 'live'">
              Ja
            </template>
            <template v-else-if="todayPrediction?.eventType === 'offday'">
              Nein
            </template>
            <div v-else class="text-center lg:text-7xl">
              Keine Daten vorhanden
            </div>
          </h1>
          <h2
            class="text-3xl lg:text-4xl text-center italic text-neutral-200 drop-shadow-2xl"
            v-if="showTodayInfo"
          >
            <template v-if="todayTimeIsFirm">
              Kevin plant um
              {{ useDateFormat(todayPrediction!.date, 'HH:mm') }} Uhr online zu
              kommen
            </template>
            <template v-else>
              Kevin kommt voraussichtlich gegen
              {{ useDateFormat(todayPrediction!.date, 'HH:mm') }} Uhr online
            </template>
            <b class="-ml-1.5">*</b>
          </h2>
          <h2
            v-if="showTodayInfo && countdownLabel"
            class="text-xl lg:text-2xl text-center italic text-neutral-200 drop-shadow-2xl mt-1"
          >
            Noch {{ countdownLabel }}
          </h2>
          <h2
            v-if="showTodayInfo && todayPrediction?.topic"
            class="text-xl lg:text-2xl text-center italic text-neutral-200 drop-shadow-2xl mt-1"
          >
            Geplant: {{ todayPrediction.topic }}
            <b class="-ml-1.5">*</b>
          </h2>
          <h2
            v-if="showNextLiveInfo"
            class="text-xl lg:text-3xl text-center italic text-neutral-200 drop-shadow-2xl mt-1"
          >
            Nächster Stream voraussichtlich am
            {{ nextLiveDateLabel }}
            Uhr
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
  </UContainer>
</template>

<script lang="ts" setup>
import type { TodayPredictionResponse } from '~~/shared/types/Prediction';

const props = defineProps<{
  isOnline: boolean;
  predictionData: TodayPredictionResponse | null;
}>();

const todayPrediction = computed(() => props.predictionData?.prediction);
const nextLivePrediction = computed(
  () => props.predictionData?.nextLivePrediction
);

const showTodayInfo = computed(() => {
  return (
    !props.isOnline
    && !props.predictionData?.hasStreamedToday
    && todayPrediction.value?.eventType === 'live'
  );
});

// An explicitly announced time gets high confidence from the engine
// (>= 0.85); default-time predictions and old rows (null) read softer.
const todayTimeIsFirm = computed(() => {
  const confidence = todayPrediction.value?.confidence;
  return confidence != null && confidence >= 0.85;
});

const now = useNow({ interval: 1000 });

const countdownLabel = computed(() => {
  if (!todayPrediction.value?.date) {
    return '';
  }

  const diffMs =
    new Date(todayPrediction.value.date).getTime() - now.value.getTime();

  if (diffMs <= 0) {
    return '';
  }

  const totalMinutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours} Std. ${minutes} Min.`;
  }

  return `${minutes} Min.`;
});

const nextLiveDateLabel = computed(() => {
  if (!nextLivePrediction.value?.date) {
    return '';
  }

  return useDateFormat(nextLivePrediction.value.date, 'DD.MM.YYYY [um] HH:mm')
    .value;
});

const showNextLiveInfo = computed(() => {
  if (props.isOnline || !nextLivePrediction.value) {
    return false;
  }

  return (
    props.predictionData?.hasStreamedToday
    || todayPrediction.value?.eventType === 'offday'
    || !todayPrediction.value
  );
});
</script>
