<template>
  <form @submit.prevent="handleRegister" class="w-screen h-screen grid">
    <div class="grid bg-neutral-800 p-4 place-self-center">
      <RouterLink to="/" class="justify-self-end">
        <img src="../../../assets/No.svg" alt="">
      </RouterLink>
      <div class=" py-4 px-16 grid">
        <h1 class="text-4xl font-bold tracking-wider justify-self-center text-yellow-600">REGISTER</h1>

        <div v-if="error">
          <p class="text-red-600">{{ error.message }}</p>
        </div>

        <div class="mt-6">
          <label
            for="nickname"
            class="text-md block font-semibold tracking-wider text-white dark:text-gray-200"
          >
            Name
          </label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            placeholder="Your name"
            class="mt-1 block border-3 text-white bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
            v-model="newUser.name"
            />
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
            placeholder="youremail@example.com"
            class="mt-1 block border-3 text-white bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
            v-model="newUser.email"
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
            placeholder="Your password"
            class="mt-1 block border-3 text-white bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
            v-model="newUser.password"
            />
        </div>

        <button
          class="mt-6 w-full  border-2 border-yellow-600 bg-yellow-600 py-2 px-4 font-semibold text-white hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300"
        >
          REGISTER
        </button>
        <div class="flex justify-center">
          <RouterLink
            class="mt-1 inline-block rounded text-sm text-yellow-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 dark:text-blue-200"
            to="/auth/login"
          >
            Already have an account?
          </RouterLink>
        </div>
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
  setup() { // <-- was script
    // Composables
    const { register } = useFirebase()

    const newUser = ref({
      name: '',
      password: '',
      email: '',
    })
    const error = ref<AuthError | null>(null)

    const handleRegister = () => {
      register(newUser.value.name, newUser.value.email, newUser.value.password)
      .then(() => { 
        console.log('Registered!')
        router.push('/')
      })
      .catch((err) => {
        error.value = err
      })
    }

    return {
      newUser,
      error,

      handleRegister,
    }
  },
}
</script>