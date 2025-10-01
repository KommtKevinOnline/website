<template>
  <UPageSection id="faq" title="FAQ">
    <template #description>
      <p>Fragen oder Anmerkungen zu dem Projekt?</p>
      <div class="flex flex-wrap gap-2 justify-center items-center">
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
        <UButton
          class="mt-4 rounded-full"
          variant="solid"
          color="purple"
          icon="i-simple-icons-instagram"
          to="https://ig.me/m/niki2k1"
          target="_blank"
        >
          per Instagram
        </UButton>
      </div>
    </template>
    <UAccordion class="max-w-4xl mx-auto" :items="faqItems" multiple />
  </UPageSection>
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
    content: `Das Tool läd sich die letzten 5min des letzten Streams runter sobald Papaplatte offline gegangen ist. Danach wird das Video in Text umgewandelt und mithilfe von ChatGPT wird der Text analysiert um an die relevanten Informationen zu bekommen.
      `,
  },
  {
    label: 'Ist die Whatsapp Gruppe nicht besser?',
    content: `Nö. KommtKevinOnline verarbeitet mittlerweile sogar auch die Daten aus der Whatsapp-Gruppe um Änderungen mitzubekommen.`,
  },
  {
    label: 'Wie viel kostet KommtKevinOnline im Unterhalt?',
    content: `Die Anfragen an ChatGPT kosten im Monat weniger als $1 (Transcription und Prediction). Das Hosting der Website würde theoretisch über (z.B.) Vercel nix kosten. Ich hab aber einen eigenen Server und hoste alles mit Coolify selber.`,
  },
];
</script>
