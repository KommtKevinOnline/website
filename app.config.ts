export default defineAppConfig({
  ui: {
    primary: "emerald",
    gray: "zinc",
    variables: {
      light: {
        background: "229 250 239",
        foreground: "110 231 183",
      },
      dark: {
        background: "0 13 6",
        foreground: "4 120 87",
      },
    },
    button: {
      rounded: "rounded-full",
      default: {
        size: "md",
        color: "black",
      },
    },
    input: {
      rounded: "rounded-full",
    },
    footer: {
      top: {
        wrapper: "border-t border-gray-200 dark:border-gray-800",
        container: "py-8 lg:py-16",
      },
      bottom: {
        wrapper: "border-t border-gray-200 dark:border-gray-800",
      },
    },
    pricing: {
      card: {
        highlight: "ring-gray-900 dark:ring-white",
        features: {
          item: {
            icon: {
              base: "text-gray-900 dark:text-white",
            },
          },
        },
      },
    },
  },
});
