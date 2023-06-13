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
  plugins: [{ src: '~/plugins/vercel.ts', mode: 'client' }],
  modules: ["@nuxt/content"],
})
