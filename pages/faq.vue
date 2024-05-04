<template>
  <div>
    <ULandingSection title="FAQ">
      <template #description>
        <p>Fragen oder Anmerkungen zu dem Projekt?</p>
        <UButton
          class="mt-4"
          size="xs"
          icon="i-simple-icons-github"
          to="https://github.com/KommtKevinOnline/website/issues/new"
          target="_blank"
        >
          Issue erstellen
        </UButton>
      </template>
      <ULandingFAQ class="max-w-4xl mx-auto" :items="faqItems" multiple />
    </ULandingSection>
  </div>
</template>

<script lang="ts" setup>
const faqItems = [
  {
    label: "Warum zur hölle?",
    content: `Kevin nutzt leider das Schedule Feature bei Twitch nicht, deswegen fragen viele Viewer im Offlinechat, wann er kommt.
      Kevin sagt das zwar immer am Ende des Streams, aber kurz und knapp ohne Suchen gibt es diese Info nicht.`,
    defaultOpen: true,
  },
  {
    label: "Wie funktioniert das?",
    content: `Der Worker überprüft intervallbasiert ob es einen neuen VOD gibt. Wenn ja, wird der VOD heruntergeladen und das Audio extrahiert,
      um es dann in Text umzuwandeln. Mithilfe von der ChatGPT API wird dann der Text analysiert und die relevanten Informationen extrahiert.
      `,
  },
  {
    label: "Ist die Whatsapp Gruppe nicht besser?",
    content: `Nö.`,
  },
];
</script>

<style></style>
