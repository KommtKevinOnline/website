<template>
  <v-app-bar class="gradient" :elevation="0" color="#1e1e1e">
    <v-row justify="center">
      <v-col v-if="mdAndUp" cols="2">
        <v-img src="/qp.svg" height="40px"/>
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-center justify-end">
        <v-btn to="/" color="white">Home</v-btn>
        <v-btn to="/how-does-it-work" color="white" class="ml-1">Wie funktioniert das?</v-btn>
        <v-btn to="/about" color="white" class="ml-1">Über</v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const { mdAndUp } = useDisplay()
</script>

<style scoped>
.gradient {
  background: linear-gradient(200deg,#11998e, #38ef7d);
}
</style>