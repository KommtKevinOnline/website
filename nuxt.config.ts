import { md3 } from "vuetify/blueprints";

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
  modules: [
    "vuetify-nuxt-module",
    "@nuxt/content",
    "@vueuse/nuxt",
    "@sidebase/nuxt-auth",
    "@nuxt/image",
    "@nuxtjs/robots",
    "nuxt-simple-sitemap"
  ],
  auth: {
    baseURL: process.env.AUTH_ORIGIN
  },
  runtimeConfig: {
    app: {
      postgresUrl: ''
    }
  },
  vuetify: {
    vuetifyOptions: {
      blueprint: md3,
      labComponents: true,
      date: {
        adapter: 'luxon',
      },
      theme: {
        defaultTheme: "dark",
        themes: {
          dark: {
            colors: {
              primary: "#3b3b3b",
              background: "#131414",
            },
          },
        },
      },
    }
  },
  image: {
    format: ['avif', 'webp', 'jpg']
  },
  routeRules: {
    '/': { swr: 300 },
    '/admin/**': { index: false },
  },
  robots: {
    rules: {
      UserAgent: 'Googlebot',
      Disallow: '/admin',
      Sitemap: '/sitemap.xml'
    }
  },
  // Fixes error when hotreloading (https://github.com/lovell/sharp/issues/3295)
  nitro: {
    hooks: {
      'dev:reload': () => require('sharp')
    }
  },
  imports: {
    presets: [
      {
        from: 'luxon',
        imports: ['DateTime']
      }
    ]
  }
})
