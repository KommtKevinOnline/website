<template>
  <div
    class="px-3 py-2 -mx-2 last:-mb-2 rounded-md flex items-center gap-3 relative"
  >
    <UAvatar
      :src="editor.avatar || undefined"
      :alt="editor.displayName ?? editor.login"
      size="md"
    />

    <div class="text-md flex-1">
      <p class="text-neutral-900 dark:text-white font-medium">
        {{ editor.displayName || editor.login }}
      </p>
      <p v-if="editor.addedBy" class="text-xs text-muted">
        hinzugefügt von {{ editor.addedBy }}
      </p>
    </div>

    <UTooltip text="Entfernen">
      <UButton
        @click="emit('remove')"
        :loading="loading"
        icon="i-lucide-x"
        variant="ghost"
        color="error"
      />
    </UTooltip>
  </div>
</template>

<script lang="ts" setup>
interface Editor {
  twitchUserId: string;
  login: string;
  displayName: string | null;
  avatar: string | null;
  addedBy: string | null;
}

defineProps<{ editor: Editor; loading: boolean }>();

const emit = defineEmits(['remove']);
</script>
