<template>
    <div @submit.prevent="handleUpdateProfile" class="flex w-full h-screen items-center">
        <NavigationAccount />   
        <div class="w-full grid justify-items-center h-80 mt-8">
            <h1 class="text-5xl Raleway-bold">{{ $t('account.myAccount.hello') }} {{firebaseUser?.displayName}}</h1>
            <p class=" Raleway text-yellow-600">{{ getPointByUidResult?.pointByUid.usablePoints }} {{ $t('account.myAccount.points') }}</p>
            <p class=" Raleway text-yellow-600">{{ getPointByUidResult?.pointByUid.totalPoints }} {{ $t('account.myAccount.points') }}</p>
            <p class=" Raleway text-yellow-600">#{{ getRangResult?.rank }} {{ $t('account.myAccount.place') }}</p>
            <div class="w-full grid grid-cols-2 gap-8 px-48">
                <div>
                    <div class="mt-6">
                        <label
                            for="username"
                            class="text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
                        >
                            {{ $t('account.myAccount.name') }}
                        </label>
                        <input
                            type="text"
                            name="nickname"
                            id="nickname"
                            autocomplete="false"
                            :placeholder= "firebaseUser?.displayName ? firebaseUser?.displayName : $t('auth.name_placeholder') "
                            class="Raleway mt-1 block border-3 w-full  bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
                        />
                    </div>
                    <div class="mt-6">
                        <label
                            for="password"
                            class="text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
                        >
                            {{ $t('account.myAccount.password') }}
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder=""
                            class="Raleway mt-1 block border-3 w-full  bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
                        />
                    </div>
                    <div class="mt-6">
                        <label
                            class="text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
                        >
                            {{ $t('account.myAccount.language') }}
                        </label>
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
                    <button @click="logoutUser"
                    class="Raleway-bold mt-6 w-full  border-2 border-red-500 bg-red-500 py-2 px-4 font-semibold hover:bg-red-600 focus:outline-none focus-visible:border-red-500 focus-visible:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-300"
                    >
                        {{ $t('account.myAccount.logout') }}
                    </button>
                </div>
                <div>
                    <div class="mt-6">
                        <label
                            for="email"
                            class="text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
                        >
                            {{ $t('account.myAccount.emailAddress') }}
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            :placeholder= "firebaseUser?.email ? firebaseUser?.email : 'Your email'"
                            class="Raleway mt-1 block border-3 w-full  bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
                        />
                    </div>
                    <div class="mt-6">
                        <label
                            for="confirmpassword"
                            class="text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
                        >
                            {{ $t('account.myAccount.confirmPassword') }}
                        </label>
                        <input
                            type="password"
                            name="confirmpassword"
                            id="confirmpassword"
                            placeholder=""
                            class="Raleway mt-1 block border-3 w-full  bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
                        />
                    </div>
                    <div class="mt-6">
                        <label
                            for="public"
                            class="text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
                        >
                            {{ $t('account.myAccount.publicShowOfPoints') }}
                        </label>
                        <input
                            type="checkbox"
                            name="public"
                            v-model="isPublic"
                            class="Raleway mt-1 block border-3 w-full mb-5  bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
                        >
                    </div>
                    <button type="submit"
                    class="Raleway-bold mt-6 w-full  border-2 border-yellow-600 bg-yellow-600 py-2 px-4 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300"
                    >
                        {{ $t('account.myAccount.save') }}
                    </button>
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

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useFirebase from '@/composables/useFirebase'
import useLanguage from '@/composables/useLanguage'
import { useI18n } from 'vue-i18n'
import { SUPPORTED_LOCALES } from '@/bootstrap/i18n'
import useCustomUser from '@/composables/useCustomUser'
import { GET_POINT_BY_UID, GET_RANK } from '@/graphql/points.query'
import { useQuery } from '@vue/apollo-composable'
import NavigationAccount from '@/components/navigationAccount.vue'
import { ref } from 'vue'

const { firebaseUser, logout } = useFirebase()
// const { customUser } = useCustomUser()
const { replace } = useRouter()

const logoutUser = () => {
    logout().then(() => {
        replace({ path: '/' })
    })
}

const handleUpdateProfile = () => {
    console.log('update profile')
}

const { result: getPointByUidResult } = useQuery(GET_POINT_BY_UID)

const { result: getRangResult } = useQuery(GET_RANK)

//TODO: fix isPublic placholder for checkbox
console.log(getPointByUidResult.value?.pointByUid.isPublic, "getRangResult")
const isPublic = ref(getPointByUidResult.value?.pointByUid.isPublic)

// console.log(getPointByUidResult?.pointByUid.usablePoints, "getRangResult")

const { setLocale } = useLanguage()
const { locale } = useI18n()

const setLanguage = (event: Event) => {
    const target = event.target as HTMLSelectElement
    //update user profile
    setLocale(target.value)
}

</script>