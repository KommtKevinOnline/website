<template>
  <v-row>
    <v-col class="d-flex justify-center align-center flex-column">
      <v-card
        color="primary"
        :title="user?.name ?? 'n/a'"
        :subtitle="`${user?.location}`"
        :prepend-avatar="user?.avatar_url"
        :text="user?.bio ?? 'n/a'"
      >
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="d-flex justify-center">
      <v-btn variant="text" color="white" to="/impressum">Impressum</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { Octokit } from "octokit";

const octokit = new Octokit({
  request: {
    fetch: fetch,
  },
});

const { data: user } = useAsyncData(() => octokit.rest.users.getByUsername({ username: 'niki2k1' }), { transform: (data) => data.data })
</script>