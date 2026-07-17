<template>
  <UContainer class="mt-8 mb-16">
    <UPageSection
      title="Statistiken"
      description="Wie zuverlässig sind Kevins Ansagen? Vergleich zwischen vorhergesagter und tatsächlicher Startzeit."
    >
      <div v-if="stats" class="flex flex-col gap-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <UCard>
            <p class="text-xs text-muted uppercase mb-1.5">
              Erfasste Streams
            </p>
            <p class="text-3xl text-highlighted font-semibold">
              {{ stats.totalStreams }}
            </p>
          </UCard>

          <UCard>
            <p class="text-xs text-muted uppercase mb-1.5">Trefferquote</p>
            <p class="text-3xl text-highlighted font-semibold">
              {{ stats.hitRate != null ? `${stats.hitRate}%` : '—' }}
            </p>
            <p class="text-xs text-muted mt-1">
              Vorhersagen mit tatsächlichem Stream
            </p>
          </UCard>

          <UCard>
            <p class="text-xs text-muted uppercase mb-1.5">
              Ø Verspätung
            </p>
            <p class="text-3xl text-highlighted font-semibold">
              {{ formatDelay(stats.avgDelayMinutes) }}
            </p>
          </UCard>

          <UCard>
            <p class="text-xs text-muted uppercase mb-1.5">Pünktlich</p>
            <p class="text-3xl text-highlighted font-semibold">
              {{ stats.onTimeRate != null ? `${stats.onTimeRate}%` : '—' }}
            </p>
            <p class="text-xs text-muted mt-1">±15 Minuten</p>
          </UCard>
        </div>

        <UCard v-if="stats.recent.length">
          <template #header>
            <h2 class="text-2xl font-bold">Letzte Vorhersagen</h2>
          </template>

          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="text-left text-muted border-b border-default">
                  <th class="py-2 pr-4">Tag</th>
                  <th class="py-2 pr-4">Angesagt</th>
                  <th class="py-2 pr-4">Tatsächlich</th>
                  <th class="py-2">Verspätung</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="entry in stats.recent"
                  :key="entry.day"
                  class="border-b border-default last:border-0"
                >
                  <td class="py-2 pr-4 font-medium">
                    {{ formatDay(entry.day) }}
                  </td>
                  <td class="py-2 pr-4">
                    {{
                      entry.predictedAt
                        ? useDateFormat(entry.predictedAt, 'HH:mm').value
                        : '—'
                    }}
                  </td>
                  <td class="py-2 pr-4">
                    {{
                      entry.actualStart
                        ? useDateFormat(entry.actualStart, 'HH:mm').value
                        : 'kein Stream erfasst'
                    }}
                  </td>
                  <td class="py-2">
                    <UBadge
                      v-if="entry.delayMinutes !== null"
                      :color="delayColor(entry.delayMinutes)"
                      variant="subtle"
                    >
                      {{ formatDelay(entry.delayMinutes) }}
                    </UBadge>
                    <span v-else class="text-muted">—</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </UCard>

        <UAlert
          v-else
          icon="i-lucide-info"
          color="neutral"
          variant="subtle"
          title="Noch keine Daten"
          description="Sobald Streams und Vorhersagen zusammenkommen, entstehen hier die Statistiken."
        />
      </div>
    </UPageSection>
  </UContainer>
</template>

<script lang="ts" setup>
const { data: stats } = await useFetch('/api/stats');

function formatDay(day: string) {
  return useDateFormat(day, 'DD.MM.YYYY').value;
}

function formatDelay(minutes: number | null) {
  if (minutes === null) {
    return '—';
  }

  const abs = Math.abs(minutes);
  const label =
    abs >= 60 ? `${Math.floor(abs / 60)} Std. ${abs % 60} Min.` : `${abs} Min.`;

  if (minutes > 0) {
    return `+${label}`;
  }

  if (minutes < 0) {
    return `-${label}`;
  }

  return 'pünktlich';
}

function delayColor(minutes: number) {
  const abs = Math.abs(minutes);

  if (abs <= 15) return 'success';
  if (abs <= 60) return 'warning';
  return 'error';
}

useSeoMeta({
  title: 'Statistiken — KommtKevinOnline?',
  description:
    'Wie zuverlässig sind Kevins Stream-Ansagen? Trefferquote und Pünktlichkeit.',
});
</script>
