// import path from 'path'
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

/* 
  check if user is logged in and if he is an admin 
*/

router.beforeEach((to, from, next) => {
  const { logout, firebaseUser } = useFirebase(); // Adjust this based on your Firebase composable
  const { customUser } = useCustomUser(); // Adjust this based on your user composable

  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    if (!firebaseUser.value) {
      // Redirect to the login page or another appropriate page
      next('/auth/login');
    } else {
      // Check if the route requires admin privileges
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (customUser.value?.role === 'ADMIN') {
          // User is authenticated and has admin privileges, allow access
          next();
        } else {
          // User is not an admin, you can redirect to an error page or another appropriate page
          next('/access-denied');
        }
      } else {
        if (to.matched.some(record => record.meta.requiresNoLogin)) {

        }
        // No admin role required, allow access
        next();
      }
    }
  } else {
    if (to.matched.some(record => record.meta.requiresNoLogin)) {
      if (firebaseUser.value) {
        // Redirect to the home page or another appropriate page
        next('/');
      } else {
        // No authentication required, allow access
        next();
      }
    }
    // No authentication required, allow access
    next();
  }
});

export default router