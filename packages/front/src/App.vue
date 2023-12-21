<script lang="ts">
import { provide } from 'vue';
import useGraphql from './composables/useGraphql';
import { DefaultApolloClient } from '@vue/apollo-composable';
import useCustomUser from './composables/useCustomUser';
import { useI18n } from 'vue-i18n';
import useLanguage from './composables/useLanguage';
import { SUPPORTED_LOCALES } from './bootstrap/i18n';


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

    return{}
  },
}

</script>

<template>
  <div class="bg-neutral-900 text-white font-bold">
    <RouterView />
  </div>
</template>