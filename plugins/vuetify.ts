import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import { VDataTable } from 'vuetify/labs/VDataTable'
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { fa } from "vuetify/iconsets/fa-svg";
import { md3 } from "vuetify/blueprints";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    blueprint: md3,
    components: {
      VDataTable,
      ...components
    },
    directives,
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
    icons: {
      defaultSet: "mdi",
      aliases,
      sets: {
        mdi,
        fa,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
