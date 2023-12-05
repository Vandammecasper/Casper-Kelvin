<template>
    <Line v-if="getAppointmentsResult && getAppointmentsResult.appointments.length" :data="chartData" />
    <div class="flex justify-between">
        <p>Total appointments</p>
        <h3>{{ appointmentsNumber }}</h3>
    </div>
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
import { GET_ALL_APPOINTMENTS } from '@/graphql/appointments.query'
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
        const chartData = ref()
        const appointmentsNumber = ref()
        
        const {
            result: getAppointmentsResult,
            refetch
        } = useQuery(GET_ALL_APPOINTMENTS)

        watchEffect(() => {
            if (getAppointmentsResult.value) {
                countAppointments();
            } else {
                refetch();
            }
        });


        const countAppointments = () => {
            const monthAppointments = Array(12).fill(0);

            for (let i = 0; i < getAppointmentsResult.value.appointments?.length; i++) {
                const appointment = getAppointmentsResult.value.appointments[i];
                const appointmentDate = new Date(appointment.date);

                for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                    const firstDayOfMonth = new Date(new Date().getFullYear(), monthIndex, 1);
                    const lastDayOfMonth = new Date(new Date().getFullYear(), monthIndex + 1, 1);

                    if (appointmentDate > firstDayOfMonth && appointmentDate < lastDayOfMonth) {
                        monthAppointments[monthIndex]++;
                        break; // Break out of the loop once the month is found
                    }
                }
            }
            const dataForChart = [monthAppointments[0], monthAppointments[1], monthAppointments[2], monthAppointments[3], monthAppointments[4], monthAppointments[5], monthAppointments[6], monthAppointments[7], monthAppointments[8], monthAppointments[9], monthAppointments[10], monthAppointments[11]]
            console.log(dataForChart)
            chartData.value = {
                labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
                datasets: [
                    {
                        label: '',
                        backgroundColor: '#F91818',
                        borderColor: '#F91818',
                        data: dataForChart
                    }
                ]
            }
            appointmentsNumber.value = monthAppointments[0] + monthAppointments[1] + monthAppointments[2] + monthAppointments[3] + monthAppointments[4] + monthAppointments[5] + monthAppointments[6] + monthAppointments[7] + monthAppointments[8] + monthAppointments[9] + monthAppointments[10] + monthAppointments[11]
        }

        return{
            getAppointmentsResult,
            countAppointments,
            chartData,
            appointmentsNumber
        }
    }
}
</script>
