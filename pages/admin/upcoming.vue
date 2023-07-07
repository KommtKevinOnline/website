<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-card color="primary">
        <v-card-title class="d-flex">
          <v-icon class="mr-2" color="white">mdi-calendar</v-icon>
          Upcoming Streams
          <admin-upcoming-date-picker @refresh="refresh" />
        </v-card-title>
        <v-card-text>
          <v-data-table :items="upcoming || []" :headers="headers">
            <template v-slot:item.date="{ item }">
              {{ new Date(item.raw.date).toLocaleString('de-DE') }}
            </template>
            <template v-slot:item.actions="{ item }">
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
useSeoMeta({ title: 'Admin - Upcoming Streams' })

// any is used because the type of the headers prop seems to be broken (v-data-table is currenlty in labs)
const headers = ref<any>([
  { title: 'Id', key: 'id' },
  { title: 'Date', key: 'date' },
  { title: 'Aktion', key: 'actions', align: 'end' },
])

const { data: upcoming, refresh } = await useLazyFetch<{ date: Date }[]>('/api/admin/upcoming/all');

const removeLoading = ref(false)

async function remove(id: number) {
  removeLoading.value = true
  await fetch(`/api/admin/upcoming/remove/${id}`)
  refresh()
  removeLoading.value = false
}
</script>