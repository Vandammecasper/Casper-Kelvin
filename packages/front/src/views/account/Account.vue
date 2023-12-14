<template>
    <div @submit.prevent="handleUpdateProfile" class="sm:flex w-full h-screen items-center">
        <NavigationAccount />   
        <div class="w-full grid justify-items-center h-80 mt-2 sm:mt-8">
            <h1 class="text-3xl md:text-4xl lg:text-5xl Raleway-bold">{{ $t('account.myAccount.hello') }} {{firebaseUser?.displayName}}</h1>
            <p class="max-md:text-sm Raleway text-yellow-600">{{ getPointByUidResult?.pointByUid.usablePoints }} {{ $t('account.myAccount.points') }}</p>
            <p class="max-md:text-sm Raleway text-yellow-600">{{ getPointByUidResult?.pointByUid.totalPoints }} {{ $t('account.myAccount.points') }}</p>
            <p class="max-md:text-sm Raleway text-yellow-600">#{{ getRangResult?.rank }} {{ $t('account.myAccount.place') }}</p>
            <div class="w-full grid grid-cols-2 gap-4 lg:gap-8 px-8 lg:px-16 xl:px-48">
                <div>
                    <div class="mt-6">
                        <label
                            for="username"
                            class="text-sm sm:text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
                        >
                            {{ $t('account.myAccount.name') }}
                        </label>
                        <input
                            type="text"
                            name="nickname"
                            id="nickname"
                            autocomplete="false"
                            :placeholder= "firebaseUser?.displayName ? firebaseUser?.displayName : $t('auth.name_placeholder') "
                            v-model="user.name"
                            class="Raleway mt-1 block border-3 w-full  bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
                        />
                    </div>
                    <div class="mt-6">
                        <label
                            for="password"
                            class="text-sm sm:text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
                        >
                            {{ $t('account.myAccount.password') }}
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder=""
                            v-model="user.password"
                            class="Raleway mt-1 block border-3 w-full  bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
                        />
                    </div>
                    <div class="mt-6">
                        <label
                            class="text-sm sm:text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
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
                    class="Raleway-bold mt-9.5 sm:mt-10.5 md:mt-6 w-full  border-2 border-red-500 bg-red-500 py-2 px-4 font-semibold hover:bg-red-600 focus:outline-none focus-visible:border-red-500 focus-visible:bg-red-600 focus-visible:ring-2 focus-visible:ring-red-300"
                    >
                        {{ $t('account.myAccount.logout') }}
                    </button>
                </div>
                <div>
                    <div class="mt-6">
                        <label
                            for="email"
                            class="text-sm sm:text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
                        >
                            {{ $t('account.myAccount.emailAddress') }}
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autocomplete="email"
                            :placeholder= "firebaseUser?.email ? firebaseUser?.email : 'Your email'"
                            v-model="user.email"
                            class="Raleway mt-1 block border-3 w-full  bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
                        />
                    </div>
                    <div class="mt-7 sm:mt-6">
                        <label
                            for="confirmpassword"
                            class="text-xs sm:text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
                        >
                            {{ $t('account.myAccount.confirmPassword') }}
                        </label>
                        <input
                            type="password"
                            name="confirmpassword"
                            id="confirmpassword"
                            placeholder=""
                            v-model="user.confirmPassword"
                            class="Raleway mt-1 block border-3 w-full  bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
                        />
                    </div>
                    <div class="mt-6">
                        <label
                            for="public"
                            class="text-xs sm:text-sm lg:text-md block font-semibold tracking-wider dark:text-gray-200 Raleway"
                        >
                            {{ $t('account.myAccount.publicShowOfPoints') }}
                        </label>
                        <input
                            type="checkbox"
                            name="public"
                            v-model="user.isPublic"
                            class="Raleway mt-1 block border-3 w-full mb-5  bg-neutral-800 border-neutral-500 p-2 focus:outline-none focus-visible:ring-2 focus-visible:border-yellow-600 focus-visible:ring-yellow-600"
                        >
                    </div>
                    <button type="submit"
                    @click="handleUpdateProfile"
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
import { GET_POINT_BY_UID, GET_RANK } from '@/graphql/points.query'
import { useQuery } from '@vue/apollo-composable'
import NavigationAccount from '@/components/navigationAccount.vue'
import { ref } from 'vue'

const { firebaseUser, logout, updateAccount } = useFirebase()
// const { customUser } = useCustomUser()
const { replace } = useRouter()

const user = ref({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isPublic: false,
    language: 'en'
})

const logoutUser = () => {
    logout().then(() => {
        replace({ path: '/' })
    })
}

const handleUpdateProfile = () => {
    console.log('update profile')
    if(user.value.name != '' && user.value.email != '' && user.value.password != '' && user.value.confirmPassword != '') {
        if(user.value.password == user.value.confirmPassword) {
            console.log('update profile')
            console.log(user.value)
            // updateAccount(user.value.name, user.value.email, user.value.password)
            // .then(() => {
            //     alert('Profile updated')
            // })
        } else {
            alert('Passwords do not match')
        }
    } else {
        alert('Please fill in all fields')
    
    }
}

const { result: getPointByUidResult } = useQuery(GET_POINT_BY_UID);

const { result: getRangResult } = useQuery(GET_RANK)

//TODO: set to getPointsByUidResult?.value.pointByUid.isPublic
// const isPublic = ref(false)

const { setLocale } = useLanguage()
const { locale } = useI18n()

const setLanguage = (event: Event) => {
    const target = event.target as HTMLSelectElement
    //update user profile
    user.value.language = target.value
    setLocale(target.value)
}


</script>