<template>
    <div>
        <button v-if="firebaseUser" @click="logout">Logout</button>
    </div>
    <div class="h-screen w-screen grid">
      <img src="../../assets/barbers/Samuel.jpg" alt="" class="absolute object-cover w-screen h-screen z-0">
      <div class="object-cover w-screen h-screen z-20 absolute bg-black opacity-50"></div>
      <img src="../../assets/logo-PhotoRoom.png" alt="" class="h-96 w-96 mt-20 z-30 place-self-center relative">
      <RouterLink to="/appointment" class="place-self-center">
        <div class="border-4 border-yellow-500 p-2 relative">
          <div class="border-4 border-yellow-500 p-4 relative">
            <div class="text-xl px-8 z-30 relative">MAKE AN APPOINTMENT</div>
          </div>
        </div>
      </RouterLink>
    </div>
    <div class="flex justify-between p-16 mt-40">
      <div class="w-1/2">
        <img src="../../assets/about.jpg" alt="" class="w-3/5">
      </div>
      <div class="w-1/2">
        <h1 class="text-neutral-800 text-9xl absolute">ABOUT</h1>
        <h2 class="text-5xl w-3/5 mt-18 relative z-10">MORE THAN JUST A BARBERSHOP</h2>
        <h3 class="text-3xl mt-8">BEST EQUIPMENT</h3>
        <p class="w-2/3 mt-2 text-lg">Investing in the right equipment is essential for running a successful barbershop. Our carefully curated selection of top-notch tools and gear ensures that we can provide the best grooming experience for our clients.</p>
      </div>
    </div>
    <div class="grid grid-cols-2 mt-40">
      <div>
        <div class="grid grid-cols-2">
          <img src="../../assets/beardtrim.jpg" alt="">
          <div class="bg-black grid justify-items-center p-8 py-16">
            <h5 class="text-yellow-600 text-xl">PROFESSIONAL BARBERSHOP</h5>
            <p class="text-lg text-center">Our expert barbers deliver impeccable cuts, classic shaves, and a touch of elegance, ensuring you leave looking and feeling your best. Experience the pinnacle of grooming excellence with us.</p>
          </div>
        </div>
        <div class="grid grid-cols-2">
          <div class="bg-black grid justify-items-center p-8 py-16">
            <h5 class="text-yellow-600 text-xl">A COMFORTABLE PLACE</h5>
            <p class="text-lg text-center">At The Barber, your comfort is our priority. Enjoy a tranquil atmosphere while our skilled barbers work their magic. Sit back, unwind, and leave feeling rejuvenated.</p>
          </div>
          <img src="../../assets/barbershop.jpg" alt="">
        </div>
      </div>
      <img src="../../assets/dryer.jpg" alt="">
    </div>
    <div class="grid justify-items-center w-screen mt-40">
      <h1 class="text-neutral-800 text-9xl absolute">SERVICES</h1>
      <div class="relative z-10 w-1/2 text-center">
        <h2 class="text-4xl mt-20 mb-4">GET A GREAT HAIRCUT AT THE BARBER</h2>
        <p class="text-2xl text-neutral-700 relative">Visit us at The Barber for a haircut that defines your style. Our skilled barbers ensure every visit leaves you looking your absolute best.</p>
      </div>
      <div class="grid grid-cols-2 justify-self-center px-24 gap-24 mt-16">
        <div>
          <div class="flex justify-between">
            <h3 class="text-2xl">Simple Haircut</h3>
            <h3 class="text-2xl">€ 19.99</h3>
          </div>
          <p class="mt-2 text-lg text-neutral-700">we believe in the power of a simple haircut done right. Experience the beauty of effortless style with us.</p>
        </div>
        <div>
          <div class="flex justify-between">
            <h3 class="text-2xl">Beard Trim</h3>
            <h3 class="text-2xl">€ 17.95</h3>
          </div>
          <p class="mt-2 text-lg text-neutral-700">Enhance your appearance with a precise beard trim. Our skilled barbers sculpt and refine, giving you the confidence to conquer the day.</p>
        </div>
      </div>
      <div class="grid grid-cols-2 justify-self-center mt-16 px-24 gap-24">
        <div>
          <div class="flex justify-between">
            <h3 class="text-2xl">Razor Shave</h3>
            <h3 class="text-2xl">€ 15.95</h3>
          </div>
          <p class="mt-2 text-lg text-neutral-700">Indulge in the luxury of a razor shave. Our expert barbers deliver precision and perfection, leaving your skin irresistibly smooth.</p>
        </div>
        <div>
          <div class="flex justify-between">
            <h3 class="text-2xl">Beard Sculpt</h3>
            <h3 class="text-2xl">€ 24.95</h3>
          </div>
          <p class="mt-2 text-lg text-neutral-700">With our expert 'Beard Sculpt' service, we artfully shape and style your beard, giving you a distinguished and personalized look that leaves a lasting impression.</p>
        </div>
      </div>
      <div class="grid grid-cols-2 justify-self-center p-16 px-24 gap-24">
        <div>
          <div class="flex justify-between">
            <h3 class="text-2xl">Hair Coloring</h3>
            <h3 class="text-2xl">€ 35.99</h3>
          </div>
          <p class="mt-2 text-lg text-neutral-700">Revitalize your look with our expert hair coloring services. From subtle enhancements to bold transformations, we bring your desired shades to life.</p>
        </div>
        <div>
          <div class="flex justify-between">
            <h3 class="text-2xl">Neck Clean Up</h3>
            <h3 class="text-2xl">€ 12.95</h3>
          </div>
          <p class="mt-2 text-lg text-neutral-700">Elevate your look with a crisp neck clean-up. Our attention to detail ensures your style is sharp and refined.</p>
        </div>
      </div>
      <RouterLink to="/appointment" class="">
        <div class="border-4 border-yellow-600 p-2">
          <div class="border-4 border-yellow-600 p-4">
            <div class="text-xl px-8 z-30">MAKE AN APPOINTMENT</div>
          </div>
        </div>
      </RouterLink>
    </div>
    <div class="grid justify-items-center w-screen mt-40">
        <h1 class="text-neutral-800 text-9xl absolute">THE CREW</h1>
        <div class="relative z-10 w-1/2 text-center">
          <h2 class="text-4xl mt-20 mb-4">MEET OUR AMAZING TEAM</h2>
          <p class="text-2xl text-neutral-700 relative">Discover the talent behind the magic. Our dedicated barber crew is here to turn your grooming vision into reality.</p>
        </div>
        <div class="grid grid-cols-3 mt-16 justify-self-center">
          <div class="grid justify-items-center">
            <div class="relative w-5/6 border-4 border-b-0 border-yellow-600">
              <img src="../../assets/barbers/Samue.jpg" alt="Image" class="w-full h-auto" />
              <div class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
            </div>
            <div class="w-5/6 bg-black h-32 border-4 border-t-0 border-yellow-600 justify-items-center grid p-4">
              <h4 class="text-5xl">Samuel</h4>
              <p class="text-2xl text-neutral-600">BARBER</p>
            </div>
          </div>
          <div class="grid justify-items-center">
              <div class="relative w-5/6 border-4 border-b-0 border-yellow-600">
                <img src="../../assets/barbers/Sofie.jpg" alt="Image" class="w-full h-auto" />
                <div class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
              </div>
              <div class="w-5/6 bg-black h-32 border-4 border-t-0 border-yellow-600 justify-items-center grid p-4">
                <h4 class="text-5xl">Sofie</h4>
                <p class="text-2xl text-neutral-600">BARBER</p>
              </div>
            </div>
          <div class="grid justify-items-center">
              <div class="relative w-5/6 border-4 border-b-0 border-yellow-600">
                <img src="../../assets/barbers/Jeff.jpg" alt="Image" class="w-full h-auto" />
                <div class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
              </div>
              <div class="w-5/6 bg-black h-32 border-4 border-t-0 border-yellow-600 justify-items-center grid p-4">
                <h4 class="text-5xl">Jeff</h4>
                <p class="text-2xl text-neutral-600">BEARD DETAILER</p>
              </div>
            </div>
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