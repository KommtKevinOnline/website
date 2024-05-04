import { md3 } from "vuetify/blueprints";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  css: [
    "@mdi/font/css/materialdesignicons.min.css",
    "typeface-roboto/index.css",
  ],
  extends: ["@nuxt/ui-pro"],
  modules: [
    "@nuxt/content",
    "@vueuse/nuxt",
    "@sidebase/nuxt-auth",
    "@nuxt/image",
    "@nuxtjs/robots",
    "nuxt-simple-sitemap",
    "@nuxt/test-utils/module",
    "@nuxt/ui",
    "nuxt-og-image",
  ],
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: "authjs",
    },
  },
  runtimeConfig: {
    app: {
      postgresUrl: "",
    },
  },
  image: {
    format: ["avif", "webp", "jpg"],
  },
  routeRules: {
    "/": { swr: 300 },
    "/admin/**": { index: false },
  },
  robots: {
    rules: {
      UserAgent: "Googlebot",
      Disallow: "/admin",
      Sitemap: "/sitemap.xml",
    },
  },
  // Fixes error when hotreloading (https://github.com/lovell/sharp/issues/3295)
  nitro: {
    hooks: {
      "dev:reload": () => require("sharp"),
    },
  },
  imports: {
    dirs: ["interfaces", "types"],
    presets: [
      {
        from: "luxon",
        imports: ["DateTime"],
      },
    ],
  },
  site: {
    url: "https://kommtkevinonline.de",
  },
});
