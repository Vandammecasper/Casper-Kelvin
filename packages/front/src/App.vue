<script lang="ts">
import { provide } from 'vue';
import useGraphql from './composables/useGraphql';
import { DefaultApolloClient } from '@vue/apollo-composable';
import useCustomUser from './composables/useCustomUser';
import { useI18n } from 'vue-i18n';
import useLanguage from './composables/useLanguage';
import { SUPPORTED_LOCALES } from './bootstrap/i18n';
import useRealtime from './composables/useRealtime';
import { ref } from 'vue';


export default {
  setup(){
    const { apolloClient } = useGraphql()
    const { setLocale } = useLanguage()
    const { locale } = useI18n()
    const { customUser } = useCustomUser()

    provide(DefaultApolloClient, apolloClient)

    if (customUser.value?.locale) {
      setLocale(customUser.value.locale)
    } else {
      setLocale(
        navigator.languages.find(locale =>
          Object.keys(SUPPORTED_LOCALES).includes(locale),
        ) ?? locale.value,
      )
    }

    console.log('customUser.value', customUser.value?.role)
    const { on } = useRealtime()
    const newAppointmentsCount = ref(0)
    const newestAppointment = ref(null)

  on('newAppointment', (data: any) => {
    console.log('newAppointment', data)
    newAppointmentsCount.value++
    newestAppointment.value = data
  })
    return{
      newAppointmentsCount,
      newestAppointment,  
      customUser,
    }
  },
}

</script>

<template>
  <div class="bg-neutral-900 text-white font-bold">
    <RouterView />
    <a v-if="customUser?.role == 'ADMIN'" href="/account/myappointmentsadmin" class="fixed bottom-4 right-4 z-10">
      <div class="w-16 h-16 bg-neutral-950 rounded-full flex items-center justify-center">
          <img src="/icons/bell.svg" alt="Notification Bell Icon">
      </div>
      <div v-if="newAppointmentsCount == 0" class="absolute right-0 top-0 text-xl w-6 h-6 bg-red-600 rounded-full flex justify-center items-center">
          {{ newAppointmentsCount }}
      </div>
      <div v-else class="absolute right-0 top-0 text-xl w-6 h-6 bg-green-600 rounded-full flex justify-center items-center">
          {{ newAppointmentsCount }}
      </div>
    </a>
  </div>
</template>