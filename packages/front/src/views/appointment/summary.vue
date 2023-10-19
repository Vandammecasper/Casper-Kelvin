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
                extraPrice: '',
            }
        },
        computed: {
            services() {
                return this.$route.params.service.split(',').map(services => decodeURIComponent(services));
            },
            handleServiceIds() {
                this.serviceIds = this.services
                console.log(this.serviceIds)
                return this.serviceIds
            },
            handleServicesResults() {
                this.selectedServices = this.servicesResult
                console.log(this.servicesResult)
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
                // this.serviceIds = Array.from(this.handleServiceIds)
                // this.selectedServices = Array.from(this.handleServicesResults);
                // return this.servicesResult.filter((obj) => this.serviceIds.includes(obj.id))
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