<template>
    <div class="grid w-full h-screen content-center justify-items-center">
        <h1 class="Raleway-bold text-6xl mt-24">PLANNING</h1>
        <div class="flex gap-32 items-center justify-center w-full h-full px-24 mt-4">
            <div class="w-1/2">
                <h2 class="text-4xl">SELECT A BARBER</h2>
                <div class="mt-6">
                    <div v-for="hairdresser of hairdressersResult?.hairdressers" :key="hairdresser.id" 
                    @click="toggleSelection(hairdresser.id)"
                    :class="{
                        'border-2 border-yellow-600 hover:border-yellow-600': isSelected(hairdresser.id),
                        'p-1 border-2 border-transparent hover:border-neutral-600': true // Add other classes as needed
                    }">
                        <div class="h-24 relative grid content-center">
                            <img src="../../../assets/barbers/Samuel.jpg" alt="" class="h-23 w-full object-cover absolute" style="object-position: center 40%;">
                            <h3 class="text-3xl z-20 bg-black justify-self-end text-center w-40 py-5">{{hairdresser.name}}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-1/2">
                <h2 class="text-4xl">AGENDA</h2>
                <DatePicker class="mt-4" borderless :is-dark="true" expanded color="yellow" v-model="selectedDate" mode="dateTime" is24hr hide-time-header :min-date="new Date()" time-accuracy={{1}} :rules="rules"/>
            </div>
        </div>
        <RouterLink v-if="cont" :to="{ name: 'summary', params: { service: selectedServices.join(','),extra: selectedExtra, barber: selectedBarber, date: selectedDate } }">
            <button class="mt-8 Raleway-bold border-2 border-yellow-600 bg-yellow-600 py-2 px-8 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">NEXT</button>
        </RouterLink>
        <button v-else class="mt-8 Raleway-bold border-2 border-neutral-600 bg-neutral-600 py-2 px-8 font-semibold  ">NEXT</button>
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

<script lang="ts">
import { ref } from 'vue';
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import { useQuery } from '@vue/apollo-composable'
import { GET_ALL_HAIRDRESSERS } from '@/graphql/hairdressers.query'


export default {
    watch:{
        selectedDate(newValue){
            this.selectedDate = newValue;
            console.log('nieuwe datum: ', this.selectedDate )
        }
    },
    components: {
        Calendar,
        DatePicker,
    },
    data() {
        return {
            rules: ref({
                hours: (hour, { weekday }) => {
                    // 8AM - 12PM on the weekends
                    if ([1, 7].includes(weekday)) return hour >= 9 && hour < 14;
                    // Any hour otherwise
                    return hour >= 9 && hour < 18;
                },
            }),
            savedItems: [],
            selectedBarber: '',
            selectedDate: '',
            cont: false,
        }
    },
    methods: {
        isSelected(barberId) {
            if(this.selectedBarber == barberId){
                return true;
            }
            else{
                return false;
            }
        },
        toggleSelection(barberId) {
            if (this.isSelected(barberId)) {
                // barber is already selected, so remove it
                this.selectedBarber = '';
                this.checkContinue();
            } else {
                // Barber is not selected, so add it
                this.selectedBarber = barberId;
                this.checkContinue();
            }
        },
        checkContinue() {
            if (this.selectedBarber != '' && this.selectedDate != '') {
                this.cont = true;
            }
            else {
                this.cont = false;
            }
        },
    },
    setup(){
        const {
            result: getHairdressersResult,
            loading: getHairdressersLoading,
        } = useQuery(GET_ALL_HAIRDRESSERS)
        
        return {
            hairdressersResult: getHairdressersResult,
        }
    },
    computed: {
        selectedServices() {
            return this.$route.params.service.split(',').map(service => decodeURIComponent(service));
        },
        selectedExtra() {
            return this.$route.params.extra;
        }
    },
}
</script>