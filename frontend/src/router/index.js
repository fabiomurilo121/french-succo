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
    path: '/complete',
    name: 'complete',
    component: () => import('@/pages/CompletePage.vue')
  },
  {
    path: '/historias',
    name: 'historias',
    component: () => import('@/pages/StoriesPage.vue')
  },
  {
    path: '/conjugacao',
    name: 'conjugacao',
    component: () => import('@/pages/ConjugacaoPage.vue')
  },
  {
    path: '/detalhes',
    name: 'detalhes',
    component: () => import('@/pages/DetalhesPage.vue')
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
