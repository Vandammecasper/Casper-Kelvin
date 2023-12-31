<template>
    <div class="grid w-full h-screen content-center justify-items-center">
        <h1 class="Raleway-bold text-4xl sm:text-5xl md:text-6xl mt-124 sm:mt-24">{{ $t('appointment.barbertime.planning') }}</h1>
        <div class="sm:flex sm:gap-8 md:gap-32 items-center justify-center w-full h-full px-4 md:px-8 lg:px-12 xl:px-24 mt-4">
            <div class="sm:w-1/2 max-sm:mt-4">
                <h2 class="text-3xl lg:text-4xl">{{ $t('appointment.barbertime.selectBarber') }}</h2>
                <div class="mt-6">
                    <div v-for="hairdresser of hairdressersResult?.hairdressers" :key="hairdresser.id" 
                    @click="toggleSelection(hairdresser.id)"
                    :class="{
                        'border-2 border-yellow-600 hover:border-yellow-600': isSelected(hairdresser.id),
                        'p-1 border-2 border-transparent hover:border-neutral-600': true
                    }">
                        <div class="h-24 relative grid content-center">
                            <img :src="'/barbers/'+hairdresser.name+'.jpg'" alt="" class="h-23 w-full object-cover absolute" style="object-position: center 40%;">
                            <h3 class="text-2xl lg:text-3xl z-20 bg-black justify-self-end text-center w-32 lg:w-40 py-4 lg:py-5">{{hairdresser.name}}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sm:w-1/2 max-sm:mt-4">
                <h2 class="text-3xl lg:text-4xl">{{ $t('appointment.barbertime.agenda') }}</h2>
                <DatePicker @input="checkContinue()" class="mt-4" borderless :is-dark="true" expanded color="yellow" v-model="selectedDate" mode="dateTime" is24hr hide-time-header :min-date="new Date()" :disabled-dates="disabledDates" :time-accuracy="1" :locale="locale" :rules="rules"/>
            </div>
        </div>
        <p v-if="error" class="text-red-600 mt-2">{{ $t('appointment.barbertime.pleaseselect') }}</p>
        <RouterLink v-if="cont" :to="{ name: 'summary', params: { service: selectedServices.join(','),extra: selectedExtra, barber: selectedBarber, date: selectedDate } }">
            <button class="mt-8 Raleway-bold border-2 border-yellow-600 bg-yellow-600 py-2 px-8  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">{{ $t('appointment.barbertime.next') }}</button>
        </RouterLink>
        <button @click="error=true" v-else class="mt-4 Raleway-bold border-2 border-neutral-600 bg-neutral-600 py-2 px-8">{{ $t('appointment.barbertime.next') }}</button>
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
import { GET_ALL_VACATIONS } from '@/graphql/vacation.query';
import { useI18n } from 'vue-i18n';


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
                hours: (hour: number, { weekday }: any) => {
                    if ([1, 7].includes(weekday)) return hour >= 9 && hour < 14;
                    return hour >= 9 && hour < 18;
                },
            }),
            savedItems: [],
            selectedBarber: '',
            selectedDate: '',
            cont: false,
            error: false,
        }
    },
    methods: {
        isSelected(barberId: string) {
            if(this.selectedBarber == barberId){
                return true;
            }
            else{
                return false;
            }
        },
        toggleSelection(barberId: string) {
            if (this.isSelected(barberId)) {
                this.selectedBarber = '';
                this.disabledDates = [
                    {
                        repeat:{
                            weekdays: []
                        }
                    }
                ]

                this.checkContinue();
            } else {
                this.selectedBarber = barberId;
                
                console.log(this.vacationsResult)

                const daysOffSelectedBarber = this.hairdressersResult?.hairdressers.find((hairdresser: { id: string; }) => hairdresser.id == barberId)?.daysOff.map((day: number) => day + 1);
                this.disabledDates = [
                    {
                        repeat:{
                            weekdays: daysOffSelectedBarber
                        }
                    }
                ]
                for (let i = 0; i < this.vacationsResult?.vacations.length; i++) {
                    if(this.vacationsResult?.vacations[i].hairdresser.id == barberId && this.vacationsResult?.vacations[i].isApproved == true){
                        this.disabledDates.push({
                            // @ts-ignore
                            start: new Date(this.vacationsResult?.vacations[i].startDate),
                            end: new Date(this.vacationsResult?.vacations[i].endDate),
                        })
                    }
                }
                this.checkContinue();
            }
        },
        checkContinue() {
            console.log('checking to continue...')
            if (this.selectedBarber != '' && this.selectedDate != '') {
                this.cont = true;
                this.error = false;
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

        const {
            result: getVacationsResult,
            loading: getVacationsLoading,
        } = useQuery(GET_ALL_VACATIONS)

        
        const { locale } = useI18n()

        console.log(getVacationsResult);

        const disabledDates = ref([
            {
                repeat:{
                    weekdays: []
                }
            }
        ])

        return {
            hairdressersResult: getHairdressersResult,
            disabledDates,
            vacationsResult: getVacationsResult,
            locale,
        }
    },
    computed: {
        selectedServices() {
            // @ts-ignore
            return this.$route.params.service.split(',').map((service: string) => decodeURIComponent(service));
        },
        selectedExtra() {
            return this.$route.params.extra;
        }
    },
}
</script>