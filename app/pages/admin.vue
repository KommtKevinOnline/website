<template>
  <UContainer class="mt-8 mb-16">
    <UCard v-if="!loggedIn" class="max-w-md mx-auto text-center">
      <template #header>
        <h1 class="text-2xl font-bold">Admin</h1>
      </template>

      <UButton
        color="primary"
        icon="i-simple-icons-twitch"
        to="/auth/twitch"
        external
      >
        Mit Twitch anmelden
      </UButton>
    </UCard>

    <div v-else-if="me" class="flex flex-col gap-6">
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold">Admin</h1>

        <div class="flex items-center gap-3">
          <UAvatar :src="user?.avatar" :alt="user?.displayName" size="sm" />
          <span class="font-medium">{{ user?.displayName }}</span>
          <UBadge v-if="me.isOwner" color="warning" variant="subtle">
            Owner
          </UBadge>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-log-out"
            @click="logout"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UCard class="lg:col-span-2">
          <template #header>
            <div class="flex justify-between">
              <h2 class="text-2xl font-bold flex items-center gap-2">
                <UIcon name="i-lucide-calendar-clock" />
                Vorhersagen
              </h2>
              <AdminPredictionModal
                title="Vorhersage hinzufügen"
                @save="refreshPredictions"
              >
                <template #activator="{ props: activatorProps }">
                  <UButton
                    icon="i-lucide-circle-plus"
                    variant="ghost"
                    color="success"
                    @click="activatorProps.onClick()"
                  />
                </template>
              </AdminPredictionModal>
            </div>
          </template>

          <div v-if="predictions?.length" class="flex flex-col gap-1">
            <AdminPredictionModal @save="refreshPredictions">
              <template #activator="{ props: activatorProps }">
              <div
                v-for="prediction in predictions"
                :key="prediction.id"
                class="px-3 py-2 -mx-2 rounded-md flex items-center gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-800"
              >
                <UBadge
                  :color="prediction.eventType === 'live' ? 'success' : 'error'"
                  variant="subtle"
                  class="w-16 justify-center"
                >
                  {{ prediction.eventType === 'live' ? 'Ja' : 'Nein' }}
                </UBadge>

                <div class="flex-1 min-w-0">
                  <p class="font-medium">
                    {{ formatDay(prediction.date) }}
                    <template v-if="prediction.eventType === 'live'">
                      um {{ formatTime(prediction.date) }} Uhr
                    </template>
                  </p>
                  <p v-if="prediction.topic" class="text-sm text-muted">
                    {{ prediction.topic }}
                  </p>
                  <p
                    v-if="prediction.quote"
                    class="text-sm text-muted italic truncate"
                  >
                    „{{ prediction.quote }}“
                  </p>
                </div>

                <UBadge
                  v-if="prediction.confidence != null"
                  :color="confidenceColor(prediction.confidence)"
                  variant="subtle"
                >
                  {{ Math.round(prediction.confidence * 100) }}%
                </UBadge>

                <UTooltip
                  v-if="prediction.source === 'twitch' && prediction.quoteStart != null"
                  text="Ansage im VOD anhören"
                >
                  <UButton
                    :to="`https://www.twitch.tv/videos/${prediction.clipId}?t=${twitchTimestamp(prediction.quoteStart)}`"
                    target="_blank"
                    icon="i-lucide-headphones"
                    variant="ghost"
                    color="primary"
                  />
                </UTooltip>

                <UBadge color="neutral" variant="outline">
                  {{ prediction.source ?? 'twitch' }}
                </UBadge>

                <UTooltip text="Bearbeiten">
                  <UButton
                    icon="i-lucide-pencil"
                    variant="ghost"
                    color="info"
                    @click="activatorProps.onClick(prediction)"
                  />
                </UTooltip>

                <UTooltip text="Löschen">
                  <UButton
                    icon="i-lucide-x"
                    variant="ghost"
                    color="error"
                    :loading="loading.deletePrediction === prediction.id"
                    @click="removePrediction(prediction.id)"
                  />
                </UTooltip>
              </div>
              </template>
            </AdminPredictionModal>
          </div>

          <p v-else class="text-muted">Keine Vorhersagen vorhanden.</p>
        </UCard>

        <UCard>
          <template #header>
            <h2 class="text-2xl font-bold flex items-center gap-2">
              <UIcon name="i-lucide-megaphone" />
              Alerts
            </h2>
          </template>

          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <UInput
                v-model="newAlert.title"
                placeholder="Titel (optional)"
              />
              <UTextarea
                v-model="newAlert.text"
                placeholder="Text des Alerts"
                :rows="2"
              />
              <UButton
                color="success"
                icon="i-lucide-circle-plus"
                :disabled="!newAlert.text"
                :loading="loading.addAlert"
                @click="addAlert"
                block
              >
                Alert erstellen
              </UButton>
            </div>

            <USeparator v-if="alerts?.length" />

            <div
              v-for="alert in alerts"
              :key="alert.id"
              class="flex items-center gap-3"
            >
              <USwitch
                :model-value="alert.active ?? false"
                @update:model-value="toggleAlert(alert.id, $event)"
              />

              <div class="flex-1 min-w-0">
                <p v-if="alert.title" class="font-medium truncate">
                  {{ alert.title }}
                </p>
                <p class="text-sm text-muted truncate">{{ alert.text }}</p>
              </div>

              <UButton
                icon="i-lucide-x"
                variant="ghost"
                color="error"
                :loading="loading.deleteAlert === alert.id"
                @click="removeAlert(alert.id)"
              />
            </div>
          </div>
        </UCard>

        <UCard v-if="me.isOwner">
          <template #header>
            <div class="flex justify-between">
              <h2 class="text-2xl font-bold flex items-center gap-2">
                <UIcon name="i-lucide-users" />
                Mods
              </h2>
              <AdminEditorModal @save="refreshEditors">
                <template #activator="{ props: activatorProps }">
                  <UButton
                    v-bind="activatorProps"
                    icon="i-lucide-circle-plus"
                    variant="ghost"
                    color="success"
                  />
                </template>
              </AdminEditorModal>
            </div>
          </template>

          <div v-if="editors?.length" class="flex flex-col gap-2">
            <AdminEditorListItem
              v-for="editor in editors"
              :key="editor.twitchUserId"
              :editor="editor"
              :loading="loading.deleteEditor === editor.twitchUserId"
              @remove="removeEditor(editor.twitchUserId)"
            />
          </div>

          <p v-else class="text-muted">
            Noch keine Mods. Füge Mods hinzu, damit sie Vorhersagen bearbeiten
            können.
          </p>
        </UCard>
      </div>
    </div>
  </UContainer>
