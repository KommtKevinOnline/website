<template>
  <div class="text-center">
    <v-dialog v-model="open">
      <template v-slot:activator="{ props }">
        <v-btn color="green" prepend-icon="mdi-plus" v-bind="props">
          Create
        </v-btn>
      </template>

      <v-card>
        <v-card-text>
          <v-text-field
            v-model="form.title"
            label="Title"
            required
          ></v-text-field>
          <v-textarea v-model="form.text" label="Text" required></v-textarea>
          <v-checkbox v-model="form.active" label="Aktiv" required></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-btn color="grey" @click="close" class="ml-auto">Abbrechen</v-btn>
          <v-btn color="green" @click="save" :loading="loading"
            >Speichern</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ refresh: Function }>();

const defaultForm = {
  id: -1,
  title: "",
  text: "",
  active: false,
};

const loading = ref(false);
const open = ref(false);
const form = ref(defaultForm);

function close() {
  open.value = false;
  form.value = defaultForm;
}

async function save() {
  loading.value = true;
  if (form.value.id === -1) {
    await $fetch("/api/admin/alerts/create", {
      method: "POST",
      body: form.value,
    });
  } else {
    await $fetch("/api/admin/alerts/update", {
      method: "PATCH",
      body: form.value,
    });
  }

  close();
  loading.value = false;
  props.refresh();
}

defineExpose({ open, form });
</script>
