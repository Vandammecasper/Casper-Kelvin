<template>
    <div class="h-screen grid">
      <img src="../../assets/barbers/Samuel.jpg" alt="" class="absolute object-cover w-full h-screen z-0 opacity-50">
      <img src="../../assets/logo-PhotoRoom.png" alt="" class="h-96 w-96 mt-32 z-30 place-self-center relative">
      <RouterLink to="/appointment/services" class="place-self-center">
        <div class="border-4 border-yellow-500 p-2 relative">
          <div class="border-4 border-yellow-500 p-4 relative">
            <div class="text-xl px-8 z-30 relative Raleway-bold">MAKE AN APPOINTMENT</div>
          </div>
        </div>
      </RouterLink>
    </div>
    <div class="h-2"></div>
    <div id="about" class="h-18"></div>
    <div class="flex justify-between p-16">
      <div class="w-1/2">
        <img src="../../assets/about.jpg" alt="" class="w-3/5">
      </div>
      <div class="w-1/2">
        <h1 class="text-neutral-800 text-9xl absolute Raleway-bold">ABOUT</h1>
        <h2 class="text-5xl w-4/6 mt-17 relative z-10 Raleway-bold">MORE THAN JUST A BARBERSHOP</h2>
        <h3 class="text-3xl mt-8 Raleway-bold">BEST EQUIPMENT</h3>
        <p class="w-2/3 mt-2 text-lg Raleway">Investing in the right equipment is essential for running a successful barbershop. Our carefully curated selection of top-notch tools and gear ensures that we can provide the best grooming experience for our clients.</p>
      </div>
    </div>
    <div class="grid grid-cols-2 mt-40">
      <div>
        <div class="grid grid-cols-2">
          <img src="../../assets/beardtrim.jpg" alt="">
          <div class="bg-black grid justify-items-center p-8 py-16">
            <h5 class="text-yellow-600 text-xl Raleway-bold">PROFESSIONAL BARBERSHOP</h5>
            <p class="text-lg text-center Raleway">Our expert barbers deliver impeccable cuts, classic shaves, and a touch of elegance, ensuring you leave looking and feeling your best. Experience the pinnacle of grooming excellence with us.</p>
          </div>
        </div>
        <div class="grid grid-cols-2">
          <div class="bg-black grid justify-items-center p-8 py-16">
            <h5 class="text-yellow-600 text-xl Raleway-bold">A COMFORTABLE PLACE</h5>
            <p class="text-lg text-center Raleway">At The Barber, your comfort is our priority. Enjoy a tranquil atmosphere while our skilled barbers work their magic. Sit back, unwind, and leave feeling rejuvenated.</p>
          </div>
          <img src="../../assets/barbershop.jpg" alt="">
        </div>
      </div>
      <img src="../../assets/dryer.jpg" alt="" class="">
    </div>
    <div class="h-20"></div>
    <div id="service" class=""></div>
    <div class="grid justify-items-center w-full mt-40">
      <h1 class="text-neutral-800 text-9xl absolute Raleway-bold">SERVICES</h1>
      <div class="relative z-10 w-1/2 text-center">
        <h2 class="text-4xl mt-19 mb-4 Raleway-bold">GET A GREAT HAIRCUT AT THE BARBER</h2>
        <p class="text-2xl text-neutral-700 relative Raleway">Visit us at The Barber for a haircut that defines your style. Our skilled barbers ensure every visit leaves you looking your absolute best.</p>
      </div>
      <!--
         services
       -->
      <div class="grid grid-cols-2 justify-self-center px-24 gap-24 mt-16">
        <div v-for="service of servicesResult?.services" :key="service.id">
          <div class="flex justify-between">
            <h3 class="text-2xl Raleway-bold">{{ service.name }}</h3>
            <h3 class="text-2xl Raleway-bold">€ {{ service.price }}</h3>
          </div>
          <p class="mt-2 text-lg text-neutral-700 Raleway">{{ service.description }}</p>
        </div>
      </div>
      <RouterLink to="/appointment/services" class="">
        <div class="border-4 border-yellow-600 p-2">
          <div class="border-4 border-yellow-600 p-4">
            <div class="text-xl px-8 z-30 Raleway-bold">MAKE AN APPOINTMENT</div>
          </div>
        </div>
      </RouterLink>
    </div>
    <div class=""></div>
    <div id="crew" class="h-32"></div>
    <div class="grid justify-items-center w-full">
        <h1 class="text-neutral-800 text-9xl absolute Raleway-bold">THE CREW</h1>
        <div class="relative z-10 w-1/2 text-center">
          <h2 class="text-4xl mt-19 mb-4 Raleway-bold">MEET OUR AMAZING TEAM</h2>
          <p class="text-2xl text-neutral-700 relative Raleway">Discover the talent behind the magic. Our dedicated barber crew is here to turn your grooming vision into reality.</p>
        </div>
        <div class="grid grid-cols-3 mt-16 justify-self-center">
          <!-- 
            hairdressers
          -->
          <div v-for="hairdresser of hairdressersResult?.hairdressers" :key="hairdresser.id">
            <div class="grid justify-items-center">
              <div class="relative w-5/6 border-4 border-b-0 border-yellow-600">
                <img src="../../assets/barbers/Samue.jpg" alt="Image" class="w-full h-auto" />
                <div class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
              </div>
              <div class="w-5/6 bg-black h-40 border-4 border-t-0 border-yellow-600 justify-items-center grid p-8">
                <h4 class="text-5xl Raleway-bold">{{ hairdresser.name }}</h4>
                <div v-for="service of hairdresser?.services" :key="service.id">
                  <p class="text-2xl text-neutral-600 Raleway">{{ service.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <div class="h-18"></div>
      <div id="halloffame" class="h-2"></div>
      <div class="grid justify-items-center w-full mt-40">
          <h1 class="text-neutral-800 text-9xl absolute Raleway-bold">HALL OF FAME</h1>
          <div class="relative z-10 w-1/2 text-center">
            <h2 class="text-3xl mt-20 mb-4 Raleway-bold">BECOME ONE OF OUR HONORED CUSTOMERS</h2>
            <p class="text-2xl text-neutral-700 relative Raleway">Join our ranks as an honored customer. Discover the exceptional service and grooming expertise that keeps our clients coming back.</p>
          </div>
          <div class="grid grid-cols-3 w-full mt-16 px-32">
            <div v-if="scoreBoardResult?.pointsPublic[1]" class="mt-24 grid">
              <h3 class="Raleway-bold justify-self-center text-4xl">{{ scoreBoardResult?.pointsPublic[1].userName }}</h3>
              <div class="bg-gradient-to-t from-transparent to-gray-300 h-64 grid mt-4">
                <h4 class="Raleway-bold justify-self-center mt-8 text-5xl">{{ scoreBoardResult?.pointsPublic[1].totalPoints }}</h4>
              </div>
            </div>
            <div v-else class="mt-24 grid">
              <h3 class="Raleway-bold justify-self-center text-4xl">/</h3>
              <div class="bg-gradient-to-t from-transparent to-gray-300 h-64 grid mt-4">
                <h4 class="Raleway-bold justify-self-center mt-8 text-5xl">/</h4>
              </div>
            </div>
            <div v-if="scoreBoardResult?.pointsPublic[0]" class="grid">
              <h3 class="justify-self-center Raleway-bold text-4xl">{{ scoreBoardResult?.pointsPublic[0].userName }}</h3>
              <div class="bg-gradient-to-t from-transparent to-yellow-600 h-80 grid">
                <h4 class="Raleway-bold justify-self-center mt-8 text-5xl">{{ scoreBoardResult?.pointsPublic[0].totalPoints }}</h4>
              </div>
            </div>
            <div v-else class="mt-24 grid">
              <h3 class="justify-self-center Raleway-bold text-4xl">/</h3>
              <div class="bg-gradient-to-t from-transparent to-yellow-600 h-80 grid">
                <h4 class="Raleway-bold justify-self-center mt-8 text-5xl">/</h4>
              </div>
            </div>
            <div v-if="scoreBoardResult?.pointsPublic[2]" class="mt-40 grid">
              <h3 class="justify-self-center Raleway-bold text-4xl">{{ scoreBoardResult?.pointsPublic[2].userName }}</h3>
              <div class="bg-gradient-to-t from-transparent to-amber-800 h-48 grid">
                <h4 class="Raleway-bold justify-self-center mt-8 text-5xl">{{ scoreBoardResult?.pointsPublic[2].totalPoints }}</h4>
              </div>
            </div>
            <div v-else class="mt-24 grid">
              <h3 class="justify-self-center Raleway-bold text-4xl">/</h3>
              <div class="bg-gradient-to-t from-transparent to-amber-800 h-48 grid">
                <h4 class="Raleway-bold justify-self-center mt-8 text-5xl">/</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full bg-black h-56 mt-40 grid grid-cols-3 p-8 justify-items-center">
          <div class="grid justify-items-center">
            <h2 class="Raleway-bold text-3xl">Information</h2>
            <div class="flex gap-2">
              <img src="../../assets/icons/Places.svg" alt="" class="h-4">
              <p class="Raleway text-xs">946 Smoky Hollow Dr. Windermere, FL 34786</p>
            </div>
            <div class="flex gap-2">
              <img src="../../assets/icons/Places.svg" alt="" class="h-4">
              <p class="Raleway text-xs">539 School Ave. Laurel, MD 20707</p>
            </div>
            <div class="flex gap-2">
              <img src="../../assets/icons/Phone.svg" alt="" class="h-4">
              <p class="Raleway text-xs">(212) 658-3916</p>
            </div>
          </div>
          <img src="../../assets/logo-PhotoRoom.png" alt="" class="h-40">
          <div class="grid justify-items-center">
            <h2 class="Raleway-bold text-3xl">Opening Hours</h2>
            <div class="flex gap-8">
              <p class="Raleway text-xs">Mon - Fri:</p>
              <div class="flex gap-1">
                <img src="../../assets/icons/time.svg" alt="" class="h-4">
                <p class="Raleway text-xs">9.00 AM - 5.00 PM</p>
              </div>
            </div>
            <div class="flex gap-8">
              <p class="Raleway text-xs">Sat - Sun:</p>
              <div class="flex gap-1">
                <img src="../../assets/icons/time.svg" alt="" class="h-4">
                <p class="Raleway text-xs">9.00 AM - 1.00 PM</p>
              </div>
            </div>
            <div class="flex gap-8">
              <p class="Raleway text-xs ml-2">Holiday:</p>
              <div class="flex gap-1">
                <img src="../../assets/icons/time.svg" alt="" class="h-4 ml-2">
                <p class="Raleway text-xs">9.00 AM - 12.00 AM</p>
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

<script lang="ts">
import { ref } from 'vue'
import { type AuthError } from 'firebase/auth'

import useFirebase from '@/composables/useFirebase'
import useCustomUser from '@/composables/useCustomUser'
import { useQuery } from '@vue/apollo-composable'
import { GET_ALL_SERVICES } from '@/graphql/services.query'
import type { CustomService } from '@/interfaces/custom.service.interface'  
import { GET_ALL_HAIRDRESSERS } from '@/graphql/hairdressers.query'
import { GET_PUBLIC_POINTS } from '@/graphql/points.public.query'

export default {
  setup() {
    // Composables
    const { logout, firebaseUser } = useFirebase()
    const { customUser } = useCustomUser()

    
    async function getToken() {
      const token = await firebaseUser.value?.getIdToken()
      console.log(token)
      console.log(customUser.value?.role)
    }
    getToken()

    const {
      result: getServicesResult,
      loading: getServicesLoading,
    } = useQuery(GET_ALL_SERVICES)

    const {
      result: getHairdressersResult,
      loading: getHairdressersLoading,
    } = useQuery(GET_ALL_HAIRDRESSERS)

    const {
      result: getScoreBoardResult,
      loading: getScoreBoardLoading,
    } = useQuery(GET_PUBLIC_POINTS, {
        sort: true, // Pass your "sort" parameter here
    });

    return {
      servicesResult: getServicesResult,
      hairdressersResult: getHairdressersResult,
      scoreBoardResult: getScoreBoardResult,
      firebaseUser,
      logout,

    }
  },
}
</script>