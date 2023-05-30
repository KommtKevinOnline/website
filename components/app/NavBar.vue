<template>
  <v-app-bar class="gradient" :elevation="0" color="#1e1e1e">
    <v-app-bar-nav-icon
      v-if="smAndDown"
      color="white"
      variant="text"
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-row justify="center">
      <v-col class="d-flex align-center" cols="2">
        <router-link to="/">
          <nuxt-img src="/qp.svg" height="40" />
        </router-link>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="d-flex align-center justify-end"
        v-if="mdAndUp"
      >
        <v-btn to="/" color="white">Home</v-btn>
        <v-btn to="/thumbnail/generate" color="white" class="ml-1"
          >Thumbnail Generator</v-btn
        >
        <v-btn to="/how-does-it-work" color="white" class="ml-1"
          >Wie funktioniert das?</v-btn
        >
        <v-btn to="/about" color="white" class="ml-1">Über</v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

const drawer = useState<boolean>("drawer");

const { smAndDown, mdAndUp } = useDisplay();
</script>

<style scoped>
.gradient {
  background: linear-gradient(200deg, #11998e, #38ef7d) !important;
}
</style>
