<template>
    <Bar v-if="chartData" :data="chartData" :options="chartOptions" class="h-40" />
</template>

<script lang="ts">
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { GET_ALL_HAIRDRESSERS } from '@/graphql/hairdressers.query'
import { useQuery } from '@vue/apollo-composable'
import { ref, watchEffect } from 'vue';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
    name: 'App',
    components: {
        Bar
    },
    props: {
        componentData: {
            type: Object as () => Object | null,
            required: false
        }
    },
    computed: {
        myStyles() {
            return {
                color: '#DE9D1E',
                position: 'relative'
            }
        }
    },
    data() {
        return{
             chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    setup(props){

        const revenueLists = ref([
            {
                label: '',
                backgroundColor: '#9594FC',
                data: [0,0,0,0,0,0,0,0,0,0,0,0]
            }
        ])

        const {
            result: getHairdressersResult,
            refetch,
            loading,
            onResult,
        } = useQuery(GET_ALL_HAIRDRESSERS)

        const data = ref({})

        onResult((result) => {
            if (!result.loading) {
                console.log(result)
                data.value = getHairdressersResult
                countRevenueByBarber()
            }
        })
        
        const counter = ref(0)

        const chartData = ref()
        const countRevenueByBarber = () =>{
            const done = ref(false)
            if(props.componentData && getHairdressersResult.value && revenueLists.value.length == 1){
                for(let i = 0; i < getHairdressersResult.value.hairdressers?.length; i++){
                    let barberName = getHairdressersResult.value.hairdressers[i].name
                    let barberId = getHairdressersResult.value.hairdressers[i].id
                    const colors = ['#9594FC', '#FFC148', '#35E5AA']
                    let randomColor = colors[counter.value]
                    let barberRevenue = [0,0,0,0,0,0,0,0,0,0,0,0]
                    counter.value++
                    if (counter.value==3){
                        counter.value = 0
                    }
                    console.log(barberName)
                    console.log(barberId)
                    console.log(props.componentData.value.appointments)
                    for (let i = 0; i < props.componentData.value.appointments?.length; i++) {
                        if(props.componentData.value.appointments[i].hairdresser.id == barberId){
                            console.log(barberId)
                            console.log(props.componentData.value.appointments[i])
                            const appointment = props.componentData.value.appointments[i];
                            const appointmentDate = new Date(appointment.date);
                            console.log(appointmentDate)
                            for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                                const firstDayOfMonth = new Date(new Date().getFullYear(), monthIndex, 1);
                                const lastDayOfMonth = new Date(new Date().getFullYear(), monthIndex + 1, 1);

                                if (appointmentDate > firstDayOfMonth && appointmentDate < lastDayOfMonth) {
                                    barberRevenue[monthIndex] += appointment.price;
                                    break; // Break out of the loop once the month is found
                                }
                            }
                        }
                        
                    }
                    revenueLists.value.push(
                        {
                            label: barberName,
                            backgroundColor: randomColor,
                            data: barberRevenue
                        }
                    )
                }
                console.log(revenueLists.value)
                //remove the first element of the revenueLists array
                revenueLists.value.shift()
                chartData.value = {
                    labels: [
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December'
                    ],
                    datasets: revenueLists.value
                }
                console.log(chartData.value)
            }
            done.value = true
            return done.value
        }
        return { 
            countRevenueByBarber,
            chartData
        }
    }
}
</script>