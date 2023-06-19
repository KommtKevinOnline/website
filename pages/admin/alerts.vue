<template>
  <v-row justify="center">
    <v-col cols="8">
      <v-card color="primary">
        <v-card-title class="d-flex">
          Alerts
          <v-btn class="ml-auto" color="green" prepend-icon="mdi-plus">Create</v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table :items="alerts" :headers="headers">
            <template v-slot:item.disabled="{ item }">
              <v-checkbox-btn
                v-model="item.columns.disabled"
                disabled
              ></v-checkbox-btn>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const headers = ref([
  { title: 'Id', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'Text', key: 'text' },
  { title: 'Disabled', key: 'disabled' },
])

const { data: alerts } = await useLazyFetch('/api/alerts/all');
</script>