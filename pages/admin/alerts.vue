<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-card color="primary">
        <v-card-title class="d-flex">
          Alerts
          <admin-alert-modal ref="modal" :refresh="refresh" class="ml-auto" />
        </v-card-title>
        <v-card-text>
          <v-data-table :items="alerts || []" :headers="headers">
            <template v-slot:item.active="{ item }">
              <v-checkbox-btn v-model="item.columns.active" disabled></v-checkbox-btn>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn icon="mdi-pencil" variant="text" color="orange" @click="edit(item.raw)" />
              <v-btn icon="mdi-delete" variant="text" color="red" @click="remove(item.raw.id)" :loading="removeLoading" />
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })
useSeoMeta({ title: 'Admin - Alerts' })

const headers = ref([
  { title: 'Id', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'Text', key: 'text' },
  { title: 'Aktiv', key: 'active' },
  { title: 'Aktion', key: 'actions' },
])

const { data: alerts, refresh } = await useLazyFetch('/api/admin/alerts/all');

const modal = ref()
const removeLoading = ref(false)

function edit(item: typeof alerts) {
  modal.value.form = item
  modal.value.open = true
}

async function remove(id: number) {
  removeLoading.value = true
  await fetch(`/api/alerts/remove/${id}`)
  refresh()
  removeLoading.value = false
}
</script>