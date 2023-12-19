<template>
    <div class="h-24 w-screen bg-black p-4 px-16 flex justify-between absolute top-0 z-50">
        <RouterLink to="/">
            <img src="/logo-PhotoRoom.png" alt="logo" class="h-16">
        </RouterLink>
        </div>
        <div class="flex gap-16">
            <RouterLink v-if="customUser?.role == 'ADMIN'" to="/account/settings">
                <h1>BARBER SETTINGS</h1>
            </RouterLink>
            <RouterLink v-if="customUser?.role == 'ADMIN'" to="/account/dashboard">
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
import useCustomUser from '@/composables/useCustomUser'


export default {
    setup() {
        // Composables
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