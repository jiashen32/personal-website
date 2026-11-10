import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const SITE_NAME = '王甲申 · Java 后端 / AI 应用开发'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: SITE_NAME },
    },
    {
      path: '/about',
      name: 'about',
      // 路由级代码分割：首次访问只加载首页
      component: () => import('../views/AboutView.vue'),
      meta: { title: `关于 · ${SITE_NAME}` },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: `页面不存在 · ${SITE_NAME}` },
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    // 顶部导航约 64px，留出 80px 让锚点标题不被遮挡
    if (to.hash) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      return { el: to.hash, top: 80, behavior: reduceMotion ? 'auto' : 'smooth' }
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = to.meta.title
  if (typeof title === 'string') document.title = title
})

export default router
