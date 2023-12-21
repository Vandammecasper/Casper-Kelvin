<template>
  <form @submit.prevent="handleLogin" class="w-screen h-screen grid">
    <div class="grid bg-neutral-800 p-4 place-self-center">
      <RouterLink to="/" class="justify-self-end">
        <img src="/No.svg" alt="">
      </RouterLink>
      <div class=" py-4 px-10 sm:px-16 grid">
        <h1 class="text-4xl font-bold tracking-wider justify-self-center text-yellow-600 Raleway-bold">{{ $t('auth.login') }}</h1>
        <div v-if="error">
          <p class="text-red-600">{{ error.message }}</p>
        </div>

        <div class="mt-6">
          <label
            for="email"
            class="text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
          >
            {{ $t('auth.emailAddress') }}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder= "Your email"
            class="Raleway mt-1 block border-3  bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
            v-model="loginCredentials.email"
          />
        </div>
        <div class="mt-6">
          <label
            for="password"
            class="text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
          >
            {{ $t('auth.password') }}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            class="Raleway mt-1 block border-3  bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
            v-model="loginCredentials.password"
          />
          <RouterLink
            to="/auth/forgotpassword"
            class="Raleway-bold mt-1 inline-block rounded text-sm text-yellow-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200 dark:text-yellow-200"
          >
            {{ $t('auth.forgotPassword') }}
          </RouterLink>
        </div>

        <button
          class="Raleway-bold mt-6 w-full  border-2 border-yellow-600 bg-yellow-600 py-2 px-4 font-semibold hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300"
        >
          {{ $t('auth.login') }}
        </button>
        <div class="flex justify-center">
          <RouterLink
            class="Raleway-bold mt-1 inline-block rounded text-sm text-yellow-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200 dark:text-yellow-200"
            to="/auth/register"
          >
            {{ $t('auth.dontHaveAccount') }}
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

import useFirebase from '@/composables/useFirebase'
import router from '@/bootstrap/router'
import useCustomUser from '@/composables/useCustomUser'
export default {
  setup() {
    const { login, firebaseUser } = useFirebase()
    const { restoreCustomUser }= useCustomUser()

    const loginCredentials = ref({
      email: '',
      password: '',
    })
    const error = ref<AuthError | null>(null)

    const handleLogin = () => {
      login(loginCredentials.value.email, loginCredentials.value.password)
        .then(() => {
          console.log('logged in')
          restoreCustomUser().then(() => {
            router.push('/')
          })
        })
        .catch((err: AuthError) => {
          error.value = err
        })
    }

    
    return {
      loginCredentials,
      firebaseUser,
      
      error,
      handleLogin,
    }
  },
}
</script>