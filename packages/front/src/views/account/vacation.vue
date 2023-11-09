<template>
    <div class="flex w-full h-screen items-center">
        <NavigationAccount />
        <div class="h-screen w-full pt-40 px-40">
            <h1 class="text-5xl Raleway-bold mb-4">HELLO, {{ firebaseUser?.displayName }}</h1>
            <div class="grid grid-cols-2 gap-24">
                <div class="w-1/2">
                    <h3>Day off</h3>
                    <select class="bg-neutral-900 border-white border-1 h-10 w-full" v-model="day" @click="handleDayOff()">
                        <option value="2">Monday</option>
                        <option value="3">Tuesday</option>
                        <option value="4">Wednesday</option>
                        <option value="5">Thursday</option>
                        <option value="6">Friday</option>
                        <option value="7">Saturday</option>
                        <option value="1">Sunday</option>
                    </select>
                    <button @click="handleHolidays()" class="mt-8 Raleway-bold border-2 border-yellow-600 bg-yellow-600 py-2 px-8 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">SAVE</button>
                </div>
                <input ref="datePicker" type="text" v-model="selectedDates" placeholder="Select a date range">
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
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import { onMounted } from 'vue';

const { firebaseUser } = useFirebase()
const day = ref("2") as Ref<string>;
var dayoff = 2;
const range = ref({
    start: new Date(),
    end: new Date(),
});
const selectedDates = [];

onMounted(() => {
      const datePicker = new Flatpickr(document.querySelector('.flatpickr'), {
        mode: 'range',
        dateFormat: 'Y-m-d',
        onChange: (selected) => {
          selectedDates.value = selected;
        },
      });
    });


const handleDayOff = () => {
    if(day.value == "1"){
        dayoff = 1;
    }
    else if(day.value == "2"){
        dayoff = 2;
    }
    else if(day.value == "3"){
        dayoff = 3;
    }
    else if(day.value == "4"){
        dayoff = 4;
    }
    else if(day.value == "5"){
        dayoff = 5;
    }
    else if(day.value == "6"){
        dayoff = 6;
    }
    else if(day.value == "7"){
        dayoff = 7;
    }
    else{
        dayoff = 4;
    }
    console.log(dayoff)
    return dayoff;
}

const handleHolidays = () => {
    console.log(range.value.start)
    console.log(range.value.end)
    console.log(dayoff)
}

</script>