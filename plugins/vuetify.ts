import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { fa } from "vuetify/iconsets/fa-svg";
import { md3 } from "vuetify/blueprints";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    blueprint: md3,
    components,
    directives,
    theme: {
      defaultTheme: "dark",
      themes: {
        dark: {
          colors: {
            primary: "#0071F2",
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
