<template>
    <div class="grid w-full h-screen content-center justify-items-center">
        <h1 class="Raleway-bold text-6xl mt-24">SUMMARY</h1>
        <p>services:</p>
        <div>
            <p>{{ services }}</p>
        </div>
        <p>extra's:</p>
        <p></p>
        <p>barber:</p>
        <p>{{ barber }}</p>
        <p>date:</p>
        <p>{{ date }}</p>
    </div>
</template>

<script lang="ts">
    import { useQuery } from '@vue/apollo-composable'
    import { GET_HAIRDRESSER_BY_ID } from '@/graphql/hairdressers.query'

    export default {
        computed: {
            services() {
                return this.$route.params.service.split(',').map(services => decodeURIComponent(services));
            },
            barber() {
                return this.$route.params.barber;
            },
            date() {
                return this.$route.params.date;
            },
        },
        data(){
            return{
                barberid: '',
                datum: '',
                service: [],
                extra: ''
            }
        },
        setup(){
            const {
            result: getHairdresserByIdResult,
            loading: getHairdresserByIdLoading,
        } = useQuery(GET_HAIRDRESSER_BY_ID, {
            id: this.$route.params.barber
        })
        }
    };
</script>