// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  components: [
    {
      path: "~/components",
      pathPrefix: true,
    },
  ],
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
      baseUrl: process.env.BASE_URL,
    },
  },
  modules: ["@pinia/nuxt"],
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js",
          tagPosition: "bodyClose",
        },
        {
          src: "https://kit.fontawesome.com/ac3f7de34b.js",
          crossorigin: "anonymous",
        },
      ],
    },
  },
  css: ["@/public/assets/css/main.css"],
});
