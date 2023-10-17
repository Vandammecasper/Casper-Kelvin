<script lang="ts">
import { provide } from 'vue';
import useGraphql from './composables/useGraphql';
import { DefaultApolloClient } from '@vue/apollo-composable';


export default {
  setup(){
    const { apolloClient } = useGraphql()

    provide(DefaultApolloClient, apolloClient)
    return{}
  },
}

</script>

<template>
  <div class="bg-neutral-900 text-white font-bold">
    <RouterView />
  </div>
</template>