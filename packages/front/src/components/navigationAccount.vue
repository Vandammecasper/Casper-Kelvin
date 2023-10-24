<template>

    <div class="w-2/5 border-r-2 border-neutral-600 content-center max-w-xs grid justify-items-center h-80 mt-32">
        <RouterLink to="/account/myaccount">
            <h2 :class="{'text-3xl mt-6 Raleway-bold': isOnRoute('/account/myaccount'), 'text-2xl mt-6 text-neutral-700 Raleway-bold': !isOnRoute('/account/myaccount')}">{{ $t('account.myAccount.navigation') }}</h2>
        </RouterLink>
        <RouterLink v-if="customUser?.role == 'USER'" to="/account/myappointments">
            <h2 :class="{'text-3xl mt-6 Raleway-bold': isOnRoute('/account/myappointments'), 'text-2xl mt-6 text-neutral-700 Raleway-bold': !isOnRoute('/account/myappointments')}">{{ $t('account.myAppointments.navigation') }}</h2>
        </RouterLink>
        <RouterLink v-if="customUser?.role == 'ADMIN'" to="/account/myappointmentsadmin">
            <h2 :class="{'text-3xl mt-6 Raleway-bold': isOnRoute('/account/myappointmentsadmin'), 'text-2xl mt-6 text-neutral-700 Raleway-bold': !isOnRoute('/account/myappointmentsadmin')}">{{ $t('account.myAppointments.navigation') }}</h2>
        </RouterLink>
        <RouterLink v-if="customUser?.role == 'ADMIN'" to="/account/vacation">
            <h2 :class="{'text-3xl mt-6 Raleway-bold': isOnRoute('/account/vacation'), 'text-2xl mt-6 text-neutral-700 Raleway-bold': !isOnRoute('/account/vacation')}">{{ $t('account.vacation.navigation') }}</h2>
        </RouterLink>
    </div>

</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import useFirebase from '@/composables/useFirebase'
import { computed } from 'vue'
import useCustomUser from '@/composables/useCustomUser';

const { customUser } = useCustomUser()

const route = useRoute()

function isOnRoute(routePath:string) {
  return route.path === routePath;
}

</script>
