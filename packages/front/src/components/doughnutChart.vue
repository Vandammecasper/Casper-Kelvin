<template>
    <Doughnut v-if="chartData" :data="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'
import { ref } from 'vue'
import { GET_ALL_SERVICES } from '@/graphql/services.query'
import { useQuery } from '@vue/apollo-composable'
import type { Ref } from 'vue'

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
                data.value = getServicesResult
                countRevenueByService()
            }
        })

        const revenueList: Ref<number[]> = ref([])

        const serviceNameList: Ref<string[]> = ref([])

        const counter = ref(0)

        const chartData = ref()

        const countRevenueByService = () => {
            if (props.componentData && getServicesResult.value) {
                for (let i = 0; i < getServicesResult.value.services?.length; i++) {
                    let serviceName:string = getServicesResult.value.services[i].name
                    let serviceId = getServicesResult.value.services[i].id
                    let servicePrice = getServicesResult.value.services[i].price
                    let serviceRevenue = 0
                    counter.value++
                    if (counter.value == 6) {
                        counter.value = 0
                    }
                    //@ts-ignore
                    for (let i = 0; i < props.componentData.value.appointments?.length; i++) {
                        let serviceIdList = []
                        //@ts-ignore
                        for(let j = 0; j < props.componentData.value.appointments[i].services.length; j++){
                            //@ts-ignore
                            serviceIdList.push(props.componentData.value.appointments[i].services[j].id)
                        }
                        if(serviceIdList.includes(serviceId)){
                            serviceRevenue += servicePrice
                        }
                    }
                    revenueList.value.push(serviceRevenue)
                    serviceNameList.value.push(serviceName)
                }
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
