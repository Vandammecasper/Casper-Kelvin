<template>
    <div class="grid w-full h-screen content-center justify-items-center">
        <h1 class="Raleway-bold text-6xl mt-24">SUMMARY</h1>
        <div class="mt-8 grid grid-cols-2 gap-24 px-16">
            <div>
                <h2 class="Raleway-bold text-5xl mb-2">SERVICES</h2>
                <div v-for="service of filteredServices" class="flex justify-between mt-2">
                    <p class="Raleway text-2xl">{{ service.name }}</p>
                    <p class="Raleway text-2xl">€ {{ service.price }}</p>
                </div>
                <h2 class="Raleway-bold text-5xl mt-4">EXTRA'S</h2>
                <div class="flex justify-between mt-2">
                    <p class="Raleway text-2xl">{{ extra }}</p>
                    <p class="Raleway text-2xl">€ {{ extraPrice }}.00</p>
                </div>
                <p class="w-3/4 mt-2 text-neutral-600 Raleway">{{ description }}</p>
                <div class="flex mt-4 gap-56">
                    <div class="flex gap-2">
                        <button @click="usePoints" class="mt-1 w-6 h-6 bg-transparent border-2 border-white grid place-content-center">
                            <img v-if="usingPoints" src="../../../assets/icons/cross.svg" alt="">
                        </button>
                        <h2 class="Raleway text-3xl">USE POINTS</h2>
                    </div>
                    <h2 class="Raleway text-3xl">5/{{ getPointByUidResult?.pointByUid.usablePoints }}</h2>
                </div>
                <p class="w-3/4 mt-2 text-neutral-600 Raleway">Use 5 points to get a 50% discount</p>
            </div>
            <div>
                <h2 class="Raleway-bold text-5xl">BARBER</h2>
                <div class="border-2 border-yellow-600 hover:border-yellow-600">
                    <div class="h-24 relative grid content-center">
                        <img src="../../../assets/barbers/Samuel.jpg" alt="" class="h-23 w-full object-cover absolute" style="object-position: center 40%;">
                        <h3 class="text-3xl z-20 bg-black justify-self-end text-center w-40 py-5">{{ hairdressersResult?.hairdresser?.name }}</h3>
                    </div>
                </div>
                <h2 class="Raleway-bold text-5xl mt-24">CALENDAR</h2>
                <p>{{ date }}</p>
            </div>
        </div>
        <button @click="handleAppointment" class="mt-8 Raleway-bold border-2 border-yellow-600 bg-yellow-600 py-2 px-8 font-semibold  hover:bg-yellow-700 focus:outline-none focus-visible:border-yellow-600 focus-visible:bg-yellow-700 focus-visible:ring-2 focus-visible:ring-yellow-300">TOTAL: € {{ calculateTotalCost }}</button>
    </div>
</template>

<script lang="ts">
    import { useQuery } from '@vue/apollo-composable'
    import { GET_HAIRDRESSER_BY_ID } from '@/graphql/hairdressers.query'
    import { GET_ALL_SERVICES } from '@/graphql/services.query';
    import { useRouter} from 'vue-router'
    import type CustomAppointment from '@/interfaces/custom.appointment.interface'
    import { useMutation } from '@vue/apollo-composable'
    import {CREATE_APPOINTMENT} from '@/graphql/appointment.mutation'
    import router from '../../bootstrap/router'
import { GET_POINT_BY_UID } from '@/graphql/points.query'
    
    export default {
        data(){
            return{
                barberid: '',
                serviceid: '',
                datum: '',
                serviceIds: [],
                selectedServices: [],
                wantedServices: [],
                extraPrice: 0,
                totalCost: 0,
                description: '',
                usingPoints: false,
            }
        },
        methods: {
            usePoints() {
                if (this.usingPoints == false) {
                    this.usingPoints = true
                    console.log(this.usingPoints)
                }
                else {
                    this.usingPoints = false
                    console.log(this.usingPoints)
                }
                return this.usingPoints
            }
        },
        computed: {
            services() {
                return this.$route.params.service.split(',').map(services => decodeURIComponent(services));
            },
            extra() {
                const extraId = this.$route.params.extra
                var extraName = ''
                if (extraId == '1' ){
                    extraName = 'Shampoo'
                    this.extraPrice = 4
                    this.description = 'Add an extra layer of pampering to your grooming experience with our optional shampoo wash. Indulge in ultimate relaxation and leave with a clean, revitalized feel.'
                }
                else if(extraId == '2') {
                    extraName = 'Shampoo & massage'
                    this.extraPrice = 6
                    this.description = 'Experience the ultimate relaxation with our optional shampoo wash and massage. Elevate your grooming session to a spa-like indulgence.'
                }
                else if(extraId == '0') {
                   extraName = 'NO EXTRA' 
                   this.extraPrice = 0
                }
            return extraName ;
            },
            barber() {
                return this.$route.params.barber;
            },
            date() {
                return this.$route.params.date;
            },
            filteredServices() { 
                this.serviceIds = this.services
                this.selectedServices = this.servicesResult;
                var id = ''
                for (id of this.serviceIds) {
                    this.selectedServices?.services.map((service) => {
                        if (service.id == id) {
                            console.log(service.name)
                            this.wantedServices.push(service)
                        }
                    })
                }
                console.log(this.wantedServices)
                return this.wantedServices
            },
            calculateTotalCost(){
                var service = {}
                for (service of this.wantedServices) {
                    this.totalCost += service.price
                }
                this.totalCost += this.extraPrice
                return this.totalCost
            },
        },
        setup(){
            const {currentRoute} = useRouter()
            const barberid = currentRoute.value.params.barber
            const serviceid = currentRoute.value.params.service.split(',').map(services => decodeURIComponent(services));
            
            //!!needs to be checked!!
            const checkPoints = () => {
                if(getPointByUidResult?.pointByUid.usablePoints >= 5){
                    return true
                }
                else{
                    return false
                }
            }

            const extra = () => {
                const extraId = currentRoute.value.params.extra
                var extraName:string[] = []
                if (extraId == '1' ){
                    extraName = ['Shampoo']
                }
                else if(extraId == '2') {
                    extraName = ['Shampoo & massage']
                }
                else if(extraId == '0') {
                   extraName = ['NO EXTRA'] 
                }
                // console.log(getPointByUidResult?.pointByUid.usablePoints)
                return extraName ;
            }

            const date = () => {
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

            // er stond geen $ bij > CreateAppointmentInput: $CreateAppointmentInput < hierdoor de error 
            // serviceid was een string en moest een array zijn
            const {
                mutate: CreateAppointment,
                loading: createAppointmentLoading,
                onDone: appointmentCreated,
            } = useMutation<CustomAppointment>(CREATE_APPOINTMENT)

            const handleAppointment = () => {
                console.log(date())
                console.log(barberid)
                console.log(serviceid)
                console.log(extra())
                CreateAppointment({
                    CreateAppointmentInput: {
                        date: date(),
                        hairdresserId: barberid,
                        servicesId: serviceid,
                        extras: extra(),
                    },
                }).then(result => {
                    if (!result?.data) throw new Error('Appointment creation failed.')
                    router.push('/')
                })
            }
        return {
            hairdressersResult: getHairdresserByIdResult,
            servicesResult: getServicesResult,
            handleAppointment,
            getPointByUidResult,
            checkPoints,
        }
        }
    };
</script>