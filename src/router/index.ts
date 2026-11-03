import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    // 顶部导航约 64px，留出 80px 让锚点标题不被遮挡
    if (to.hash) return { el: to.hash, top: 80, behavior: 'smooth' }
    return { top: 0 }
  },
})

export default router
