<template>
    <form @submit.prevent="handleResetPassword" class="w-screen h-screen grid px-4 sm:px-8 md:px-16">
        <div class="grid bg-neutral-800 place-self-center p-4">
            <RouterLink to="/" class="justify-self-end">
                <img src="/No.svg" alt="">
            </RouterLink>
            <div class=" py-4 px-8 sm:px-16">
                <h1 class="text-xl sm:text-3xl lg:text-4xl font-bold tracking-wider justify-self-center text-yellow-600 Raleway-bold">{{ $t('auth.resetPassword') }}</h1>
                <div v-if="error">
                    <p class="text-red-600 Raleway-bold">{{ error.message }}</p>
                </div>

                <div class="mt-6 place-self-center w-full">
                    <label for="email" class="text-md block font-semibold tracking-wider dark:text-gray-200 Raleway">
                        {{ $t('auth.emailAddress') }}
                    </label>
                    <input type="email" name="email" id="email" placeholder="youremail@example.com"
                        class="mt-1 w-full border-3 bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600 Raleway"
                        v-model="email" />
                </div>

                <button
                    class="Raleway-bold mt-6 w-full  border-2 border-yellow-600 bg-yellow-600 py-2 px-4 font-semibold hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">
                    {{ $t('auth.resetPassword') }}
                </button>
                <div class="flex justify-center">
                    <RouterLink
                        class="Raleway-bold mt-2 inline-block rounded text-sm text-yellow-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200 dark:text-yellow-200"
                        to="/auth/login">
                        {{ $t('auth.rememberedPassword') }}
                    </RouterLink>
                </div>
            </div>
            
        </div>
    </form>
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
import { ref } from 'vue'
import { type AuthError } from 'firebase/auth'
import router from '@/bootstrap/router'

import useFirebase from '@/composables/useFirebase'
import { X } from 'lucide-vue-next'

export default {
    components: { X },

    setup() {
        const { resetPassword } = useFirebase()
        const email = ref<string>('')
        const error = ref<AuthError | null>(null)
        const sendEmail = ref<boolean>(false)

        const handleResetPassword = () => {
            resetPassword(email.value).then(() => {
                sendEmail.value = true
            }).then(() => {
                router.push('/auth/login')
            })

        }

        return {
            email,
            error,
            sendEmail,

            handleResetPassword,
        }
    },
}
</script>