import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    VitePWA({
      manifest: {
        name: 'The Barber',
        short_name: 'Barber',
        theme_color: 'rgb(202 138 4)',
        icons: [
          {
            src: './assets/logo-PhotoRoom.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './assets/logo-PhotoRoom.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        background_color: 'rgb(10 10 10)',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 350,
              },
            },
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 60,
              },
            },
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})