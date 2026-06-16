import type { RouteRecordRaw } from 'vue-router'
import mdPageList from '@/markdown/listing'

const routes = [
  {
    path: '/',
    component: () => import('@/.q-press/layouts/MarkdownLayout.vue'),
    children: [
      ...Object.entries(mdPageList)
        .filter(([key]) => key.includes('landing-page.md'))
        .map(([, component]) => ({
          path: '',
          name: 'Landing Page',
          component,
          meta: { fullscreen: true, dark: true },
        })),

      ...Object.keys(mdPageList)
        .filter((key) => !key.includes('landing-page.md'))
        .map((key) => {
          const acc = {
            path: '',
            component: mdPageList[key],
          }

          if (acc.path === '') {
            const parts = key.substring(1, key.length - 3).split('/')
            const len = parts.length
            const path = parts[len - 2] === parts[len - 1] ? parts.slice(0, len - 1) : parts

            acc.path = path.join('/')
          }

          return acc
        }),
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
] as RouteRecordRaw[]

export default routes
