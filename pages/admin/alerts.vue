<template>
  <v-row justify="center">
    <v-col cols="12" lg="8">
      <v-card color="primary">
        <v-card-title class="d-flex">
          <v-icon class="mr-2" color="white">mdi-bell</v-icon>
          Alerts
          <admin-alert-modal ref="modal" :refresh="refresh" class="ml-auto" />
        </v-card-title>
        <v-card-text>
          <v-data-table :items="alerts || []" :headers="headers" v-if="lgAndUp">
            <template v-slot:item.active="{ item }">
              <v-checkbox-btn v-model="item.active" disabled></v-checkbox-btn>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn
                icon="mdi-pencil"
                variant="text"
                color="orange"
                @click="edit(item)"
              />
              <v-btn
                icon="mdi-delete"
                variant="text"
                color="red"
                @click="remove(item.id)"
                :loading="removeLoading"
              />
            </template>
          </v-data-table>
          <v-row v-else>
            <v-col cols="12" v-for="alert in alerts">
              <v-card
                :title="alert.title"
                :text="alert.text"
                :subtitle="alert.active ? 'Aktiv' : 'Inaktiv'"
              >
                <v-card-actions>
                  <v-btn
                    icon="mdi-pencil"
                    variant="text"
                    color="orange"
                    @click="edit(alert)"
                  />
                  <v-btn
                    icon="mdi-delete"
                    variant="text"
                    color="red"
                    @click="remove(alert.id)"
                    :loading="removeLoading"
                  />
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify/lib/framework.mjs";

definePageMeta({ layout: "admin", middleware: "auth" });
useSeoMeta({ title: "Admin - Alerts" });

const { lgAndUp } = useDisplay();

const headers = ref([
  { title: "Title", key: "title" },
  { title: "Text", key: "text" },
  { title: "Aktiv", key: "active" },
  { title: "Aktion", key: "actions" },
]);

const { data: alerts, refresh } = await useLazyFetch<
  { id: number; title: string; text: string; active: boolean }[]
>("/api/admin/alerts/all");

const modal = ref();
const removeLoading = ref(false);

function edit(item: any) {
  modal.value.form = item;
  modal.value.open = true;
}

async function remove(id: number) {
  removeLoading.value = true;
  await $fetch(`/api/admin/alerts/remove/${id}`);
  refresh();
  removeLoading.value = false;
}
</script>
