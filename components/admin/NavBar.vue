<template>
  <v-app-bar class="gradient" :elevation="0" color="#1e1e1e">
    <v-app-bar-nav-icon
      v-if="smAndDown"
      color="white"
      variant="text"
      @click.stop="adminDrawer = !adminDrawer"
    ></v-app-bar-nav-icon>
    <v-row justify="center">
      <v-col class="d-flex align-center" cols="2">
        <router-link to="/" class="text-white"> KommtKevinOnline </router-link>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="d-flex align-center justify-end"
        v-if="mdAndUp"
      >
        <v-btn
          to="/admin/alerts"
          color="white"
          class="ml-1"
          prepend-icon="mdi-bell"
          >Alerts</v-btn
        >
      </v-col>
    </v-row>
    <template #append>
      {{ data?.user?.name }}

      <v-menu>
        <template #activator="{ props }">
          <v-avatar
            class="ml-2"
            v-if="data?.user?.image"
            :image="data?.user?.image"
            v-bind="props"
            style="cursor: pointer"
          />
        </template>
        <v-list>
          <v-list-item
            append-icon="mdi-logout"
            title="Logout"
            @click="logOut"
          />
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";

const adminDrawer = useState<boolean>("admin-drawer");

const router = useRouter();
const { smAndDown, mdAndUp } = useDisplay();
const { data, signOut } = useAuth();

async function logOut() {
  await signOut({ redirect: false });
  router.push("/");
}
</script>

<style scoped>
.gradient {
  background: linear-gradient(200deg, #11998e, #38e3ef) !important;
}
</style>
