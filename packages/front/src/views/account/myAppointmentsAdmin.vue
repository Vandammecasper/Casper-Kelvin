<template>
    <div class="flex w-full h-screen items-center">
        <NavigationAccount />
        <div class="w-full h-96 mt-4 px-24">
            <h1 class="text-5xl Raleway-bold mb-4">{{ $t('account.myAccount.hello') }} {{firebaseUser?.displayName}}</h1>

            <select class="bg-neutral-900 border-white border-1 h-10 w-full" name="isOpen" id="" v-model="isOpen">
                <option :value="true">Open Appointments</option>
                <option :value="false">All Appointments</option>
            </select>

            <div class="mt-2">
                <input id="start-picker" type="text" placeholder="Select start date" class="bg-neutral-900 border-2 mr-2 p-1">
                <input id="end-picker" type="text" placeholder="Select end date" class="bg-neutral-900 border-2 mr-2 p-1">
                <button @click="getWantedAppointments" class="lg:float-right border-3 p-1">Apply Filter</button>
            </div>

            <ul class="w-full mt-4">
                <li class="p-2 border-y-slate-700 border-b-2 flex justify-between">
                    <p>Services</p>
                    <p>Date</p>
                    <p>Completed</p>
                </li>
                <li v-for="appointment in visualAppointments" class="p-2 border-y-slate-700 border-b-2">
                    <div class="flex justify-between cursor-pointer" @click="toggleShowOverlay(), selectAppointment(appointment)">
                        <p>{{ appointment?.services[0].name }}</p>
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
            <div class="grid columns-2 gap-4">
                <div class="col-span-2 text-center">
                    <p>{{ selectedAppointment?.date }}</p>
                </div>
                <div>
                    <h1 class="text-4xl">Customer</h1>
                    <p>{{ selectedAppointment?.userName }}</p>
                </div>
                <div>
                    <h1 class="text-4xl">Completed</h1>
                    <p>{{ selectedAppointment?.isCompleted }}</p>
                </div>
                <div>
                    <h1 class="text-4xl">Services</h1>
                    <div v-for="service of selectedAppointment?.services">
                        <p>{{ service.name }}</p>
                    </div>
                </div>
                <div class="">
                    <h1 class="text-4xl">Supplies Needed</h1>
                    <div v-for="service of selectedAppointment?.services">
                        <div v-for="utilitie in service.utilities">
                            <p>{{ utilitie }}</p>
                        </div>
                    </div>
                </div> 
                <div>
                    <h1 class="text-4xl">Extra's</h1>   
                    <div v-for="extra of selectedAppointment?.extras">
                        <p>{{ extra }}</p>
                    </div>          
                </div>
                <div>
                    <h1 class="text-4xl">Complete appointment</h1>   
                    <button @click="finishAppointment()" v-if="!selectedAppointment?.isCompleted" class="max-w-[200px] w-full bg-green-600">complete appointment</button>    
                    <button v-else class="max-w-[200px] w-full bg-red-600" disabled>Already Completed</button>     
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import NavigationAccount from '@/components/navigationAccount.vue';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { GET_ALL_APPOINTMENTS_BY_HAIRDRESSER_ID, COMPLETE_APPOINTMENT } from '@/graphql/appointments.query';
import useFirebase from '@/composables/useFirebase';
import { ref, type Ref } from 'vue';
import { X } from 'lucide-vue-next'
import type { CustomAppointment } from '@/interfaces/custom.appointment.interface';
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.css';
import { onMounted } from 'vue';

const { firebaseUser } = useFirebase()

const showOverlay = ref(false);
const isOpen = ref(true) as Ref<boolean>;
const selectedAppointment = ref({} as CustomAppointment);

const toggleShowOverlay = () => {
    showOverlay.value = !showOverlay.value;
}

const selectAppointment = (appointment: any) => {
    selectedAppointment.value = appointment;
}

const visualAppointments = ref([] as CustomAppointment[]);

/*
 * Flatpickr
*/
 // Calculate the default start date (Monday of the current week)
 const currentDate = new Date();
const currentDay = currentDate.getDay();
const daysUntilMonday = currentDay === 0 ? 6 : currentDay - 1; // Sunday is 0, so we adjust to Monday being 1
const defaultStartDate = new Date(currentDate);
defaultStartDate.setDate(currentDate.getDate() - daysUntilMonday);

// Calculate the default end date (Sunday of the current week)
const defaultEndDate = new Date(defaultStartDate);
defaultEndDate.setDate(defaultStartDate.getDate() + 6);

const startDate = ref(new Date());
const endDate = ref(new Date());

//TODO: add validation to the date pickers
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

/*
 * End Flatpickr
*/

const getWantedAppointments = () => {
    // console.log(getAppointmentsResult.value.appointmentsByHairdresserId);
    console.log(isOpen.value);
    visualAppointments.value = [];
    console.log(visualAppointments.value, "visualAppointments");
    visualAppointments.value = getAppointmentsResult?.value.appointmentsByHairdresserId
        .map((appointment: any) => {

            console.log(appointment.isCompleted);
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
                extras: appointment.extras,
                userName: appointment.userName
            };
        })
        .filter((appointment: any) => appointment !== null); // Remove the filtered null values

    console.log(visualAppointments.value);
};
    
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


//TODO: get the hairdresser id
const {result: getAppointmentsResult, loading } = useQuery(GET_ALL_APPOINTMENTS_BY_HAIRDRESSER_ID, {
    id: "652fd58239d9756ff8009ab9"
})

const { mutate: completeAppointment } = useMutation(COMPLETE_APPOINTMENT);



</script>