<template>
    <div class="sm:flex w-full h-screen items-center">
        <NavigationAccount />
        <div class="w-full h-96 mt-4 px-8 sm:px-24">
            <h1 class="text-5xl Raleway-bold mb-4">{{ $t('account.myAccount.hello') }} {{firebaseUser?.displayName}}</h1>

            <select class="bg-neutral-900 border-white border-1 h-10 w-full" name="isOpen" id="" v-model="isOpen">
                <option class="Raleway-bold" :value="true">{{ $t('account.myAppointmentsAdmin.openAppointments') }}</option>
                <option class="Raleway-bold" :value="false">{{ $t('account.myAppointmentsAdmin.allAppointments') }}</option>
            </select>

            <div class="mt-2">
                <input id="start-picker" type="text" placeholder="Select start date" class="bg-neutral-900 border-2 mr-2 p-1">
                <input id="end-picker" type="text" placeholder="Select end date" class="bg-neutral-900 border-2 mr-2 p-1">
                <button @click="getWantedAppointments" class="lg:float-right border-3 p-1 Raleway-bold">{{ $t('account.myAppointmentsAdmin.applyFilter') }}</button>
            </div>
            <div v-if="error != ''">
                <p class="text-red-500 text-center Raleway-bold">{{ error }}</p>
            </div>
            <ul class="w-full mt-4">
                <li class="p-2 border-y-slate-700 border-b-2 flex justify-between">
                    <p class=" Raleway-bold">{{ $t('account.myAppointmentsAdmin.services') }}</p>
                    <p class=" Raleway-bold">{{ $t('account.myAppointmentsAdmin.date') }}</p>
                    <p class=" Raleway-bold">{{ $t('account.myAppointmentsAdmin.completed') }}</p>
                </li>
                <li v-for="appointment in visualAppointments" class="p-2 border-y-slate-700 border-b-2">
                    <div class="flex justify-between cursor-pointer" @click="toggleShowOverlay(), selectAppointment(appointment)">
                        <p class=" Raleway-bold">{{ appointment?.services[0].name }}</p>
                        <p class=" Raleway-bold">{{ formatDate(appointment.date) }}</p>
                        
                        <div v-if="appointment.isCompleted" class="rounded-full bg-green-600 w-7 h-7"></div>
                        <div v-else class="rounded-full bg-red-600 w-7 h-7"></div>

                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div v-if="showOverlay" class="grid">
        <div class="absolute w-screen h-screen z-50 top-0 left-0 bg-black opacity-60 "></div>
        <div class="bg-neutral-800 z-50 absolute w-full justify-self-center max-w-xl top-20 p-4">
            <button @click="toggleShowOverlay()">
                <X class="w-8 h-8 text-white absolute top-2 right-2" />
            </button>
            <div class="grid columns-2 gap-4">
                <div class="col-span-2 text-center">
                    <p class=" Raleway-bold">{{ formatDate(selectedAppointment?.date) }}</p>
                </div>
                <div>
                    <h1 class="text-4xl Raleway-bold">{{ $t('account.myAppointmentsAdmin.customer') }}</h1>
                    <p class=" Raleway">{{ selectedAppointment?.userName }}</p>
                </div>
                <div>
                    <h1 class="text-4xl Raleway-bold">{{ $t('account.myAppointmentsAdmin.completed') }}</h1>
                    <p class=" Raleway">{{ selectedAppointment?.isCompleted }}</p>
                </div>
                <div>
                    <h1 class="text-4xl Raleway-bold">{{ $t('account.myAppointmentsAdmin.services') }}</h1>
                    <div v-for="service of selectedAppointment?.services">
                        <p class=" Raleway">{{ service.name }}</p>
                    </div>
                </div>
                <div class="">
                    <h1 class="text-4xl Raleway-bold">{{ $t('account.myAppointmentsAdmin.suppliesNeeded') }}</h1>
                    <div v-for="util of getUniqueUtilities(selectedUtilities)">
                        <p class=" Raleway">{{ util }}</p>
                    </div>
                    <div v-for="util of selectedAppointment?.extra.utilities">
                        <p class=" Raleway">{{ util }}</p>
                    </div>
                </div> 
                <div>
                    <h1 class="text-4xl Raleway-bold">{{ $t('account.myAppointmentsAdmin.extras') }}</h1>   
                    <p class=" Raleway">{{ selectedAppointment?.extra.name }}</p>
                </div>
                <div>
                    <h1 class="text-4xl Raleway-bold">{{ $t('account.myAppointmentsAdmin.completeAppointment') }}</h1>   
                    <button @click="finishAppointment()" v-if="!selectedAppointment?.isCompleted" class="Raleway max-w-[200px] w-full bg-green-600">{{ $t('account.myAppointmentsAdmin.completeAppointment') }}</button>    
                    <button v-else class="Raleway max-w-[200px] w-full bg-red-600" disabled>{{ $t('account.myAppointmentsAdmin.alreadyCompleted') }}</button>     
                </div>
                <div>
                    <h1 class="text-4xl Raleway-bold">{{ $t('account.myAppointmentsAdmin.totalPrice') }}</h1>
                    <p class=" Raleway">€ {{ selectedAppointment?.price }}</p>
                </div>
                <div>
                    <h1 class="text-4xl Raleway-bold">{{ $t('account.myAppointmentsAdmin.pointsUsed') }}</h1>
                    <p class=" Raleway">{{ selectedAppointment?.isPointsUsed }}</p>
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

