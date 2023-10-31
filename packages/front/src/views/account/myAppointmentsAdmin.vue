<template>
    <div class="flex w-full h-screen items-center">
        <NavigationAccount />
        <div class="w-full grid h-96 mt-4 px-24">
            <h1 class="text-5xl Raleway-bold">{{ $t('account.myAccount.hello') }} {{firebaseUser?.displayName}}</h1>
            <ul class="w-full mt-4">
                <li class="p-2 border-y-slate-700 border-b-2 flex justify-between">
                    <p>Services</p>
                    <p>Date</p>
                    <p>Time</p>
                </li>
                <li v-for="appointment in getAppointmentsResult?.appointmentsByHairdresserId" class="p-2 border-y-slate-700 border-b-2">
                    <div class="flex justify-between" @click="toggleShowOverlay()">
                        <p>{{ appointment.services[0].name }}</p>
                        <p>{{ appointment.date }}</p>
                        <p>{{ appointment.isCompleted }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div v-if="showOverlay" class="grid">
        <div class="absolute w-screen h-screen z-50 top-0 left-0 bg-black opacity-60 "></div>
        <div class="bg-neutral-800 z-50 absolute w-full justify-self-center max-w-xl top-40 p-4">
            <button @click="toggleShowOverlay()">
                <X class="w-8 h-8 text-white absolute top-2 right-2" />
            </button>
            <div class="grid columns-2">
                <div class="col-span-2 text-center">
                    datum
                </div>
                <div>
                    <h1 class="text-4xl">Customer</h1>
                    pieter
                </div>
                <div>
                    <h1 class="text-4xl">Completed</h1>
                    <input type="checkbox" name="completed" id="completed">
                </div>
                <div>
                    <h1 class="text-4xl">Services</h1>
                    sdfdsfsdfdsfsfsdf
                </div>
                <div class="">
                    <h1 class="text-4xl">Supplies Needed</h1>
                    sdfsfsfsfdsf
                </div> 
                <div>
                    <h1 class="text-4xl">Extra's</h1>             
                </div>
               
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import NavigationAccount from '@/components/navigationAccount.vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_ALL_APPOINTMENTS_BY_HAIRDRESSER_ID } from '@/graphql/appointments.query';
import useFirebase from '@/composables/useFirebase';
import { ref } from 'vue';
import { X } from 'lucide-vue-next'

const { firebaseUser } = useFirebase()

const showOverlay = ref(false);

const toggleShowOverlay = () => {
    showOverlay.value = !showOverlay.value;
}

//TODO: get appointents in detail

//TODO: get the hairdresser id
const {result: getAppointmentsResult, loading } = useQuery(GET_ALL_APPOINTMENTS_BY_HAIRDRESSER_ID, {
    id: "652fd58239d9756ff8009ab9"
})



</script>