import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/home.vue'),
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/notfound.vue'), 
    },
  ],
})

export default router