</template>

<script lang="ts" setup>
const { loggedIn, user, clear } = useUserSession();

const toast = useToast();

const { data: me } = await useFetch('/api/admin/me');

// Logged in but not owner/mod: straight back to the homepage
if (loggedIn.value && !me.value) {
  await navigateTo('/');
}

const { data: predictions, refresh: refreshPredictions } = await useFetch(
  '/api/admin/predictions',
  { immediate: !!me.value }
);

const { data: alerts, refresh: refreshAlerts } = await useFetch(
  '/api/admin/alerts',
  { immediate: !!me.value }
);

const { data: editors, refresh: refreshEditors } = await useFetch(
  '/api/admin/editors',
  { immediate: !!me.value && me.value.isOwner }
);

const loading = reactive({
  deletePrediction: 0,
  addAlert: false,
  deleteAlert: 0,
  deleteEditor: '',
});

const newAlert = reactive({
  title: '',
  text: '',
});

function formatDay(date: string | null) {
  if (!date) return '—';
  return useDateFormat(date, 'dddd, DD.MM.YYYY', { locales: 'de-DE' }).value;
}

function formatTime(date: string | null) {
  if (!date) return '—';
  return useDateFormat(date, 'HH:mm').value;
}

function confidenceColor(confidence: number) {
  if (confidence >= 0.75) return 'success';
  if (confidence >= 0.5) return 'warning';
  return 'error';
}

function twitchTimestamp(seconds: number) {
  const total = Math.max(0, Math.floor(seconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  return `${h}h${m}m${s}s`;
}

async function logout() {
  await clear();
  await navigateTo('/');
}

async function removePrediction(id: number) {
  loading.deletePrediction = id;

  try {
    await $fetch(`/api/admin/predictions/${id}`, { method: 'DELETE' });
    refreshPredictions();
  } catch (error) {
    toast.add({
      title: 'Fehler beim Löschen',
      description: (error as Error).message,
      color: 'error',
      icon: 'i-lucide-circle-x',
    });
  } finally {
    loading.deletePrediction = 0;
  }
}

async function addAlert() {
  loading.addAlert = true;

  try {
    await $fetch('/api/admin/alerts', {
      method: 'POST',
      body: { ...newAlert, active: true },
    });

    newAlert.title = '';
    newAlert.text = '';
    refreshAlerts();
  } catch (error) {
    toast.add({
      title: 'Fehler beim Erstellen des Alerts',
      description: (error as Error).message,
      color: 'error',
      icon: 'i-lucide-circle-x',
    });
  } finally {
    loading.addAlert = false;
  }
}

async function toggleAlert(id: number, active: boolean) {
  try {
    await $fetch(`/api/admin/alerts/${id}`, {
      method: 'PATCH',
      body: { active },
    });
    refreshAlerts();
  } catch (error) {
    toast.add({
      title: 'Fehler beim Aktualisieren des Alerts',
      description: (error as Error).message,
      color: 'error',
      icon: 'i-lucide-circle-x',
    });
  }
}

async function removeAlert(id: number) {
  loading.deleteAlert = id;

  try {
    await $fetch(`/api/admin/alerts/${id}`, { method: 'DELETE' });
    refreshAlerts();
  } catch (error) {
    toast.add({
      title: 'Fehler beim Löschen des Alerts',
      description: (error as Error).message,
      color: 'error',
      icon: 'i-lucide-circle-x',
    });
  } finally {
    loading.deleteAlert = 0;
  }
}

async function removeEditor(id: string) {
  loading.deleteEditor = id;

  try {
    await $fetch(`/api/admin/editors/${id}`, { method: 'DELETE' });
    refreshEditors();
  } catch (error) {
    toast.add({
      title: 'Fehler beim Entfernen des Mods',
      description: (error as Error).message,
      color: 'error',
      icon: 'i-lucide-circle-x',
    });
  } finally {
    loading.deleteEditor = '';
  }
}

useSeoMeta({ title: 'Admin — KommtKevinOnline?' });
</script>
