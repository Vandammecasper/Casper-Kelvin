<template>
    <div class="grid w-full h-screen content-center justify-items-center">
        <h1 class="Raleway-bold text-6xl mt-24">SUMMARY</h1>
        <p>services:</p>
        <div>
            <p>{{ filteredServices }}</p>
        </div>
        <p>extra's:</p>
        <p>{{ extra }}</p>
        <p>{{ extraPrice }}</p>
        <p>barber:</p>
        <p>{{ hairdressersResult?.hairdresser?.name }}</p>
        <p>date:</p>
        <p>{{ date }}</p>
    </div>
</template>

<script lang="ts">
    import { useQuery } from '@vue/apollo-composable'
    import { GET_HAIRDRESSER_BY_ID } from '@/graphql/hairdressers.query'
    import { GET_ALL_SERVICES } from '@/graphql/services.query';
    import { useRouter} from 'vue-router'

    export default {
        data(){
            return{
                barberid: '',
                serviceid: '',
                datum: '',
                serviceIds: [],
                selectedServices: [],
                wantedServices: [],
                extraPrice: '',
            }
        },
        computed: {
            services() {
                return this.$route.params.service.split(',').map(services => decodeURIComponent(services));
            },
            handleServiceIds() {
                this.serviceIds = this.services
                return this.serviceIds
            },
            handleServicesResults() {
                this.selectedServices = this.servicesResult
                return this.selectedServices
            },
            extra() {
                const extraId = this.$route.params.extra
                var extraName = ''
                if (extraId == '1' ){
                    extraName = 'Shampoo'
                    this.extraPrice = '€ 4.00'
                }
                else if(extraId == '2') {
                    extraName = 'Shampoo & massage'
                    this.extraPrice = '€ 6.00'
                }
                else if(extraId == '0') {
                   extraName = 'NO EXTRA' 
                   this.extraPrice = '€ 0.00'
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
                // TODO: hier probeer ik de services te filteren op basis van de id's die ik heb opgehaald uit de url
                // maar het lukt mij niet om ze te filteren op basis van de id's aangezien dit niet gaat omdat je dan een waarde undefined terugkrijgt
                this.serviceIds = this.handleServiceIds
                this.selectedServices = this.handleServicesResults;
                var id = ''
                for (id of this.serviceIds) {
                    if (id == this.selectedServices.id) {
                        console.log(id)
                        console.log(this.selectedServices.id)
                        this.wantedServices.push(id)
                    }
                }
                console.log(this.wantedServices)
                return this.wantedServices
            }
        },
        setup(){
            const {currentRoute} = useRouter()
            const barberid = currentRoute.value.params.barber
            const serviceid = currentRoute.value.params.service
            
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
        return {
            hairdressersResult: getHairdresserByIdResult,
            servicesResult: getServicesResult,
        }
        }
    };
</script>