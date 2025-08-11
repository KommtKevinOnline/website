// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  css: ['~/assets/css/main.css'],

  modules: ['@nuxt/fonts', '@nuxt/icon', '@nuxt/ui-pro'],

  fonts: {
    families: [
      {
        name: 'DM Sans',
        provider: 'google',
        weights: [
          '100',
          '200',
          '300',
          '400',
          '500',
          '600',
          '700',
          '800',
          '900',
        ],
      },
    ],
  },
});
