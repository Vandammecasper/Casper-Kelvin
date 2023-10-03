<template>
    <div class="h-32 w-screen bg-black p-4 px-16 flex justify-between fixed z-50">
        <RouterLink to="/">
            <img src="../../assets/logo-PhotoRoom.png" alt="logo" class="h-24">
        </RouterLink>
        <div class="flex items-center gap-16">
            <RouterLink to="/appointment">
                <h3 class="Raleway-bold">MAKE AN APPOINTMENT</h3>
            </RouterLink>
            <h3 class="Raleway-bold">ABOUT US</h3>
            <h3 class="Raleway-bold">OUR SERVICE</h3>
            <h3 class="Raleway-bold">THE CREW</h3>
            <h3 class="Raleway-bold">HALL OF FAME</h3>
            <RouterLink v-if="firebaseUser" to="/account">
                <div class="h-16 w-16 bg-yellow-600 rounded-full flex items-center justify-center">
                    <img src="../../assets/Profile.svg" alt="profile icon" class="h-10 w-10 mb-1">
                </div>
            </RouterLink>
            <RouterLink v-else to="/auth/login">
                <div class="h-16 w-16 bg-neutral-500 rounded-full flex items-center justify-center">
                    <img src="../../assets/Profile.svg" alt="profile icon" class="h-10 w-10 mb-1">
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
        // Composables
        const { logout, firebaseUser } = useFirebase()



        return {
            firebaseUser,
            logout,

        }
    },
}
</script>