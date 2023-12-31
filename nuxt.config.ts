// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      VUE_APP_API_BASE_URL: process.env.VUE_APP_API_BASE_URL,
    }
  },
})
