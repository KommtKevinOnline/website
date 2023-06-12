<template>
  <v-app-bar :elevation="0" color="#1e1e1e">
    <v-row justify="center">
      <v-col cols="2">
        <v-img src="https://cdn.7tv.app/emote/646285a75070b2cda24f2f86/4x.webp" height="32px" width="50px"/>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-btn to="/" color="white">Home</v-btn>
        <v-btn to="/how-does-it-work" color="white" class="ml-1">Wie funktioniert das?</v-btn>
        <v-btn to="/about" color="white" class="ml-1">Über</v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts" setup>
</script>
