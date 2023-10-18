<template>
    <div class="grid w-full h-screen content-center justify-items-center">
        <h1 class="Raleway-bold text-6xl mt-24">PLANNING</h1>
        <div class="flex gap-32 items-center justify-center w-full h-full px-24 mt-4">
            <div class="w-1/2">
                <h2 class="text-4xl">SELECT A BARBER</h2>
                <div class="mt-6">
                    <div>
                        <div class="h-24 relative grid content-center hover:border-2 hover:border-neutral-500">
                            <img src="../../../assets/barbers/Samuel.jpg" alt="" class="h-23 w-full object-cover absolute" style="object-position: center 40%;">
                            <h3 class="text-3xl z-20 bg-black justify-self-end text-center w-40 py-5">Samuel</h3>
                        </div>
                        <div class="h-24 relative grid content-center mt-2 hover:border-2 hover:border-neutral-500">
                            <img src="../../../assets/barbers/Sofie.jpg" alt="" class="h-23 w-full object-cover absolute" style="object-position: center 29%;">
                            <h3 class="text-3xl z-20 bg-black justify-self-end  text-center w-40 py-5">Sofie</h3>
                        </div>
                        <div class="h-24 relative grid content-center mt-2 hover:border-2 hover:border-neutral-500">
                            <img src="../../../assets/barbers/Jeff.jpg" alt="" class="h-23 w-full object-cover absolute" style="object-position: center 40%;">
                            <h3 class="text-3xl z-20 bg-black justify-self-end  text-center w-40 py-5">Jeff</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-1/2">
                <h2 class="text-4xl">AGENDA</h2>
                <DatePicker class="mt-4" borderless :is-dark="true" expanded color="yellow" v-model="date" mode="dateTime" is24hr hide-time-header :min-date="new Date()" time-accuracy="1" :rules="rules"/>
            </div>
        </div>
        <RouterLink to="/appointment/summary">
            <button class="mt-8 Raleway-bold border-2 border-yellow-600 bg-yellow-600 py-2 px-8 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">NEXT</button>
        </RouterLink>
    </div>
    
</template>

<script>
import { ref } from 'vue';
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';


export default {
    components: {
        Calendar,
        DatePicker,
    },
    data() {
        return {
            date: new Date(),
            rules: ref({
                hours: (hour, { weekday }) => {
                    // 8AM - 12PM on the weekends
                    if ([1, 7].includes(weekday)) return hour >= 9 && hour < 14;
                    // Any hour otherwise
                    return hour >= 9 && hour < 18;
                },
            }),
        };
    },
}
</script>