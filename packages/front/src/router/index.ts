import path from 'path'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../components/header.vue'),
      children:[
        {
        path: '',
        component: () => import('../views/home.vue'),
        },
        {
          path:'appointment/services',
          component: () => import('../views/appointment/service.vue'),
        },
        {
          path:'appointment/barber&time',
          component: () => import('../views/appointment/barber&time.vue'),
        },
        {
          path:'appointment/summary',
          component: () => import('../views/appointment/summary.vue'),
        }
      ]
    },
    {
      path: '/account',
      component: () => import('../../src/components/headerAccount.vue'),
      children: [
        {
          path: 'myaccount',
          component: () => import('../views/account.vue'),
        },
        {
          path: 'myappointments',
          component: () => import('../views/MyAppointments.vue'),
        }
      ]
    },
    {
      path: '/auth',
      component: () => import('../components/wrappers/AuthWrap.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../views/auth/login.vue'),
        },
        {
          path: 'register',
          component: () => import('../views/auth/register.vue'),
        },
        {
          path: 'forgotpassword',
          component: () => import('../views/auth/forgotPassword.vue'),
        }
      ],
    },
    // {
    //   path: '/booking',
    //   component: () => import('../views/booking.vue'), // mss toch op 1 scherm, voor het makkelijker werken met gekozen variabelenx
    //   children: [
    //     {
    //       path: 'bahandeling',
    //       component: () => import('../views/bahandeling.vue'),
    //     },
    //     {
    //       path: 'kapper',
    //       component: () => import('../views/kapper.vue'),
    //     },
    //   ],
    // },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/notfound.vue'), 
    },
  ],
})

export default router