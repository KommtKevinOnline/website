<template>
  <slot name="activator" :props="{ onClick }" />

  <UModal v-model:open="isOpen" :title="title">
    <template #body>
      <div class="flex flex-col gap-4">
        <UFormField name="day" label="Tag" required :ui="{ container: '' }">
          <UInput class="w-full" v-model="state.day" type="date" size="md" />
        </UFormField>

        <UFormField
          name="eventType"
          label="Kommt Kevin online?"
          required
          :ui="{ container: '' }"
        >
          <URadioGroup
            v-model="state.eventType"
            orientation="horizontal"
            :items="[
              { label: 'Ja (live)', value: 'live' },
              { label: 'Nein (offday)', value: 'offday' },
            ]"
          />
        </UFormField>

        <UFormField
          v-if="state.eventType === 'live'"
          name="time"
          label="Uhrzeit"
          required
          :ui="{ container: '' }"
        >
          <UInput class="w-full" v-model="state.time" type="time" size="md" />
        </UFormField>

        <UFormField
          v-if="state.eventType === 'live'"
          name="topic"
          label="Thema (optional)"
          :ui="{ container: '' }"
        >
          <UInput
            class="w-full"
            v-model="state.topic"
            placeholder="Minecraft mit Reved"
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
          :disabled="!state.day"
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
interface PredictionLike {
  date: string | null;
  eventType: string | null;
  topic: string | null;
}

const props = defineProps<{
  title?: string;
}>();

const title = computed(() => props.title ?? 'Vorhersage bearbeiten');

const toast = useToast();

const isOpen = ref(false);

const emit = defineEmits(['save']);

const state = reactive({
  day: '',
  time: '15:00',
  eventType: 'live' as 'live' | 'offday',
  topic: '',
});

const saveLoading = ref(false);

function onClick(prediction?: PredictionLike) {
  if (prediction?.date) {
    const date = new Date(prediction.date);
    state.day = useDateFormat(date, 'YYYY-MM-DD').value;
    state.time = useDateFormat(date, 'HH:mm').value;
    state.eventType = prediction.eventType === 'offday' ? 'offday' : 'live';
    state.topic = prediction.topic ?? '';
  } else {
    state.day = useDateFormat(new Date(), 'YYYY-MM-DD').value;
    state.time = '15:00';
    state.eventType = 'live';
    state.topic = '';
  }

  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

async function save() {
  saveLoading.value = true;

  try {
    await $fetch('/api/admin/predictions', {
      method: 'POST',
      body: {
        day: state.day,
        time: state.time,
        eventType: state.eventType,
        topic: state.eventType === 'live' ? state.topic : '',
      },
    });

    toast.add({
      title: 'Vorhersage gespeichert',
      color: 'success',
      icon: 'i-lucide-circle-check',
    });

    isOpen.value = false;

    emit('save');
  } catch (error) {
    toast.add({
      title: 'Fehler beim Speichern der Vorhersage',
      description: (error as Error).message,
      color: 'error',
      icon: 'i-lucide-circle-x',
    });
  } finally {
    saveLoading.value = false;
  }
}
</script>
