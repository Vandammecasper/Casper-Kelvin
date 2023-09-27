<template>
  <form @submit.prevent="handleLogin" class="w-screen h-screen grid">
    <div class="grid bg-neutral-800 py-12 px-24 place-self-center">
      <h1 class="text-4xl font-bold tracking-wider justify-self-center text-yellow-600">LOGIN {{ firebaseUser?.uid }}</h1>
      <div v-if="error">
        <p class="text-red-600">{{ error.message }}</p>
      </div>

      <div class="mt-6">
        <label
          for="email"
          class="text-md block font-semibold tracking-wider text-white dark:text-gray-200"
        >
          Email address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          class="mt-1 block border-3 text-white bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
          v-model="loginCredentials.email"
        />
      </div>
      <div class="mt-6">
        <label
          for="password"
          class="text-md block font-semibold tracking-wider text-white dark:text-gray-200"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          class="mt-1 block border-3 text-white bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
          v-model="loginCredentials.password"
        />
        <RouterLink
          to="/auth/forgotpassword"
          class="mt-1 inline-block rounded text-sm text-yellow-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200 dark:text-yellow-200"
        >
          Forgot password?
        </RouterLink>
      </div>

      <button
        class="mt-6 w-full  border-2 border-yellow-600 bg-yellow-600 py-2 px-4 font-semibold text-white hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300"
      >
        LOGIN
      </button>
      <div class="flex justify-center">
        <RouterLink
          class="mt-1 inline-block rounded text-sm text-yellow-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-200 dark:text-yellow-200"
          to="/auth/register"
        >
          Don't have an account?
        </RouterLink>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { ref } from 'vue'
import { type AuthError } from 'firebase/auth'

import useFirebase from '@/composables/useFirebase'
import router from '@/router'

export default {
  setup() {
    // Composables
    const { login, firebaseUser } = useFirebase()

    // Logic
    const loginCredentials = ref({
      email: '',
      password: '',
    })
    const error = ref<AuthError | null>(null)

    const handleLogin = () => {
      login(loginCredentials.value.email, loginCredentials.value.password)
        .then(() => {
          console.log('logged in')
          router.push('/')
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