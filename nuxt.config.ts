// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/test-utils', '@nuxt/ui', '@nuxtjs/device'],
  future: {
    compatibilityVersion: 4,
  },
  css: ['~/assets/css/main.css'],
  devServer: {
    port: 5000,
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
    },
  },
});
