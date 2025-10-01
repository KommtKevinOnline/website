// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/ui',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-charts',
    '@nuxt/test-utils/module',
  ],

  runtimeConfig: {
    database: {
      url: undefined,
    },
  },

  nitro: {
    experimental: {
      tasks: true,
    },
    imports: {
      dirs: ['server/utils'],
      presets: [
        {
          from: 'zod',
          imports: ['z'],
        },
        {
          from: 'h3-zod',
          imports: [
            'useValidatedQuery',
            'useValidatedBody',
            'useValidatedParams',
          ],
        },
      ],
    },
  },

  image: {
    domains: ['static-cdn.jtvnw.net'],
    ipx: {
      maxAge: 60 * 60 * 24 * 30, // 30 days
    },
  },

  ui: {
    theme: {
      colors: [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
        'purple',
      ],
    },
  },

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
