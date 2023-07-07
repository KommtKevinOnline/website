<template>
  <v-menu v-model="open" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-btn color="green" prepend-icon="mdi-plus" v-bind="props" style="margin-left: auto;">
        Create
      </v-btn>
    </template>
    <v-date-picker v-model:model-value="date" color="green" @click:cancel="open = false" @click:save="save" />
  </v-menu>
</template>

<script setup lang="ts">
const emit = defineEmits(['refresh'])

const open = ref<boolean>(false)
const date = ref<Date[]>()

function save() {
  // Why nextTick? Because the model-value update happens before the click:save event is emitted
  nextTick(async () => {
    if (date.value) {
      await $fetch('/api/admin/upcoming/create', {
        method: 'POST',
        body: JSON.stringify({ date: date.value[0] }),
      })
    }

    open.value = false
    emit('refresh')
  })
}
</script>