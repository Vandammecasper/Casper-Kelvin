<template>
    <div class="h-24 w-full bg-black p-4 px-16 max-md:gap-3 max-md:px-4 max-lg:px-8 flex justify-between fixed z-50">
        <RouterLink to="/">
            <img src="/logo-PhotoRoom.png" alt="logo" class="h-16">
        </RouterLink>
        <div class="flex items-center gap-16 max-md:gap-3 max-lg:gap-4 max-xl:gap-8">
            <RouterLink to="/appointment/services">
                <h3 class="Raleway-bold max-md:text-sm">{{ $t('navigation.makeAppointment') }}</h3>
            </RouterLink>
            <a href="/#about" class="max-sm:hidden">
                <h3 class="Raleway-bold max-md:text-sm">{{ $t('navigation.aboutUs') }}</h3>
            </a>
            <a href="/#service" class="max-sm:hidden">
                <h3 class="Raleway-bold max-md:text-sm">{{ $t('navigation.ourService') }}</h3>
            </a>
            <a href="/#crew" class="max-sm:hidden">
                <h3 class="Raleway-bold max-md:text-sm">{{ $t('navigation.crew') }}</h3>
            </a>
            <a href="/#halloffame" class="max-sm:hidden">
                <h3 class="Raleway-bold max-md:text-sm">{{ $t('navigation.hallOfFame') }}</h3>
            </a>
            
            <RouterLink v-if="firebaseUser" to="/account/myaccount">
                <div class="h-16 w-16 bg-yellow-600 rounded-full flex items-center justify-center">
                    <img src="/Profile.svg" alt="profile icon" class="h-10 w-10 mb-1">
                </div>
            </RouterLink>
            <RouterLink v-else to="/auth/login">
                <div class="h-16 w-16 bg-neutral-500 rounded-full flex items-center justify-center">
                    <img src="/Profile.svg" alt="profile icon" class="h-10 w-10 mb-1">
                </div>
            </RouterLink>
        </div>
    </div>
    <RouterView class="z-10"/>
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


export default {
    setup() {
        const { logout, firebaseUser } = useFirebase()
        return {
            firebaseUser,
            logout,

        }
    },
}
</script>