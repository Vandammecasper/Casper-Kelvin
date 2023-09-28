<template>
    <div>
      Hello 👋🏼
      <p v-if="firebaseUser">Logged in user: {{ firebaseUser.displayName }}</p>
        <button v-if="firebaseUser" @click="logout">Logout</button>
      <RouterLink
        v-else
        class="mt-3 inline-block rounded text-center text-sm text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200"
        to="/auth/login"
      >
        Login
      </RouterLink>
    </div>
  </template>

<script lang="ts">
import { ref } from 'vue'
import { type AuthError } from 'firebase/auth'

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