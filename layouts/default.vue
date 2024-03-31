<template>
  <v-app>
    <v-main>
      <AppNavBar />
      <AppNavDrawer :route-items="routeItems" stateName="drawer" />
      <AppAlerts />
      <v-container>
        <slot />
      </v-container>
      <!-- <AppFooter /> -->
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { routeItems } from "../statics/route-items";

useHead({
  script: [
    {
      src: "https://analytics.niki2k1.dev/js/script.js",
      defer: true,
      "data-domain": "kommtkevinonline.de",
    },
  ],
  htmlAttrs: {
    lang: "de",
  },
});
</script>

<style scoped>
#video-background {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  filter: blur(5px);
  object-fit: cover;
  transform: scale(1.1);
}

#image-background {
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: -1;
  filter: blur(5px);
  object-fit: cover;
  transform: scale(1.1);
}
</style>

<style>
.v-application {
  background: transparent !important;
}

body {
  background-color: #1e1e1e;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b3b3b' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-repeat: repeat;
}
</style>
