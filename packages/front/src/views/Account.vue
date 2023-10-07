<template>
    <div @submit.prevent="handleUpdateProfile" class="flex w-full h-screen items-center">
        <div class="w-2/5 border-r-2 border-neutral-600 content-center grid justify-items-center h-80 mt-32">
            <RouterLink to="/account/myaccount">
                <h2 class="text-3xl Raleway-bold">MY ACCOUNT</h2>
            </RouterLink>
            <RouterLink to="/account/myappointments">
                <h2 class="text-2xl mt-6 text-neutral-700 Raleway-bold"> MY APPOINTMENTS</h2>
            </RouterLink>
        </div>
        <div class="w-full grid justify-items-center h-80 mt-8">
            <h1 class="text-5xl Raleway-bold">HELLO {{firebaseUser?.displayName}}</h1>
            <p class=" Raleway text-yellow-600">3 points</p>
            <p class=" Raleway text-yellow-600">#30 place</p>
            <div class="w-full grid grid-cols-2 gap-8 px-48">
                <div>
                    <div class="mt-6">
                        <label
                            for="email"
                            class="text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="nickname"
                            id="nickname"
                            autocomplete="off"
                            :placeholder= "firebaseUser?.displayName ? firebaseUser?.displayName : 'Your name'"
                            class="Raleway mt-1 block border-3 w-full  bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
                        />
                    </div>
                    <div class="mt-6">
                        <label
                            for="password"
                            class="text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            autocomplete="off"
                            placeholder=""
                            class="Raleway mt-1 block border-3 w-full  bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
                        />
                    </div>
                    <button @click="logoutUser"
                    class="Raleway-bold mt-6 w-full  border-2 border-red-500 bg-red-500 py-2 px-4 font-semibold hover:bg-red-600 focus:outline-none focus-visible:border-red-500 focus-visible:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-300"
                    >
                        LOG OUT
                    </button>
                </div>
                <div>
                    <div class="mt-6">
                        <label
                            for="email"
                            class="text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
                        >
                            Email address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="off"
                            :placeholder= "firebaseUser?.email ? firebaseUser?.email : 'Your email'"
                            class="Raleway mt-1 block border-3 w-full  bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
                        />
                    </div>
                    <div class="mt-6">
                        <label
                            for="password"
                            class="text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
                        >
                            Confirm password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder=""
                            class="Raleway mt-1 block border-3 w-full  bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
                        />
                    </div>
                    <button type="submit"
                    class="Raleway-bold mt-6 w-full  border-2 border-yellow-600 bg-yellow-600 py-2 px-4 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300"
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.Raleway {
    font-family: 'Raleway', sans-serif;
}

.Raleway-bold {
    font-family: 'Raleway-Bold', sans-serif;
}
</style>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useFirebase from '@/composables/useFirebase'

const { firebaseUser, logout } = useFirebase()
const { replace } = useRouter()

const logoutUser = () => {
    logout().then(() => {
        replace({ path: '/' })
    })
}

const handleUpdateProfile = () => {
    console.log('update profile')
}


</script>