// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindVitePlugin from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/icon', '@nuxt/fonts', '@nuxt/eslint'],
  devtools: { enabled: false },
  app: {
    head: {
      htmlAttrs: {
        class: 'dark',
      },
    },
  },
  css: ['./app/assets/css/main.css'],
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-05-15',
  vite: {
    plugins: [tailwindVitePlugin()],
    esbuild: {
      legalComments: 'none',
    },
    build: {
      terserOptions: {
        format: {
          comments: false,
        },
      },
      cssMinify: 'lightningcss',
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
