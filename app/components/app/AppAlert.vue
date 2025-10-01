<template>
  <UBanner
    v-if="alert && alert.active"
    :title="alert.text ?? undefined"
    color="warning"
    icon="i-lucide-info"
  />
</template>

<script lang="ts" setup>
const { data: alert } = await useFetch('/api/alerts/active');
</script>

<style></style>
