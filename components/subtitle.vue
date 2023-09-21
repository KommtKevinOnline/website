<template>
  <h3 :class="{ msg: true, active: activeText === index }" v-for="(msg, index) in messages">
    {{ msg }}
  </h3>
</template>

<script setup>
import { onMounted } from 'vue'
import { ref, computed } from 'vue'

const activeText = ref(0)

onMounted(() => {
  setInterval(() => {
    if (activeText.value + 1 >= messages.value.length) {
      activeText.value = 0
    }

    activeText.value += 1
  }, 1500)
})

const messages = computed(() => {
  return `Channel ist auch nicht mehr so weit weg. Bro crazy. Freunde, falls ihr
        den Rection Channel noch nicht abgelehnt habt, rein da. Rein in die
        Masse. Freunde, ich wünsche euch einen wundervollen Abend. Danke fürs
        Einschalten.
        Vielen Dank für den Support und äh danke für eure. Wir sehen uns morgen
        wieder. 15 Uhr wie immer Kann ich irgendwas für morgen hinnouncen? Ich
        weiß nicht genau, was morgen abgeht, um ehrlich zu sein.`.split('. ')
})
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
