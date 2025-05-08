// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/eslint'
  ],
  runtimeConfig: {
    public: {
      apiBaseUrl: 'https://localhost:7030/api'  // Update this to your actual backend URL
    }}
})