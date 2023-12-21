<template>
    <div class="h-24 w-screen bg-black p-4 max-sm:px4 px-8 lg:px-16 flex justify-between absolute top-0 z-50">
        <div>
        <RouterLink to="/">
            <img src="/logo-PhotoRoom.png" alt="logo" class="h-16">
        </RouterLink>
        </div>
        <div class="flex gap-4 md:gap-16 items-center">
            <RouterLink v-if="customUser?.role == 'SUPER_ADMIN'" to="/account/settings">
                <h1 class="max-sm:text-sm text-center Raleway-bold">{{ $t('navigation.barberSettings') }}</h1>
            </RouterLink>
            <RouterLink v-if="customUser?.role == 'SUPER_ADMIN'" to="/account/dashboard" class="max-lg:hidden Raleway-bold">
                <h1 class="text-center">{{ $t('navigation.barberAnalytics') }}</h1>
            </RouterLink>
            <RouterLink v-if="customUser?.role == 'SUPER_ADMIN'" to="/account/myaccount">
                <div class="h-16 w-16 bg-yellow-600 rounded-full flex items-center justify-center">
                    <img src="/Profile.svg" alt="profile icon" class="h-10 w-10 mb-1">
                </div>
            </RouterLink>
        </div>
    </div>
    <RouterView />
    
</template>

<style>
.Raleway {
    font-family: 'Raleway', sans-serif;
}

.Raleway-bold {
    font-family: 'Raleway-Bold', sans-serif;
}
</style>

<script lang="ts">

import useFirebase from '@/composables/useFirebase'
import useCustomUser from '@/composables/useCustomUser'


export default {
    setup() {
        const { logout, firebaseUser } = useFirebase()

        const { customUser } = useCustomUser()

        return {
            firebaseUser,
            logout,
            customUser
        }
    },
}
</script>