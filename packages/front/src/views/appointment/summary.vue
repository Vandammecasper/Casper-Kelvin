<template>
    <div class="grid w-full h-screen content-center justify-items-center">
        <h1 class="Raleway-bold text-5xl md:text-6xl mt-76 sm:mt-16 lg:mt-24">{{ $t('appointment.summary.summary') }}</h1>
        <div class="mt-6 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-12 md:gap-24 lg:gap-40 xl:gap-80 px-8 md:px-12 xl:px-16">
            <div>
                <h2 class="Raleway-bold text-3xl md:text-5xl mb-2">{{ $t('appointment.summary.services') }}</h2>
                <div v-for="service of filteredServices" class="flex justify-between mt-2">
                    <p class="Raleway text-xl md:text-2xl">{{ service.name }}</p>
                    <p class="Raleway text-xl md:text-2xl">€ {{ service.price }}</p>
                </div>
                <h2 class="Raleway-bold text-3xl md:text-5xl mt-4">{{ $t('appointment.summary.extras') }}</h2>
                <div class="flex justify-between mt-2">
                    <p class="Raleway text-xl md:text-2xl">{{ getExtraResult?.extra.name }}</p>
                    <p class="Raleway text-xl md:text-2xl">€ {{ getExtraResult?.extra.price }}.00</p>
                </div>
                <p class="w-3/4 mt-2 text-neutral-600 Raleway">{{ description }}</p>
                <div v-if="checkAvailablePoints()" class="flex mt-4 justify-between">
                    <div class="flex gap-2">
                        <button @click="usePoints" class="mt-1 w-6 h-6 bg-transparent border-2 border-white grid place-content-center">
                            <img v-if="isPointsUsed" src="/icons/cross.svg" alt="">
                        </button>
                        <h2 class="Raleway text-3xl">{{ $t('appointment.summary.usePoints') }}</h2>
                    </div>
                    <h2 class="Raleway text-3xl">5/{{ getPointByUidResult?.pointByUid.usablePoints }}</h2>
                </div>
                <div v-else class="flex mt-4 justify-between opacity-30">
                        <div class="flex gap-2">
                            <div class="mt-1 w-6 h-6 bg-transparent border-2 border-white grid place-content-center"></div>
                            <h2 class="Raleway text-2xl md:text-3xl">{{ $t('appointment.summary.usePoints') }}</h2>
                        </div>
                        <h2 class="Raleway text-2xl md:text-3xl">5/{{ getPointByUidResult?.pointByUid.usablePoints }}</h2>
                    </div>
                <p class="w-3/4 mt-2 text-neutral-600 Raleway">{{ $t('appointment.summary.discount') }}</p>
            </div>
            <div>
                <h2 class="Raleway-bold text-3xl md:text-5xl max-sm:mt-4">{{ $t('appointment.summary.barber') }}</h2>
                <div class="border-2 border-yellow-600 hover:border-yellow-600 max-md:mt-2">
                    <div class="h-24 relative grid content-center">
                        <img :src="'/barbers/' + hairdressersResult?.hairdresser?.name + '.jpg'" alt="" class="h-23 w-full object-cover absolute" style="object-position: center 40%;">
                        <h3 class="text-2xl lg:text-3xl z-20 bg-black justify-self-end text-center w-32 lg:w-40 py-4 lg:py-5">{{ hairdressersResult?.hairdresser?.name }}</h3>
                    </div>
                </div>
                <h2 class="Raleway-bold text-3xl md:text-5xl mt-4 sm:mt-12">{{ $t('appointment.summary.calendar') }}</h2>
                <div class="flex gap-12 md:gap-24 mt-2 md:mt-4">
                    <div>
                        <h3 class="Raleway text-2xl md:text-3xl">{{ $t('appointment.summary.date') }}</h3>
                        <p class="Raleway text-xl">{{ date }}</p>
                    </div>
                    <div>
                        <h3 class="Raleway text-2xl md:text-3xl">{{ $t('appointment.summary.hour') }}</h3>
                        <p class="Raleway text-xl">{{ uur }}</p>
                    </div>
                </div>
            </div>
        </div>
        <button @click="handleAppointment" class="mt-8 Raleway-bold border-2 border-yellow-600 bg-yellow-600 py-2 px-8 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">{{ $t('appointment.summary.total') }} {{ calculateTotalCost }}</button>
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
    import { useQuery } from '@vue/apollo-composable'
    import { GET_HAIRDRESSER_BY_ID } from '@/graphql/hairdressers.query'
    import { GET_ALL_SERVICES } from '@/graphql/services.query';
    import { useRouter} from 'vue-router'
    import type { CustomAppointment } from '@/interfaces/custom.appointment.interface'
    import { useMutation } from '@vue/apollo-composable'
    import {CREATE_APPOINTMENT} from '@/graphql/appointment.mutation'
    import router from '../../bootstrap/router'
    import { GET_POINT_BY_UID } from '@/graphql/points.query'
    import { GET_EXTRA_BY_ID } from '@/graphql/extras.query';
    import { ref } from 'vue';
    import { formatDate as formatDateFunction } from '@/utils/formatDate.js';
    import { useI18n } from 'vue-i18n';
        
    export default {
        data(){
            return{
                barberid: '',
                serviceid: '',
                datum: '',
                uur:'',
                serviceIds: [],
                selectedServices: [],
                wantedServices: [] as Array<{ name: string, price: number }>,
                totalCost: 0,
                description: '',
                usingPoints: false,
            }
        },
        methods: {
            checkAvailablePoints() {
                if (this.getPointByUidResult?.pointByUid.usablePoints >= 5) {
                    return true
                }
                else {
                    return false
                }
            }
        },
        computed: {
            services() {
                return (this.$route.params.service as string).split(',').map((services:string) => decodeURIComponent(services));
            },
            barber() {
                return this.$route.params.barber;
            },
            date() {
                //@ts-ignore
                const inputDate = new Date(this.$route.params.date);

                this.datum = formatDateFunction(inputDate, 'dddd DD/MM/yyyy');

                this.uur = formatDateFunction(inputDate, 'HH:mm');

                console.log("Route Date:", this.$route.params.date)
                console.log("Input Date:", inputDate)
                console.log("Formatted Date:", this.datum);
                console.log("Formatted Time:", this.uur);

                return this.datum;
            },
            filteredServices() { 
                
                // @ts-ignore
                this.serviceIds = this.services
                this.selectedServices = this.servicesResult;
                var id = ''
                for (id of this.serviceIds) {
                    //@ts-ignore
                    this.selectedServices?.services.map((service:any) => {
                        if (service.id == id) {
                            console.log(service.name)
                            //@ts-ignore
                            this.wantedServices.push(service)
                        }
                    })
                }
                console.log(this.wantedServices)
                return this.wantedServices
            },
            calculateTotalCost(){
                this.totalCost = 0
                var service = {}
                for (service of this.wantedServices) {
                    this.totalCost += (service as any).price
                }
                this.totalCost += this.getExtraResult?.extra.price
                if (this.isPointsUsed == true) {
                    this.totalCost = this.totalCost / 2
                }
                return this.totalCost
            },
        },
        setup(){
            const {currentRoute} = useRouter()
            const { locale } = useI18n()
            const barberid = currentRoute.value.params.barber
            const serviceid = (currentRoute.value.params.service as string).split(',').map((services:string) => decodeURIComponent(services));
            const extraId = currentRoute.value.params.extra
            const isPointsUsed = ref(false)
            const usePoints = () => {
                isPointsUsed.value = !isPointsUsed.value
            }
            const checkPoints = () => {
                if(getPointByUidResult.value?.pointByUid.usablePoints >= 5){
                    return true
                }
                else{
                    return false
                }
            }

            const date = () => {
                //@ts-ignore
                const datum = new Date(currentRoute.value.params.date)
                const year = datum.getFullYear();
                const month = String(datum.getMonth() + 1).padStart(2, '0');
                const day = String(datum.getDate()).padStart(2, '0');
                const hours = String(datum.getHours()).padStart(2, '0');
                const minutes = String(datum.getMinutes()).padStart(2, '0');
                const seconds = String(datum.getSeconds()).padStart(2, '0');


                const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
                return formattedDate
            }

            const { result: getPointByUidResult } = useQuery(GET_POINT_BY_UID)
            
            const {
            result: getHairdresserByIdResult,
            loading: getHairdresserByIdLoading,
            } = useQuery(GET_HAIRDRESSER_BY_ID, {
                id: barberid
            })

            const {
            result: getServicesResult,
            loading: getServicesLoading,
            } = useQuery(GET_ALL_SERVICES)

            const {
                result: getExtraResult,
                loading: getExtraLoading,
            } = useQuery(GET_EXTRA_BY_ID, {
                id: extraId
            })

            const {
                mutate: CreateAppointment,
                loading: createAppointmentLoading,
                onDone: appointmentCreated,
            } = useMutation<CustomAppointment>(CREATE_APPOINTMENT)

            const handleAppointment = () => {
                console.log(date())
                console.log(barberid)
                console.log(serviceid)
                console.log(extraId)
                CreateAppointment({
                    CreateAppointmentInput: {
                        date: date(),
                        hairdresserId: barberid,
                        servicesId: serviceid,
                        extraId: extraId,
                        isPointsUsed: isPointsUsed.value,
                    },
                }).then(result => {
                    if (!result?.data) throw new Error('Appointment creation failed.')
                    router.push('/')
                })
            }

            const formatDate = (date: Date, dateFormat: string) => {
                console.log(locale.value);
                return formatDateFunction(date, dateFormat, locale.value);
            };
        return {
            hairdressersResult: getHairdresserByIdResult,
            servicesResult: getServicesResult,
            handleAppointment,
            getPointByUidResult,
            checkPoints,
            getExtraResult,
            isPointsUsed,
            usePoints,
        }
        }
    };
</script>