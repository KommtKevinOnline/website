<template>
  <slot name="activator" :props="{ onClick }" />

  <UModal v-model:open="isOpen" title="Mod hinzufügen">
    <template #body>
      <div class="flex flex-col gap-4">
        <UFormField
          name="name"
          label="Twitch Name"
          required
          :ui="{ container: '' }"
        >
          <UInput
            class="w-full"
            v-model="state.name"
            placeholder="Papaplatte"
            autocomplete="off"
            icon="i-lucide-user"
            size="md"
          />
        </UFormField>
      </div>
    </template>

    <template #footer>
      <div class="flex w-full justify-end gap-2">
        <UButton color="neutral" variant="subtle" @click="close">
          Abbrechen
        </UButton>
        <UButton
          color="success"
          :loading="saveLoading"
          @click="save"
          icon="i-lucide-check"
        >
          Speichern
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const toast = useToast();

const isOpen = ref(false);

const emit = defineEmits(['save']);

const state = reactive({
  name: '',
});

const saveLoading = ref(false);

function onClick() {
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

async function save() {
  saveLoading.value = true;

  try {
    await $fetch('/api/admin/editors', {
      method: 'POST',
      body: {
        name: state.name,
      },
    });

    toast.add({
      title: 'Mod hinzugefügt',
      color: 'success',
      icon: 'i-lucide-circle-check',
    });

    isOpen.value = false;
    state.name = '';

    emit('save');
  } catch (error) {
    toast.add({
      title: 'Fehler beim Hinzufügen des Mods',
      description: (error as Error).message,
      color: 'error',
      icon: 'i-lucide-circle-x',
    });
  } finally {
    saveLoading.value = false;
  }
}
</script>
