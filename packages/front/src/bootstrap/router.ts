import useCustomUser from '@/composables/useCustomUser';
import useFirebase from '@/composables/useFirebase';
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
          meta: { requiresAuth: true, requiresAdmin: false },
        },
        {
          path:'appointment/:service/:extra',
          name: 'appointment',
          component: () => import('../views/appointment/barbertime.vue'),
          meta: { requiresAuth: true, requiresAdmin: false },
        },
        {
          path:'appointment/summary/:service/:extra/:barber/:date',
          name: 'summary',
          component: () => import('../views/appointment/summary.vue'),
          meta: { requiresAuth: true, requiresAdmin: false },
        }
      ]
    },
    {
      path: '/account',
      component: () => import('../../src/components/headerAccount.vue'),
      meta: { requiresAuth: true, requiresAdmin: false },
      children: [
        {
          path: 'myaccount',
          component: () => import('../views/account/Account.vue'),
        },
        {
          path: 'myappointments',
          component: () => import('../views/account/MyAppointments.vue'),
          meta: { requiresAuth: true, requiresAdmin: false },
        },
        {
          path: 'myappointmentsadmin',
          component: () => import('../views/account/myAppointmentsAdmin.vue'),
          meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
          path: 'vacation',
          component: () => import('../views/account/vacation.vue'),
          meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
          path: 'dashboard',
          component: () => import('../views/account/dashboard.vue'),
          meta: { requiresAuth: true, requiresAdmin: true },
        },
        {
          path: 'settings',
          component: () => import('../views/account/settings.vue'),
          meta: { requiresAuth: true, requiresAdmin: true },
        }
      ]
    },
    {
      path: '/auth',
      component: () => import('../components/wrappers/authWrap.vue'),
      meta: { requiresAuth: false, requiresNoLogin: true},
      children: [
        {
          path: 'login',
          component: () => import('../views/auth/Login.vue'),
        },
        {
          path: 'register',
          component: () => import('../views/auth/Register.vue'),
        },
        {
          path: 'forgotpassword',
          component: () => import('../views/auth/ForgotPassword.vue'),
        }
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/notfound.vue'), 
    },
  ],
})

router.beforeEach((to, from, next) => {
  const { logout, firebaseUser } = useFirebase();
  const { customUser } = useCustomUser();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebaseUser.value) {
      next('/auth/login');
    } else {
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (customUser.value?.role === 'ADMIN' || customUser.value?.role === 'SUPER_ADMIN') {
          next();
        } else {
          next('/access-denied');
        }
      } else {
        if (to.matched.some(record => record.meta.requiresNoLogin)) {

        }
        next();
      }
    }
  } else {
    if (to.matched.some(record => record.meta.requiresNoLogin)) {
      if (firebaseUser.value) {
        next('/');
      } else {
        next();
      }
    }
    next();
  }
});

export default router