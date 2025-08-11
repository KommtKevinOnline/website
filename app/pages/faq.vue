<template>
  <div>
    <UPageSection title="FAQ">
      <template #description>
        <p>Fragen oder Anmerkungen zu dem Projekt?</p>
        <div class="flex gap-2 justify-center items-center">
          <UButton
            class="mt-4 rounded-full"
            variant="subtle"
            color="neutral"
            icon="i-simple-icons-github"
            to="https://github.com/KommtKevinOnline/website/issues/new"
            target="_blank"
          >
            GitHub Issue erstellen
          </UButton>
          <UButton
            class="mt-4 rounded-full"
            variant="solid"
            color="success"
            icon="i-simple-icons-whatsapp"
            to="https://wa.me/4915679642876"
            target="_blank"
          >
            per WhatsApp
          </UButton>
        </div>
      </template>
      <UPageAccordion class="max-w-4xl mx-auto" :items="faqItems" multiple />
    </UPageSection>
  </div>
</template>

<script lang="ts" setup>
const faqItems = [
  {
    label: 'Warum zur hölle?',
    content: `Kevin nutzt leider das Schedule Feature bei Twitch nicht, deswegen fragen viele Viewer im Offlinechat, wann er kommt.
      Kevin sagt das zwar immer am Ende des Streams, aber kurz und knapp ohne Suchen gab es diese Info nicht.`,
    defaultOpen: true,
  },
  {
    label: 'Wie funktioniert das?',
    content: `Das Tool läd sich den letzten Stream runter sobald Papaplatte offline gegangen ist. Danach läd das Tool die letzten 5min runter und konvertiert den Stream erst in Audio,
      um es danach in Text umzuwandeln. Mithilfe von ChatGPT wird dann der Text analysiert und die relevanten Informationen zu bekommen.
      `,
  },
  {
    label: 'Ist die Whatsapp Gruppe nicht besser?',
    content: `Nö. KommtKevinOnline verarbeitet mittlerweile sogar auch die Daten aus der Whatsapp-Gruppe um Änderungen mitzubekommen.`,
  },
];
</script>

<style></style>
