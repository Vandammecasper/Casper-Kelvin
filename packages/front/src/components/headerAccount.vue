<template>
    <div class="h-24 w-screen bg-black p-4 px-16 flex justify-between items-center absolute top-0 z-50">
        <div>
            <RouterLink to="/">
            <img src="../../assets/logo-PhotoRoom.png" alt="logo" class="h-16">
        </RouterLink>
        </div>
        <div class="flex gap-16">
            <RouterLink to="/account/settings">
                <h1>BARBER SETTINGS</h1>
            </RouterLink>
            <RouterLink to="/account/dashboard">
                <h1>BARBER ANALYTICS</h1>
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