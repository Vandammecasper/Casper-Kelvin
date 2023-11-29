<template>
    <div class="mt-32 h-124">
        <div class="flex h-24 px-8 gap-32 mb-8 justify-center">
            <div class="">
                <RevenueChart/>
                <div class="flex justify-between">
                    <p>Total revenue</p>
                    <h3>€ 288</h3>
                </div>
            </div>
            <div class="">
                <CustomerChart/>
                <div class="flex justify-between">
                    <p>Total customers</p>
                    <h3>40</h3>
                </div>
            </div>
            <div class="">
                <AppointmentChart />
                <div class="flex justify-between">
                    <p>Total appointments</p>
                    <h3>1</h3>
                </div>
            </div>
        </div>
        <div class="flex p-8 h-105 w-screen justify-center">
            <div class="w-1/2 grid justify-items-center">
                <h1 class="text-2xl mb-4">Barber revenue</h1>
                <BarChart />
            </div>
            <div class="w-1/2 grid justify-items-center">
                <h1 class="text-2xl mb-4">Appointment revenue</h1>
                <DoughnutChart/>
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
</script>