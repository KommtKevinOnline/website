<template>
  <h3 :class="{ msg: true, active: activeText === index }" class="d-flex flex-column" v-for="(segment, index) in segments.filter(segment => time > segment.start && time < segment.end)">
    <!-- <span>start: {{ segment.start }}</span>
    <span>end:   {{ segment.end }}</span>
    <span>gts:   {{ time > segment.start }}</span>
    <span>gte:   {{ time < segment.end }}</span> -->
    <span>{{ segment.text }}</span>
  </h3>
</template>

<script setup lang="ts">
import { Vod } from '../types/Vod'

const props = defineProps<{ vod: Vod, time: number, duration: number }>();

const activeText = ref(0)

onMounted(() => {
  // setInterval(() => {
  //   if (activeText.value + 1 >= segments.value.length) {
  //     activeText.value = 0
  //   }

  //   activeText.value += 1
  // }, 1500)
})

const segments = computed(() => props.vod.transcript.segments.map(segment => {
  return {
    ...segment,
    start: segment.start + props.duration,
    end: segment.end + props.duration
  }
}))
</script>

<style scoped>
.msg {
  opacity: 50%;
  transition: all 250ms ease-in-out;
}

.active {
  opacity: 100%;
  font-size: 130%;
}

.msg:hover {
  opacity: 100%;
}
</style>
