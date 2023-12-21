<template>
    <div class="mt-32 h-124">
        <div class="flex h-24 gap-8 lg:gap-24 xl:gap-32 mb-8 justify-center">
            <div class="">
                <RevenueChart :componentData="data"/>
            </div>
            <div class="">
                <CustomerChart/>
            </div>
            <div class="">
                <AppointmentChart :componentData="data"/>
            </div>
        </div>
        <div class="flex p-8 h-105 w-screen justify-center">
            <div class="w-1/2 grid justify-items-center">
                <h1 class="text-2xl mb-4">{{ $t('account.dashboard.barberRevenue') }}</h1>
                <BarChart :componentData="data"/>
            </div>
            <div class="w-1/2 grid justify-items-center">
                <h1 class="text-2xl mb-4">{{ $t('account.dashboard.serviceRevenue') }}</h1>
                <DoughnutChart :componentData="data"/>
            </div>
            
        </div>
    </div>
</template>

<script setup lang="ts">
import BarChart from '@/components/barChart.vue'
import RevenueChart from '@/components/revenueChart.vue'
import CustomerChart from '@/components/customerChart.vue'
import AppointmentChart from '@/components/appointmentChart.vue'
import DoughnutChart from '@/components/doughnutChart.vue'
import { GET_ALL_APPOINTMENTS } from '@/graphql/appointments.query'
import { useQuery } from '@vue/apollo-composable'
import { ref, watchEffect } from 'vue';

const {
    result: getAppointmentsResult,
    refetch,
    onResult,
} = useQuery(GET_ALL_APPOINTMENTS)

const data = ref({})

onResult((result) => {
    if (!result.loading) {
        console.log(result)
        setData()
    }
    else{
        console.log(result)
        refetch()
    }
})

const setData = () =>{
    console.log(getAppointmentsResult?.value)
    data.value = getAppointmentsResult
}
</script>