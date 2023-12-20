<template>
    <div class="sm:flex w-full h-screen items-center">
        <NavigationAccount />
        <div class="h-screen w-full p-4 px-6 sm:pt-40 sm:pl-20 sm:pr-10">
            <div class="flex">
                <h1 class="text-5xl Raleway-bold mb-4">{{ $t('account.myAccount.hello') }} {{ firebaseUser?.displayName }}</h1>
                <p class="mt-5 ml-4">{{ $t('account.vacation.availableVacationDays') }} {{ getHairdresserResult?.hairdresserByUid?.vacationDays }}</p>
            </div>
            <div class="h-[60vh] overflow-scroll overflow-x-hidden pr-1">
                <div class="w-full">
                    <h3 class="text-2xl mb-2">{{ $t('account.vacation.dayOff') }}</h3>
                    <select class="bg-neutral-900 border-white border-1 h-10 w-full" v-model="dayOff">
                        <option :value="1">{{ $t('account.vacation.monday') }}</option>
                        <option :value="2">{{ $t('account.vacation.tuesday') }}</option>
                        <option :value="3">{{ $t('account.vacation.wednesday') }}</option>
                        <option :value="4">{{ $t('account.vacation.thursday') }}</option>
                        <option :value="5">{{ $t('account.vacation.friday') }}</option>
                        <option :value="6">{{ $t('account.vacation.saterday') }}</option>
                        <option :value="0">{{ $t('account.vacation.sunday') }}</option>
                    </select>
                    <button @click="handleDayOff" class="mt-4 Raleway-bold border-2 border-yellow-600 bg-yellow-600 py-2 px-8 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">{{ $t('account.vacation.save') }}</button>
                </div>
                <hr class="my-4">
                <div>
                    <h3 class="text-2xl mb-2">{{ $t('account.vacation.vacation') }}</h3>
                    <div class="flex gap-2">
                        <div>
                            <label for="start-picker">{{ $t('account.vacation.startDate') }}</label>
                            <input id="start-picker" type="text" placeholder="Select a date range" class="w-full h-10 bg-neutral-900 border-2 mr-2 p-1 border-white">
                        </div>
                        <div>
                            <label for="end-picker">{{ $t('account.vacation.endDate') }}</label>
                            <input id="end-picker" type="text" placeholder="Select a date range" class="w-full h-10 bg-neutral-900 border-2 mr-2 p-1 border-white">
                        </div>
                    </div>
                    <p v-if="error != ''" class="text-red-700">{{ error }}</p>
                    <button @click="handleHolidays" class="mt-4 Raleway-bold border-2 border-yellow-600 bg-yellow-600 py-2 px-8 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">{{ $t('account.vacation.request') }}</button>
                </div>
                <hr class="my-4">
                <div>
                    <h3 class="text-2xl mb-2">{{ $t('account.vacation.plannedVacations') }}</h3>
                    <div class="flex justify-between p-2">
                        <p>{{ $t('account.vacation.startDate') }}</p>
                        <p>{{ $t('account.vacation.endDate') }}</p>
                        <p>{{ $t('account.vacation.approved') }}</p>
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
import { CHANGE_DAYS_OFF } from '@/graphql/hairdresser.mutation';
import { GET_HAIRDRESSER_BY_UID } from '@/graphql/hairdressers.query';

const startDate = ref(new Date());
const endDate = ref(new Date());

const { firebaseUser } = useFirebase()
const dayOff = ref(1) as Ref<number>;

const error = ref('');

onMounted(() => {

    //TODO: date doesnt get saved
    const startPicker = flatpickr('#start-picker', {
        altInput: true,
        altFormat: 'F j, Y',
        dateFormat: 'Y-m-d\TH:i:S.000\Z',
        defaultDate: new Date(),
        onClose: function (selectedDates) {
            
                startDate.value = selectedDates[0];
                console.log(startDate.value);
            
        },
    });

    const endPicker = flatpickr('#end-picker', {
        altInput: true,
        altFormat: 'F j, Y',
        dateFormat: 'Y-m-d\TH:i:S.000\Z',
        defaultDate: new Date(),
        onClose: function (selectedDates) {
                endDate.value = selectedDates[0];
                console.log(endDate.value);
        },
    });
});


const { result: getVacationsResult, refetch: refetchData } = useQuery(GET_ALL_VACATIONS_BY_UID);

const { result: getHairdresserResult, refetch: refetchHairdresser, onResult: onResultHairdresser } = useQuery(GET_HAIRDRESSER_BY_UID);

const { mutate: CreateVacation } = useMutation(ADD_VACATION);

const { mutate: CreateDayOff } = useMutation(CHANGE_DAYS_OFF);


onResultHairdresser((hairdresser) => {
    console.log(hairdresser);
    if(hairdresser.loading === false){
        console.log(hairdresser?.data.hairdresserByUid?.daysOff);
        dayOff.value = hairdresser?.data.hairdresserByUid?.daysOff[0];
    }
    
})


const handleHolidays = () => {
    console.log(startDate.value, endDate.value)
    if (startDate.value > endDate.value) {
        error.value = "Start date must be before end date";
        return;
    }
    if (startDate.value < new Date()) {
        error.value = "Start date must be in the future";
        return;
    }

    let startDateObj = new Date(startDate.value);
    let endDateObj = new Date(endDate.value);

    // Calculate the duration in milliseconds
    let durationInMilliseconds = endDateObj.getTime() - startDateObj.getTime();

    // Convert milliseconds to days
    let durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);

    if (durationInDays > getHairdresserResult.value.hairdresserByUid.vacationDays) {
        error.value = "You don't have enough vacation days";
        return;
    }

    CreateVacation({
        createVacationInput: {
            startDate: startDate.value,
            endDate: endDate.value,
        }
    }).then(() => {
        console.log("Vacation created");
        error.value = "";
        refetchData();
    }).catch((err) => {
        console.log(err);
        error.value = "There already is a vacation in this period";
    });
}

const handleDayOff = () => {
    //TODO: get user value
    //TODO: the days get updated at all the hairdressers, this can only be the one of the id
    const daysOff =  []//[dayOff.value];
    const selectedDayOff = +dayOff.value;
    daysOff.push( selectedDayOff);

    CreateDayOff({
        id: getHairdresserResult?.value?.hairdresserByUid?.id,
        daysOff: daysOff
    }).then(() => {
        console.log("Day off changed");
        error.value = "";
        refetchHairdresser();
    }).catch((err) => {
        console.log(err);
    });
}
</script>