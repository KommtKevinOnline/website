<template>
  <h1>Admin</h1>

  {{ status }}
  {{ data }}

  <v-btn @click="signOut">Log Out</v-btn>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'auth' })

const { status, data, signOut } = useAuth()
</script>