<template>
    <form @submit.prevent="handleResetPassword" class="w-screen h-screen grid">
        <div class="grid bg-neutral-800 place-self-center p-4">
            <RouterLink to="/" class="justify-self-end">
                <img src="../../../assets/No.svg" alt="">
            </RouterLink>
            <div class=" py-4 px-16">
                <h1 class="text-4xl font-bold tracking-wider justify-self-center text-yellow-600">RESET PASSWORD {{ firebaseUser?.uid }}
                </h1>
                <div v-if="error">
                    <p class="text-red-600">{{ error.message }}</p>
                </div>

                <div class="mt-6 place-self-center w-full">
                    <label for="email" class="text-md block font-semibold tracking-wider dark:text-gray-200">
                        Email address
                    </label>
                    <input type="email" name="email" id="email" placeholder="youremail@example.com"
                        class="mt-1 w-full border-3 bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
                        v-model="email" />
                </div>

                <button
                    class="mt-6 w-full  border-2 border-yellow-600 bg-yellow-600 py-2 px-4 font-semibold hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">
                    RESET PASSWORD
                </button>
                <div class="flex justify-center">
                    <RouterLink
                        class="mt-1 inline-block rounded text-sm text-yellow-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200 dark:text-yellow-200"
                        to="/auth/login">
                        Remembered your password?
                    </RouterLink>
                </div>
            </div>
            
        </div>
    </form>
</template>

<script lang="ts">
import { ref } from 'vue'
import { type AuthError } from 'firebase/auth'
import router from '@/router'

import useFirebase from '@/composables/useFirebase'
import { X } from 'lucide-vue-next'

export default {
    components: { X },

    setup() {
        // Composables
        const { resetPassword } = useFirebase()
        const email = ref<string>('')
        const error = ref<AuthError | null>(null)
        const sendEmail = ref<boolean>(false)

        const handleResetPassword = () => {
            resetPassword(email.value).then(() => {
                // TODO: show notification
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