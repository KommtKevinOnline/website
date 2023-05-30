<template></template>

<script setup lang="ts">
const { status, data, signIn, signOut } = useAuth()

await signIn()
</script>