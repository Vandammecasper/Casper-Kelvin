<template>
    <Line v-if="chartData" :data="chartData" :options="chartOptions" />
</template>

<script lang="ts">
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { GET_ALL_USERS } from '@/graphql/user.query'
import { useQuery } from '@vue/apollo-composable'
import { ref, watchEffect } from 'vue';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default {
    name: 'App',
    components: {
        Line
    },
    data() {
        return {
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
            }
        }
    },
    setup(){
        const {
            result: getUsersResult,
            refetch,
            loading
        } = useQuery(GET_ALL_USERS)

        watchEffect(() => {
            if (getUsersResult.value) {
                countUsers();
            } else {
                refetch();
            }
        });

        const chartData = ref()
        const totalUsers = ref()

        const countUsers = () => {
            const monthAppointments = Array(12).fill(0);
            if (getUsersResult.value) {
                for (let i = 0; i < getUsersResult.value.appointments?.length; i++) {
                    if (getUsersResult.value.appointments[i].role === 'USER') {
                        const appointment = getUsersResult.value.appointments[i];
                        const appointmentDate = new Date(appointment.date);

                        for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                            const firstDayOfMonth = new Date(new Date().getFullYear(), monthIndex, 1);
                            const lastDayOfMonth = new Date(new Date().getFullYear(), monthIndex + 1, 1);

                            if (appointmentDate > firstDayOfMonth && appointmentDate < lastDayOfMonth) {
                                monthAppointments[monthIndex] += appointment.price;
                                break; // Break out of the loop once the month is found
                            }
                        }
                    }
                }
                const dataForChart = [monthAppointments[0], monthAppointments[1], monthAppointments[2], monthAppointments[3], monthAppointments[4], monthAppointments[5], monthAppointments[6], monthAppointments[7], monthAppointments[8], monthAppointments[9], monthAppointments[10], monthAppointments[11]]
                chartData.value = {
                    labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
                    datasets: [
                        {
                            label: '',
                            backgroundColor: '#F48AE7',
                            borderColor: '#F48AE7',
                            data: dataForChart
                        }
                    ]
                }
                totalUsers.value = monthAppointments[0] + monthAppointments[1] + monthAppointments[2] + monthAppointments[3] + monthAppointments[4] + monthAppointments[5] + monthAppointments[6] + monthAppointments[7] + monthAppointments[8] + monthAppointments[9] + monthAppointments[10] + monthAppointments[11]
            }
        }
        return { 
            countUsers,
            totalUsers,
            chartData
        }
    }
}
</script>
