<template>
    <Doughnut v-if="chartData" :data="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import * as chartConfig from './doughnutChartConfig.js'
import { ref } from 'vue'
import { GET_ALL_SERVICES } from '@/graphql/services.query'
import { useQuery } from '@vue/apollo-composable'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'App',
    components: {
        Doughnut
    },
    props: {
        componentData: {
            type: Object as () => Object | null,
            required: false
        }
    },
    data() {
        return {
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    setup (props) {

        const {
            result: getServicesResult,
            onResult,
        } = useQuery(GET_ALL_SERVICES)

        const data = ref({})

        onResult((result) => {
            if (!result.loading) {
                console.log(result)
                data.value = getServicesResult
                countRevenueByService()
            }
        })

        const revenueList = ref([])

        const serviceNameList = ref([])

        const counter = ref(0)

        const chartData = ref()

        const countRevenueByService = () => {
            if (props.componentData && getServicesResult.value) {
                for (let i = 0; i < getServicesResult.value.services?.length; i++) {
                    let serviceName = getServicesResult.value.services[i].name
                    let serviceId = getServicesResult.value.services[i].id
                    let servicePrice = getServicesResult.value.services[i].price
                    let serviceRevenue = 0
                    counter.value++
                    if (counter.value == 6) {
                        counter.value = 0
                    }
                    // console.log(serviceName)
                    // console.log(serviceId)
                    for (let i = 0; i < props.componentData.value.appointments?.length; i++) {
                        console.log(props.componentData.value.appointments[i].services)
                        console.log(serviceId)
                        let serviceIdList = []
                        for(let j = 0; j < props.componentData.value.appointments[i].services.length; j++){
                            serviceIdList.push(props.componentData.value.appointments[i].services[j].id)
                        }
                        console.log(serviceIdList)
                        if(serviceIdList.includes(serviceId)){
                            console.log('service found')
                            serviceRevenue += servicePrice
                        }
                    }
                    revenueList.value.push(serviceRevenue)
                    serviceNameList.value.push(serviceName)
                }
                console.log(revenueList.value)
                console.log(serviceNameList.value)
                chartData.value = {
                    labels: serviceNameList.value,
                    datasets: [
                        {
                            backgroundColor: [ '#FFC148','#9594FC', '#35E5AA', '#6BF5FF', '#18A0FB', '#FF83A8'],
                            borderColor: [ '#FFC148','#9594FC', '#35E5AA', '#6BF5FF', '#18A0FB', '#FF83A8'],
                            data: revenueList.value,
                            hoverOffset: 24
                        }
                    ]
                }
            }
        }
        return{
            chartData
        }
    }
}
</script>
