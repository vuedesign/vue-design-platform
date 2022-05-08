import { defineNuxtConfig } from 'nuxt'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.ico' }
      ]
    }
  },
  publicRuntimeConfig: {
    BASE_URL: process.env.BASE_URL
  }
  //   meta: {
  //     link: [
  //       { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  //       { rel: 'shortcut icon', href: '/favicon.ico' },
  //       { rel: 'apple-touch-icon', href: '/favicon.ico' }
  //     ]
  //   },
  //   publicRuntimeConfig: {
  //     BASE_URL: process.env.BASE_URL
  //   },
  //   vite: {
  //     // @ts-expect-error: Missing ssr key
  //     ssr: {
  //       noExternal: ['moment', 'compute-scroll-into-view', 'ant-design-vue']
  //     },
  //     server: {
  //       proxy: {
  //         '/api': {
  //           target: 'http://127.0.0.1:8082',
  //           changeOrigin: true,
  //           rewrite: path => path.replace(/^\/api/, '/api')
  //         }
  //       }
  //     }
  //   }
})
