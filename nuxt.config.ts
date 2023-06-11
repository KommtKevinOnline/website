// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
    "typeface-roboto/index.css",
  ],
   build: {
    transpile: ["vuetify"],
  },
  modules: ["@nuxt/content"],
  runtimeConfig: {
    twitch: {
      client_id: process.env.TWITCH_CLIENT_ID,
      secret: process.env.TWITCH_SECRET,
    }
  }
})
