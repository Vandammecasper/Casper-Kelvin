<template>
    <div class="h-screen grid ">
      <img src="../../assets/barbers/Samuel2.jpg" alt="" class="absolute object-cover w-full h-screen z-0 opacity-50 mt-10">
      <img src="../../assets/logo-PhotoRoom.png" alt="" class="h-72 sm:h-96 mt-32 z-30 place-self-center relative">
      <RouterLink to="/appointment/services" class="place-self-center max-lg:mt-8">
        <div class="border-3 lg:border-4 border-yellow-500 p-1.5 sm:p-2 relative">
          <div class="border-3 lg:border-4 border-yellow-500 p-3 sm:p-4 relative">
            <div class="text-lg md:text-lg sm:text-xl px-8 z-30 relative Raleway-bold">{{ $t('navigation.makeAppointment') }}</div>
          </div>
        </div>
      </RouterLink>
    </div>
    <div class="h-2"></div>
    <div id="about" class="h-18"></div>
    <div class="max-sm:grid sm:flex sm:justify-between p-6 md:p-8 lg:p-16">
      <div class="max-sm:hidden w-1/2">
        <img src="../../assets/about.jpg" alt="" class="w-4/5 xl:w-3/5">
      </div>
      <div class="sm:w-1/2">
        <h1 class="text-neutral-800 text-7xl md:text-8xl lg:text-9xl absolute Raleway-bold">{{ $t('home.about.about') }}</h1>
        <h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl w-5/6 xl:w-4/6 mt-9 md:mt-13.5 lg:mt-19 xl:mt-17 relative z-10 Raleway-bold">{{ $t('home.about.title') }}</h2>
        <h3 class="text-xl lg:text-2xl xl:text-3xl mt-4 md:mt-8 Raleway-bold">{{ $t('home.about.titleSM') }}</h3>
        <p class=" md:w-3/4 xl:w-2/3 mt-2 lg:text-lg Raleway">{{ $t('home.about.p') }}</p>
      </div>
    </div>
    <div class="md:grid md:grid-cols-2 mt-20 sm:mt-40">
      <div>
        <div class="grid grid-cols-2">
          <img src="../../assets/beardtrim.jpg">
          <div class="bg-black grid justify-items-center content-center max-sm:p-1.5 sm:p-6 md:p-1 lg:p-6 xl:p-8 sm:py-8 md:py-2 lg:py-4 xl:py-16">
            <h5 class="text-yellow-600 text-center sm:text-xl md:text-sm xl:text-xl Raleway-bold">{{ $t('home.about.professionalBarbershop') }}</h5>
            <p class="max-sm:text-xs md:text-xs lg:text-sm xl:text-lg text-center Raleway">{{ $t('home.about.professionalBarbershop_p') }}</p>
          </div>
        </div>
        <div class="grid grid-cols-2">
          <div class="bg-black grid justify-items-center content-center max-sm:p-1.5 sm:p-6 md:p-1 lg:p-6 xl:p-8 sm:py-8 md:py-2 lg:py-4 xl:py-16">
            <h5 class="text-yellow-600 text-center sm:text-xl md:text-sm xl:text-xl Raleway-bold">{{ $t('home.about.comfortablePlace') }}</h5>
            <p class="max-sm:text-xs md:text-xs lg:text-sm xl:text-lg text-center Raleway">{{ $t('home.about.comfortablePlace_p') }}</p>
          </div>
          <img src="../../assets/barbershop.jpg">
        </div>
      </div>
      <img src="../../assets/dryer.jpg" alt="" class="max-md:hidden">
    </div>
    <div class="h-20"></div>
    <div id="service" class=""></div>
    <div class="grid justify-items-center w-full mt-20 sm:mt-40">
      <!--
        services
      -->
      <h1 class="text-neutral-800 text-6xl sm:text-7xl md:text-8xl lg:text-9xl absolute Raleway-bold">{{ $t('home.services.services') }}</h1>
      <div class="relative z-10 w-4/5 sm:w-3/5 lg:w-3/4 xl:w-1/2 text-center">
        <h2 class="text-xl sm:text-2xl md:text-4xl mt-7.5 sm:mt-9 md:mt-12.5 lg:mt-19 mb-4 Raleway-bold">{{ $t('home.services.title') }}</h2>
        <p class="sm:text-lg md:text-2xl text-neutral-700 relative Raleway">{{ $t('home.services.p') }}</p>
      </div>
      <div class="grid sm:grid-cols-2 justify-self-center px-12 md:px-24 gap-8 sm:gap-24 mt-16">
        <div v-for="service of servicesResult?.services" :key="service.id">
          <div class="flex justify-between">
            <h3 class="text-xl lg:text-2xl Raleway-bold">{{ service.name }}</h3>
            <h3 class="text-xl lg:text-2xl Raleway-bold">€ {{ service.price }}</h3>
          </div>
          <p class="mt-2 md:text-lg text-neutral-700 Raleway">{{ service.description }}</p>
        </div>
      </div>
      <RouterLink to="/appointment/services" class="place-self-center max-lg:mt-12">
        <div class="border-3 lg:border-4 border-yellow-500 p-1.5 sm:p-2 relative">
          <div class="border-3 lg:border-4 border-yellow-500 p-3 sm:p-4 relative">
            <div class="text-lg md:text-lg sm:text-xl px-8 z-30 relative Raleway-bold">{{ $t('navigation.makeAppointment') }}</div>
          </div>
        </div>
      </RouterLink>
    </div>
    <div class=""></div>
    <div class="grid justify-items-center w-full mt-20 sm:mt-40">
        <h1 class="text-neutral-800 text-6xl sm:text-7xl md:text-8xl lg:text-9xl absolute Raleway-bold">{{ $t('home.crew.crew') }}</h1>
        <div class="relative z-10 w-4/5 sm:w-3/5 lg:w-3/4 xl:w-1/2 text-center">
          <h2 class="text-xl sm:text-2xl md:text-4xl mt-7.5 sm:mt-9 md:mt-12.5 lg:mt-19 mb-4 Raleway-bold">{{ $t('home.crew.title') }}</h2>
          <p class="sm:text-lg md:text-2xl text-neutral-700 relative Raleway">{{ $t('home.crew.p') }}</p>
        </div>
        <div class="grid grid-cols-3 mt-16 justify-self-center">
          <!-- 
            hairdressers
          -->
          <div v-for="hairdresser of hairdressersResult?.hairdressers" :key="hairdresser.id">
            <div class="grid justify-items-center">
              <div class="relative w-5/6 border-4 border-b-0 border-yellow-600">
                <img :src="'../../assets/barbers/'+hairdresser.name+'.jpg'" alt="Image" class="w-full h-auto" />
                <div class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent"></div>
              </div>
              <div class="w-5/6 bg-black h-40 border-4 border-t-0 border-yellow-600 justify-items-center grid p-4 lg:p-8">
                <h4 class="text-xl sm:text-3xl lg:text-5xl Raleway-bold text-center">{{ hairdresser.name }}</h4>
                <div v-for="service of hairdresser?.services" :key="service.id">
                  <p class="sm:text-xl lg:text-2xl text-neutral-600 Raleway text-center max-sm:mt-0.5">{{ service.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <div class="h-18"></div>
      <div id="halloffame" class="h-2"></div>
      <div class="grid justify-items-center w-full mt-20 sm:mt-40">
          <h1 class="text-neutral-800 text-5xl sm:text-7xl md:text-8xl lg:text-9xl absolute Raleway-bold">{{ $t('home.hallOfFame.hallOfFame') }}</h1>
          <div class="relative z-10 w-4/5 sm:w-3/5 lg:w-3/4 xl:w-3/4 text-center">
            <h2 class="text-xl sm:text-2xl md:text-4xl mt-5 sm:mt-9 md:mt-12.5 lg:mt-19 mb-4 Raleway-bold">{{ $t('home.hallOfFame.title') }}</h2>
            <p class="sm:text-lg md:text-2xl text-neutral-700 relative Raleway">{{ $t('home.hallOfFame.p') }}</p>
          </div>
          <div class="grid grid-cols-3 w-full mt-16 px-4 sm:px-6 md:px-16 lg:px-32">
            <div v-if="scoreBoardResult?.pointsPublic[1]" class="mt-24 grid">
              <h3 class="Raleway-bold justify-self-center text-xl sm:text-4xl">{{ scoreBoardResult?.pointsPublic[1].userName }}</h3>
              <div class="bg-gradient-to-t from-transparent to-gray-300 h-40 sm:h-64 grid mt-4">
                <h4 class="Raleway-bold justify-self-center mt-8 text-4xl sm:text-5xl">{{ scoreBoardResult?.pointsPublic[1].totalPoints }}</h4>
              </div>
            </div>
            <div v-else class="mt-24 grid">
              <h3 class="Raleway-bold justify-self-center text-xl sm:text-4xl">/</h3>
              <div class="bg-gradient-to-t from-transparent to-gray-300 h-40 sm:h-64 grid mt-4">
                <h4 class="Raleway-bold justify-self-center mt-8 text-4xl sm:text-5xl">/</h4>
              </div>
            </div>
            <div v-if="scoreBoardResult?.pointsPublic[0]" class="grid">
              <h3 class="Raleway-bold justify-self-center text-xl sm:text-4xl">{{ scoreBoardResult?.pointsPublic[0].userName }}</h3>
              <div class="bg-gradient-to-t from-transparent to-yellow-600 h-56 sm:h-80 grid">
                <h4 class="Raleway-bold justify-self-center mt-8 text-4xl sm:text-5xl">{{ scoreBoardResult?.pointsPublic[0].totalPoints }}</h4>
              </div>
            </div>
            <div v-else class="mt-24 grid">
              <h3 class="Raleway-bold justify-self-center text-xl sm:text-4xl">/</h3>
              <div class="bg-gradient-to-t from-transparent to-yellow-600 h-56 sm:h-80 grid">
                <h4 class="Raleway-bold justify-self-center mt-8 text-4xl sm:text-5xl">/</h4>
              </div>
            </div>
            <div v-if="scoreBoardResult?.pointsPublic[2]" class="mt-40 grid">
              <h3 class="Raleway-bold justify-self-center text-xl sm:text-4xl">{{ scoreBoardResult?.pointsPublic[2].userName }}</h3>
              <div class="bg-gradient-to-t from-transparent to-amber-800 h-24 sm:h-48 grid">
                <h4 class="Raleway-bold justify-self-center mt-8 text-4xl sm:text-5xl">{{ scoreBoardResult?.pointsPublic[2].totalPoints }}</h4>
              </div>
            </div>
            <div v-else class="mt-24 grid">
              <h3 class="Raleway-bold justify-self-center text-xl sm:text-4xl">/</h3>
              <div class="bg-gradient-to-t from-transparent to-amber-800 h-24 sm:h-48 grid">
                <h4 class="Raleway-bold justify-self-center mt-8 text-4xl sm:text-5xl">/</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full bg-black h-56 mt-20 sm:mt-40 grid grid-cols-3 p-4 md:p-8 justify-items-center">
          <div class="grid justify-items-center">
            <h2 class="Raleway-bold text-center text-lg sm:text-2xl md:text-3xl">{{ $t('footer.information') }}</h2>
            <div class="flex gap-2">
              <img src="../../assets/icons/Places.svg" alt="" class="h-4 max-md:mt-1.5">
              <p class="Raleway text-xs text-center">946 Smoky Hollow Dr. Windermere, FL 34786</p>
            </div>
            <div class="flex gap-2">
              <img src="../../assets/icons/Places.svg" alt="" class="h-4">
              <p class="Raleway text-xs text-center">539 School Ave. Laurel, MD 20707</p>
            </div>
            <div class="flex gap-2">
              <img src="../../assets/icons/Phone.svg" alt="" class="h-4">
              <p class="Raleway text-xs">(212) 658-3916</p>
            </div>
          </div>
          <img src="../../assets/logo-PhotoRoom.png" alt="" class="max-sm:mt-12 h-24 sm:h-40">
          <div class="grid justify-items-center">
            <h2 class="Raleway-bold text-center text-lg sm:text-2xl md:text-3xl">{{ $t('footer.openingHours') }}</h2>
            <div class="sm:flex sm:gap-4 md:gap-8">
              <p class="Raleway text-xs">Mon - Fri:</p>
              <div class="flex gap-1">
                <img src="../../assets/icons/time.svg" alt="" class="h-4">
                <p class="Raleway text-xs">9.00 AM - 5.00 PM</p>
              </div>
            </div>
            <div class="sm:flex sm:gap-4 md:gap-8">
              <p class="Raleway text-xs">Sat - Sun:</p>
              <div class="flex gap-1">
                <img src="../../assets/icons/time.svg" alt="" class="h-4">
                <p class="Raleway text-xs">9.00 AM - 1.00 PM</p>
              </div>
            </div>
            <div class="sm:flex sm:gap-1 md:gap-8">
              <p class="Raleway text-xs sm:ml-2">Holiday:</p>
              <div class="flex gap-1">
                <img src="../../assets/icons/time.svg" alt="" class="h-4 sm:ml-2">
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