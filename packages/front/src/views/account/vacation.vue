<template>
    <div class="flex w-full h-screen items-center">
        <NavigationAccount />
        <div class="h-screen w-full pt-40 pl-20 pr-10">
            <h1 class="text-5xl Raleway-bold mb-4">HELLO, {{ firebaseUser?.displayName }}</h1>
            <div class="h-[60vh] overflow-scroll overflow-x-hidden pr-1">
                <div class="w-full">
                    <h3 class="text-2xl mb-2">Day off</h3>
                    <select class="bg-neutral-900 border-white border-1 h-10 w-full" v-model="dayOff">
                        <option value=2>Monday</option>
                        <option value=3>Tuesday</option>
                        <option value=4>Wednesday</option>
                        <option value=5>Thursday</option>
                        <option value=6>Friday</option>
                        <option value=7>Saturday</option>
                        <option value=1>Sunday</option>
                    </select>
                    <button @click="handleDayOff()" class="mt-4 Raleway-bold border-2 border-yellow-600 bg-yellow-600 py-2 px-8 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">SAVE</button>
                </div>
                <hr class="my-4">
                <div>
                    <h3 class="text-2xl mb-2">Vacation</h3>
                    <div class="flex gap-2">
                        <div>
                            <label for="start-picker">Start date</label>
                            <input id="start-picker" type="text" placeholder="Select a date range" class="w-full h-10 bg-neutral-900 border-2 mr-2 p-1 border-white">
                        </div>
                        <div>
                            <label for="end-picker">End date</label>
                            <input id="end-picker" type="text" placeholder="Select a date range" class="w-full h-10 bg-neutral-900 border-2 mr-2 p-1 border-white">
                        </div>
                    </div>
                    <button @click="handleHolidays()" class="mt-4 Raleway-bold border-2 border-yellow-600 bg-yellow-600 py-2 px-8 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">REQUEST</button>
                </div>
                <hr class="my-4">
                <div>
                    <h3 class="text-2xl mb-2">Planed Vacations</h3>
                    <div class="flex justify-between p-2">
                        <p>Start Date</p>
                        <p>End Date</p>
                        <p>Approved</p>
                    </div>
                    <div v-for="vacation of getVacationsResult?.vacationsByUid">
                        <div class="border-white border-1 p-2 flex justify-between">
                            <p>{{ vacation.startDate }}</p>
                            <p>{{ vacation.endDate }}</p>
                            <div v-if="vacation.isApproved" class="rounded-full bg-green-600 w-8 h-8"></div>
                            <div v-else class="rounded-full bg-red-600 w-8 h-8"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    </div>
</template>

<script setup lang="ts">

import NavigationAccount from '@/components/navigationAccount.vue';
import { ref } from 'vue';
import 'v-calendar/style.css';
import useFirebase from '@/composables/useFirebase';
import { type Ref } from 'vue';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import { onMounted } from 'vue';
import { GET_ALL_VACATIONS_BY_UID } from '@/graphql/vacation.query';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { ADD_VACATION } from '@/graphql/vacation.mutation';

const startDate = ref(new Date());
const endDate = ref(new Date());

const { firebaseUser } = useFirebase()
const dayOff = ref(2) as Ref<number>;

onMounted(() => {

    const startPicker = flatpickr('#start-picker', {
        altInput: true,
        altFormat: 'F j, Y',
        dateFormat: 'Y-m-d\TH:i:S.000\Z',
        defaultDate: new Date(),
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
        defaultDate: new Date(),
        onClose: function (selectedDates) {
            if(selectedDates[0] > startDate.value) {
                endDate.value = selectedDates[0];
            }
        },
    });
});


const { result: getVacationsResult, refetch: refetchData } = useQuery(GET_ALL_VACATIONS_BY_UID);

const { mutate: CreateVacation} = useMutation(ADD_VACATION);


const handleHolidays = () => {
    console.log(dayOff.value)
    CreateVacation({
        createVacationInput: {
            startDate: startDate.value,
            endDate: endDate.value,
            isRepeat: false,
        }
    }).then(() => {
        console.log("Vacation created");
        refetchData();
    }).catch((err) => {
        console.log(err);
    });
}

const handleDayOff = () => {
    console.log(dayOff.value)
}
</script>