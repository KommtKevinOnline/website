<template>
  <v-navigation-drawer v-model="drawer" location="top" temporary>
    <v-list :items="routeItems"></v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
const props = defineProps<{
  routeItems: any[],
  stateName: string
}>()

const drawer = useState<boolean>(props.stateName, () => false);
</script>
