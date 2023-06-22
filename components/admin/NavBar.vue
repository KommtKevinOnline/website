<template>
  <v-app-bar class="gradient" :elevation="0" color="#1e1e1e">
    <v-row justify="center">
      <v-col v-if="mdAndUp" cols="2">
        <router-link to="/" class="d-flex align-center pl-2">
          <nuxt-img src="/qp.svg" height="40" />
        </router-link>
      </v-col>
      <v-col class="d-flex align-center justify-center">
        <v-btn to="/admin/alerts" color="white" class="ml-1" prepend-icon="mdi-bell">Alerts</v-btn>
        <v-btn to="/admin/upcoming" color="white" class="ml-1" prepend-icon="mdi-calendar">Upcoming Streams</v-btn>
      </v-col>
    </v-row>
    <template #append>
      {{ data?.user?.name }}

      <v-menu>
        <template #activator="{ props }">
          <v-avatar class="ml-2" v-if="data?.user?.image" :image="data?.user?.image" v-bind="props"
            style="cursor: pointer;" />
        </template>
        <v-list>
          <v-list-item append-icon="mdi-logout" title="Logout" @click="logOut" />
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const router = useRouter()
const { mdAndUp } = useDisplay()
const { data, signOut } = useAuth()

async function logOut() {
  await signOut({ redirect: false })
  router.push('/')
}
</script>

<style scoped>
.gradient {
  background: linear-gradient(200deg, #11998e, #38ef7d);
}
</style>