import NavigationAccount from '@/components/navigationAccount.vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { GET_ALL_APPOINTMENTS_BY_HAIRDRESSER_UID, COMPLETE_APPOINTMENT } from '@/graphql/appointments.query';
import useFirebase from '@/composables/useFirebase';
import { ref, type Ref } from 'vue';
import { X } from 'lucide-vue-next'
import type { CustomAppointment } from '@/interfaces/custom.appointment.interface';
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/dark.css';
import { onMounted } from 'vue';
import { formatDate as formatDateFunction } from '@/utils/formatDate.js';
import { useI18n } from 'vue-i18n';

const { firebaseUser } = useFirebase()

const { locale } = useI18n()

const showOverlay = ref(false);
const isOpen = ref(true) as Ref<boolean>;
const selectedAppointment = ref({} as CustomAppointment);
const visualAppointments = ref([] as CustomAppointment[]);
let selectedUtilities: string[] = [];
let datum = ''

let error = "";

const toggleShowOverlay = () => {
    showOverlay.value = !showOverlay.value;
}

const selectAppointment = (appointment: any) => {
    console.log(appointment);
    selectedUtilities = [];
    selectedAppointment.value = appointment;
    selectedAppointment.value.services.forEach(service => {
        service.utilities.forEach(utilitie => {
            selectedUtilities.push(utilitie);
        });
    });
}

const getUniqueUtilities = (utilities: any) => {
    let uniqueUtilities: string[] = [];
    for (let i = 0; i < utilities.length; i++) {
        if (!uniqueUtilities.includes(utilities[i])) {
            uniqueUtilities.push(utilities[i]);
        }
    }
    return uniqueUtilities;
};

const date = (givendate: any) => {
    const inputDate = new Date(givendate);

    const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = dayOfWeek[inputDate.getDay()];
    
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const period = hours < 12 ? 'AM' : 'PM';
    datum = `${day} ${inputDate.getDate()}/${inputDate.getMonth() + 1}/${inputDate.getFullYear()} ${hours % 12 || 12}.${minutes < 10 ? '0' : ''}${minutes} ${period}`;
    
    return datum;
};


 const currentDate = new Date();
const currentDay = currentDate.getDay();
const daysUntilMonday = currentDay === 0 ? 6 : currentDay - 1;
const defaultStartDate = new Date(currentDate);
defaultStartDate.setDate(currentDate.getDate() - daysUntilMonday);

const defaultEndDate = new Date(defaultStartDate);
defaultEndDate.setDate(defaultStartDate.getDate() + 6);

const startDate = ref(new Date(defaultStartDate));
const endDate = ref(new Date(defaultEndDate));

onMounted(() => {
    const startPicker = flatpickr('#start-picker', {
        altInput: true,
        altFormat: 'F j, Y',
        dateFormat: 'Y-m-d\TH:i:S.000\Z',
        defaultDate: defaultStartDate,
        onClose: function (selectedDates) {
            if(selectedDates[0] < endDate.value) {
                startDate.value = selectedDates[0];
            }
        },
    });

    const endPicker = flatpickr('#end-picker', {
        altInput: true,
        altFormat: 'F j, Y',
        dateFormat: 'Y-m-d\TH:i:S.000\Z',
        defaultDate: defaultEndDate,
        onClose: function (selectedDates) {
            if(selectedDates[0] > startDate.value) {
                endDate.value = selectedDates[0];
            }
        },
    });
});

const getWantedAppointments = () => {
    error = "";

    if (getAppointmentsResult?.value?.appointmentsByHairdresserUid <= 0) {
        error = "No appointments found";
        console.log(error);
    };
    console.log(getAppointmentsResult?.value?.appointmentsByHairdresserUid)
    visualAppointments.value = getAppointmentsResult?.value.appointmentsByHairdresserUid
        .map((appointment: any) => {

            if (isOpen.value == true && appointment.isCompleted == true) return null;

            if (startDate.value > new Date(appointment.date) || endDate.value < new Date(appointment.date)) return null;

            return {
                id: appointment.id,
                date: appointment.date,
                isCompleted: appointment.isCompleted,
                services: appointment.services.map((service: any) => {
                    return {
                        name: service.name,
                        utilities: service.utilities
                    };
                }),
                extra: appointment.extra,
                userName: appointment.userName,
                price: appointment.price,
                isPointsUsed: appointment.isPointsUsed
            };
        })
        .filter((appointment: any) => appointment !== null);
        
    if(visualAppointments.value.length == 0){ 
        if (error == "")
            error = "No appointments found in this time period";
    }else{
        error = "";
    }
};


const formatDate = (date: Date) => {
    console.log(locale.value);
    return formatDateFunction(date, "dddd DD/MM/yyyy HH:mm", locale.value);
}
    
const finishAppointment = () => {
    console.log(selectedAppointment.value);
    completeAppointment({
        id: selectedAppointment.value.id
    }).then(result => {
        console.log(result);
        getWantedAppointments();
        window.location.reload();
    })
}

const {result: getAppointmentsResult, loading, onResult } = useQuery(GET_ALL_APPOINTMENTS_BY_HAIRDRESSER_UID)

const { mutate: completeAppointment } = useMutation(COMPLETE_APPOINTMENT);


onResult((appointment)=>{
    if(!appointment.loading){
        getWantedAppointments();
    }
})


</script>