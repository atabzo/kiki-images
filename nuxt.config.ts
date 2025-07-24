import tailwindVitePlugin from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['@nuxt/icon', '@nuxt/fonts', '@nuxt/eslint', 'shadcn-nuxt'],
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        class: 'dark',
      },
    },
  },

  css: ['@/assets/css/fonts.css', './app/assets/css/main.css'],

  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-07-15',

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

  shadcn: {
    componentDir: './app/components/ui',
    prefix: '',
  },
})
