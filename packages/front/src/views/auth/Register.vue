<template>
  <form @submit.prevent="handleRegister" class="w-screen h-screen grid p-4">
    <div class="grid bg-neutral-800 p-4 place-self-center">
      <RouterLink to="/" class="justify-self-end">
        <img src="../../../assets/No.svg" alt="">
      </RouterLink>
      <div class="py-1 sm:py-4 px-6 sm:px-16 grid">
        <h1 class="text-3xl sm:text-4xl font-bold tracking-wider justify-self-center text-yellow-600 Raleway-bold">  {{ $t('auth.register') }}</h1>

        <div v-if="error">
          <p class="text-red-600 Raleway-bold">{{ error.message }}</p>
        </div>

        <div class="mt-4 sm:mt-6">
          <label
            for="nickname"
            class="text-md block font-semibold tracking-wider  dark:text-gray-200 Raleway"
          >
            {{ $t('auth.name') }}
          </label>
          <input
            type="text"
            name="nickname"
            id="nickname"
            placeholder="Your name"
            class="Raleway mt-1 block border-3 bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
            v-model="newUser.name"
            />
        </div>

        <div class="mt-4 sm:mt-6">
          <label
            for="email"
            class="text-md block font-semibold tracking-wider  dark:text-gray-200 Raleway"
          >
            {{ $t('auth.emailAddress') }}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="youremail@example.com"
            class="Raleway mt-1 block border-3 bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
            v-model="newUser.email"
          />
        </div>

        <div class="mt-4 sm:mt-6">
          <label
            for="password"
            class="text-md block font-semibold tracking-wider  dark:text-gray-200 Raleway"
          >
            {{ $t('auth.password') }}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Your password"
            class="Raleway mt-1 block border-3 bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
            v-model="newUser.password"
            />
        </div>

        <div class="mt-4 sm:mt-6">
          <label class="block" for="language">{{ $t('auth.selectLanguage') }}</label>
          <select
            class="block mb-3 text-black"
            name="language"
            id="language"
            @change="setLanguage"
            :value="locale"
          >
            <option v-for="(value, key) in SUPPORTED_LOCALES" :value="key" class="text-black">
              {{ value }}
            </option>
          </select>
        </div>

        <div class="mt-4">
          <div class="flex gap-3">
            <label class="block" for="isPublic">Public Points</label>
            <Tooltip content="Other people can see your total points if you check this box.">
              <HelpCircleIcon class="w-5 h-5 text-white" />
            </Tooltip>
          </div>
          <button type="button" @click="useIsPublic" class="mt-1 w-6 h-6 bg-transparent border-2 border-white grid place-content-center">
              <img v-if="isPublic" src="../../../assets/icons/cross.svg" alt="">
          </button>
        </div>

        <button
          class="Raleway-bold mt-6 w-full  border-2 border-yellow-600 bg-yellow-600 py-2 px-4 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300"
        >
          {{ $t('auth.register') }}
        </button>
        <div class="flex justify-center">
          <RouterLink
            class="Raleway-bold mt-2 inline-block rounded text-sm text-yellow-600 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 dark:text-blue-200"
            to="/auth/login"
          >
           {{ $t('auth.alreadyHaveAccount') }}
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
import type { CustomUser } from '@/interfaces/custom.user.interface'
import { useMutation } from '@vue/apollo-composable'
import { ADD_USER } from '@/graphql/user.mutation'
import useLanguage from '@/composables/useLanguage'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES } from '@/bootstrap/i18n'
import { HelpCircleIcon } from 'lucide-vue-next'
import Tooltip from '../../components/tooltip.vue';

export default {
  setup() { // <-- was script
    // Composables
    const { register } = useFirebase()
    const { customUser } = useCustomUser()
    const isPublic = ref(false)

    const useIsPublic = () => {
      isPublic.value = !isPublic.value
      console.log(isPublic.value)
    }

    const newUser = ref({
      name: '',
      password: '',
      email: '',
      locale: '',
    })
    const error = ref<AuthError | null>(null)

    const {
      mutate: addUser,
      loading: addUserLoading,
      onDone: userCreated,
    } = useMutation<CustomUser>(ADD_USER)

    const handleRegister = () => {
      register(newUser.value.name, newUser.value.email, newUser.value.password)
      .then(() => { 
        // console.log('Registered!')
        // router.push('/')
        addUser({
            createUserInput: {
              locale: newUser.value.locale,
              isPublic: isPublic.value,
            },
        }).then(result => {
            if (!result?.data) throw new Error('Custom user creation failed.')

            customUser.value = result.data
            router.push('/')
          })
      })
      .catch((err) => {
        error.value = err
      })
    }

    const { setLocale } = useLanguage()
    const { locale } = useI18n()

    const setLanguage = (event: Event) => {
      const target = event.target as HTMLSelectElement
      newUser.value.locale = target.value
      // setLocale(target.value)
    }

    return {
      newUser,
      error,
      setLanguage,
      locale,
      SUPPORTED_LOCALES,

      isPublic,
      useIsPublic,
      handleRegister,
    }
  },
  components: {
    HelpCircleIcon,
    Tooltip,
  },
}
</script>