<template>
    <div class="flex w-full h-screen items-center">
        <NavigationAccount />
        <div class="h-screen w-full pt-40 px-40 grid grid-cols-2 gap-24">
            <div class="w-1/2">
                <h3>Day off</h3>
                <select class="bg-neutral-900 border-white border-1 h-10 w-full">
                    <option value="2">Monday</option>
                    <option value="3">Tuesday</option>
                    <option value="4">Wednesday</option>
                    <option value="5">Thursday</option>
                    <option value="6">Friday</option>
                    <option value="7">Saturday</option>
                    <option value="1">Sunday</option>
                </select>
            </div>
            <DatePicker class="mt-4" :attributes="attributes" v-model.range="range" borderless :is-dark="true" expanded color="yellow" mode="date" hide-time-header :min-date="new Date()" :rules="rules"/>
        </div>
    </div>
</template>

<script setup lang="ts">

import NavigationAccount from '@/components/navigationAccount.vue';
import { ref } from 'vue';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const rules = ref({
    hours: (hour, { weekday }) => {
        // 8AM - 12PM on the weekends
        if ([1, 7].includes(weekday)) return hour >= 9 && hour < 14;
        // Any hour otherwise
        return hour >= 9 && hour < 18;
    },
});

const attributes = ref([
    {
        highlight: true,
        dates: {
            repeat: {
                every: [1, 'weeks'],
                weekdays: 2,
            },
        },
    },
]);
</script>