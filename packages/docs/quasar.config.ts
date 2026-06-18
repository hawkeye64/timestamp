import { defineConfig } from '@quasar/app-vite'
import { viteMdPlugin, type MenuItem } from '@md-plugins/vite-md-plugin'
import { viteSearchPlugin } from '@md-plugins/vite-search-plugin'
import { viteSsgPlugin } from '@md-plugins/vite-ssg-plugin'
import type { Plugin } from 'vite'

export default defineConfig(async (ctx) => {
  const siteConfig = await import('./src/siteConfig')
  const { sidebar } = siteConfig

  return {
    boot: [],

    css: ['app.scss'],

    extras: ['fontawesome-v7', 'roboto-font', 'material-icons'],

    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20',
      },

      typescript: {
        strict: true,
        vueShim: true,
      },

      vueRouterMode: 'history',

      viteVuePluginOptions: {
        include: [/\.(vue|md)$/],
      },

      vitePlugins: [
        [
          viteMdPlugin,
          {
            path: ctx.appPaths.srcDir + '/markdown',
            menu: sidebar as MenuItem[],
          },
        ],
        viteSsgPlugin({
          markdown: {
            root: ctx.appPaths.srcDir + '/markdown',
          },
        }) as unknown as Plugin,
        viteSearchPlugin({
          markdown: {
            root: ctx.appPaths.srcDir + '/markdown',
            exclude: ['__*.md'],
          },
        }),
        [
          'vite-plugin-checker',
          {
            vueTsc: true,
          },
          { server: false },
        ],
      ],
    },

    devServer: {
      open: true,
    },

    framework: {
      autoImportVueExtensions: ['vue', 'md'],
      config: {
        dark: 'auto',
      },
      plugins: ['Cookies', 'Dark', 'LocalStorage', 'Meta', 'Notify'],
    },

    animations: [],
  }
})
