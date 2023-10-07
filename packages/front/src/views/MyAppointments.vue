<template>
    <div class="flex w-full h-screen items-center">
        <div class="w-2/5 border-r-2 border-neutral-600 content-center grid justify-items-center h-80 mt-32">
            <RouterLink to="/account/myaccount">
                <h2 class="Raleway-bold text-2xl text-neutral-700">MY ACCOUNT</h2>
            </RouterLink>
            <RouterLink to="/account/myappointments">
                <h2 class="Raleway-bold text-3xl mt-6"> MY APPOINTMENTS</h2>
            </RouterLink>
        </div>
        <div class="w-full grid h-96 mt-4 px-24">
            <h1 class="text-5xl Raleway-bold justify-self-center">HELLO {{ firebaseUser?.displayName }}</h1>
            <div class="flex mt-4 gap-16">
                <div class="hover:border-3 hover:border-yellow-600">
                    <div class="relative">
                        <img src="../../assets/barbers/Jeff.jpg" alt="Image" class="w-48" />
                        <div class="absolute bottom-32 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>
                        <div class="absolute bottom-0 left-0 w-full h-32 bg-black"></div>
                        <div class="relative flex ml-2 gap-1 mb-2">
                            <img src="../../assets/icons/Calendar.svg" alt="" class="h-5">
                            <p class="Raleway text-sm">27/09/2023 - 3.00 PM</p>
                        </div>
                        <div class="relative flex ml-4 gap-2 mb-2">
                            <img src="../../assets/icons/man.svg" alt="" class="h-5">
                            <p class="Raleway text-sm">Jeff</p>
                        </div>
                        <div class="relative flex ml-2 gap-1 pb-2">
                            <img src="../../assets/icons/cut.svg" alt="" class="h-5">
                            <p class="Raleway text-sm">Beard trim</p>
                        </div>
                    </div>
                    <div class="flex justify-between pt-1 pb-2 px-4 bg-black">
                        <button :onclick="handleCancel()" class="Raleway-bold  border-2 border-red-500 bg-red-500 p-2 hover:bg-red-600 focus:outline-none focus-visible:border-red-500 focus-visible:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-300">Cancel</button>
                        <RouterLink to="/">
                            <button class="Raleway-bold  border-2 border-yellow-600 bg-yellow-600 p-2 px-5 hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-500 focus-visible:bg-yellow-600 focus-visible:ring-2 focus-visible:ring-yellow-500">Edit</button>
                        </RouterLink>
                    </div>
                </div>
                <div class="hover:border-3 hover:border-yellow-600">
                    <div class="relative">
                        <img src="../../assets/barbers/Sofie.jpg" alt="Image" class="w-48" />
                        <div class="absolute bottom-32 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>
                        <div class="absolute bottom-0 left-0 w-full h-32 bg-black"></div>
                        <div class="relative flex ml-2 gap-1 mb-2">
                            <img src="../../assets/icons/Calendar.svg" alt="" class="h-5">
                            <p class="Raleway text-sm">27/10/2023 - 1.00 PM</p>
                        </div>
                        <div class="relative flex ml-4 gap-2 mb-2">
                            <img src="../../assets/icons/man.svg" alt="" class="h-5">
                            <p class="Raleway text-sm">Sofie</p>
                        </div>
                        <div class="relative flex ml-2 gap-1 pb-2">
                            <img src="../../assets/icons/cut.svg" alt="" class="h-5">
                            <p class="Raleway text-sm">Hair coloring</p>
                        </div>
                    </div>
                    <div class="flex justify-between pt-1 pb-2 px-4 bg-black">
                        <button :onclick="handleCancel()" class="Raleway-bold  border-2 border-red-500 bg-red-500 p-2 hover:bg-red-600 focus:outline-none focus-visible:border-red-500 focus-visible:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-300">Cancel</button>
                        <RouterLink to="/">
                            <button class="Raleway-bold  border-2 border-yellow-600 bg-yellow-600 p-2 px-5 hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-500 focus-visible:bg-yellow-600 focus-visible:ring-2 focus-visible:ring-yellow-500">Edit</button>
                        </RouterLink>
                    </div>
                </div>
                <div class="hover:border-3 hover:border-yellow-600">
                    <div class="relative">
                        <img src="../../assets/barbers/Jeff.jpg" alt="Image" class="w-48" />
                        <div class="absolute bottom-32 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>
                        <div class="absolute bottom-0 left-0 w-full h-32 bg-black"></div>
                        <div class="relative flex ml-2 gap-1 mb-2">
                            <img src="../../assets/icons/Calendar.svg" alt="" class="h-5">
                            <p class="Raleway text-sm">27/11/2023 - 2.00 PM</p>
                        </div>
                        <div class="relative flex ml-4 gap-2 mb-2">
                            <img src="../../assets/icons/man.svg" alt="" class="h-5">
                            <p class="Raleway text-sm">Jeff</p>
                        </div>
                        <div class="relative flex ml-2 gap-1 pb-2">
                            <img src="../../assets/icons/cut.svg" alt="" class="h-5">
                            <p class="Raleway text-sm">Beard trim</p>
                        </div>
                    </div>
                    <div class="flex justify-between pt-1 pb-2 px-4 bg-black">
                        <button :onclick="handleCancel()" class="Raleway-bold  border-2 border-red-500 bg-red-500 p-2 hover:bg-red-600 focus:outline-none focus-visible:border-red-500 focus-visible:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-300">Cancel</button>
                        <RouterLink to="/">
                            <button class="Raleway-bold  border-2 border-yellow-600 bg-yellow-600 p-2 px-5 hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-500 focus-visible:bg-yellow-600 focus-visible:ring-2 focus-visible:ring-yellow-500">Edit</button>
                        </RouterLink>
                    </div>
                </div>
                <div class="hover:border-3 hover:border-yellow-600">
                    <div class="relative">
                        <img src="../../assets/barbers/Jeff.jpg" alt="Image" class="w-48" />
                        <div class="absolute bottom-32 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>
                        <div class="absolute bottom-0 left-0 w-full h-32 bg-black"></div>
                        <div class="relative flex ml-2 gap-1 mb-2">
                            <img src="../../assets/icons/Calendar.svg" alt="" class="h-5">
                            <p class="Raleway text-sm">27/01/2023 - 2.00 PM</p>
                        </div>
                        <div class="relative flex ml-4 gap-2 mb-2">
                            <img src="../../assets/icons/man.svg" alt="" class="h-5">
                            <p class="Raleway text-sm">Jeff</p>
                        </div>
                        <div class="relative flex ml-2 gap-1 pb-2">
                            <img src="../../assets/icons/cut.svg" alt="" class="h-5">
                            <p class="Raleway text-sm">Beard trim</p>
                        </div>
                    </div>
                    <div class="flex justify-between pt-1 pb-2 px-4 bg-black">
                        <button :onclick="handleCancel()" class="Raleway-bold  border-2 border-red-500 bg-red-500 p-2 hover:bg-red-600 focus:outline-none focus-visible:border-red-500 focus-visible:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-300">Cancel</button>
                        <RouterLink to="/">
                            <button class="Raleway-bold  border-2 border-yellow-600 bg-yellow-600 p-2 px-5 hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-500 focus-visible:bg-yellow-600 focus-visible:ring-2 focus-visible:ring-yellow-500">Edit</button>
                        </RouterLink>
                    </div>
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

const { firebaseUser } = useFirebase()

const handleCancel = () => {
    console.log('cancel')
}

</script>