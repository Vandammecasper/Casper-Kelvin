<template>
    <div class="max-sm:grid sm:hidden">
        <div class="max-sm:justify-self-center w-full max-sm:flex max-sm:gap-2 sm:w-3/5 md:w-2/5 max-sm:border-b-2 sm:border-r-2 border-neutral-600 content-center max-w-xs grid justify-items-center sm:h-80 mt-24 sm:mt-32">
            <RouterLink to="/account/myaccount">
                <h2 :class="{'text-sm sm:text-xl lg:text-3xl mt-6 Raleway-bold': isOnRoute('/account/myaccount'), 'text-xs sm:text-lg lg:text-2xl mt-6 text-neutral-700 Raleway-bold': !isOnRoute('/account/myaccount')}">{{ $t('account.myAccount.navigation') }}</h2>
            </RouterLink>
            <RouterLink v-if="customUser?.role == 'USER'" to="/account/myappointments">
                <h2 :class="{'text-sm sm:text-xl lg:text-3xl mt-6 Raleway-bold': isOnRoute('/account/myappointments'), 'text-xs sm:text-lg lg:text-2xl mt-6 text-neutral-700 Raleway-bold': !isOnRoute('/account/myappointments')}">{{ $t('account.myAppointments.navigation') }}</h2>
            </RouterLink>
            <RouterLink v-if="customUser?.role == 'ADMIN'" to="/account/myappointmentsadmin">
                <h2 :class="{'text-sm sm:text-xl lg:text-3xl mt-6 Raleway-bold': isOnRoute('/account/myappointmentsadmin'), 'text-xs sm:text-lg lg:text-2xl mt-6 text-neutral-700 Raleway-bold': !isOnRoute('/account/myappointmentsadmin')}">{{ $t('account.myAppointments.navigation') }}</h2>
            </RouterLink>
            <RouterLink v-if="customUser?.role == 'ADMIN'" to="/account/vacation">
                <h2 :class="{'text-sm sm:text-xl lg:text-3xl mt-6 Raleway-bold': isOnRoute('/account/vacation'), 'text-xs sm:text-lg lg:text-2xl mt-6 text-neutral-700 Raleway-bold': !isOnRoute('/account/vacation')}">{{ $t('account.vacation.navigation') }}</h2>
            </RouterLink>
        </div>
    </div>
    <div class="max-sm:hidden w-3/5 md:w-2/5 border-r-2 border-neutral-600 content-center max-w-xs grid justify-items-center sm:h-80 mt-24 sm:mt-32">
                <RouterLink to="/account/myaccount">
                    <h2 :class="{ 'text-sm sm:text-xl lg:text-2xl mt-6 Raleway-bold': isOnRoute('/account/myaccount'), 'text-xs sm:text-lg lg:text-2xl mt-6 text-neutral-700 Raleway-bold': !isOnRoute('/account/myaccount') }">{{ $t('account.myAccount.navigation') }}</h2>
                </RouterLink>
                <RouterLink v-if="customUser?.role == 'USER'" to="/account/myappointments">
                    <h2 :class="{ 'text-sm sm:text-xl lg:text-2xl mt-6 Raleway-bold': isOnRoute('/account/myappointments'), 'text-xs sm:text-lg lg:text-2xl mt-6 text-neutral-700 Raleway-bold': !isOnRoute('/account/myappointments') }">{{ $t('account.myAppointments.navigation') }}</h2>
                </RouterLink>
                <RouterLink v-if="customUser?.role == 'ADMIN'" to="/account/myappointmentsadmin">
                    <h2 :class="{ 'text-sm sm:text-xl lg:text-2xl mt-6 Raleway-bold': isOnRoute('/account/myappointmentsadmin'), 'text-xs sm:text-lg lg:text-2xl mt-6 text-neutral-700 Raleway-bold': !isOnRoute('/account/myappointmentsadmin') }">{{ $t('account.myAppointments.navigation') }}</h2>
                </RouterLink>
                <RouterLink v-if="customUser?.role == 'ADMIN'" to="/account/vacation">
                    <h2 :class="{ 'text-sm sm:text-xl lg:text-2xl mt-6 Raleway-bold': isOnRoute('/account/vacation'), 'text-xs sm:text-lg lg:text-2xl mt-6 text-neutral-700 Raleway-bold': !isOnRoute('/account/vacation') }">{{ $t('account.vacation.navigation') }}</h2>
                </RouterLink>
            </div>
    
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import useCustomUser from '@/composables/useCustomUser';

const { customUser } = useCustomUser()

const route = useRoute()

function isOnRoute(routePath:string) {
  return route.path === routePath;
}

</script>
