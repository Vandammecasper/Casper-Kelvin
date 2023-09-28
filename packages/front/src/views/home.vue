<template>
    <div>
        <button v-if="firebaseUser" @click="logout">Logout</button>
    </div>
    <div class="h-screen w-screen grid">
      <img src="../../assets/barbers/Samuel.jpg" alt="" class="absolute object-cover w-screen h-screen z-0">
      <div class="object-cover w-screen h-screen z-20 absolute bg-black opacity-50"></div>
      <img src="../../assets/logo-PhotoRoom.png" alt="" class="h-96 w-96 mt-20 z-30 place-self-center">
    </div>
    <div class="flex justify-between p-16">
      <div class="w-1/2">
        <img src="../../assets/about.jpg" alt="" class="w-3/5">
      </div>
      <div class="w-1/2">
        <h1 class="text-neutral-700 text-9xl absolute z-0">ABOUT</h1>
        <h2 class="text-5xl w-3/5 mt-18 z-20">MORE THAN JUST A BARBERSHOP</h2>
        <h3 class="">BEST EQUIPMENT</h3>
        <p>Investing in the right equipment is essential for running a successful barbershop. Our carefully curated selection of top-notch tools and gear ensures that we can provide the best grooming experience for our clients.</p>
      </div>
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