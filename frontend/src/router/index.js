import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/DashboardPage.vue')
  },
  {
    path: '/flashcards',
    name: 'flashcards',
    component: () => import('@/pages/FlashcardsPage.vue')
  },
  {
    path: '/configuracoes',
    name: 'configuracoes',
    component: () => import('@/pages/ConfiguracoesPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
