<template>
    <Line v-if="countRevenue()" :data="chartData" :options="chartOptions" />
    <div class="flex justify-between">
        <p class="Raleway-bold">{{ $t('account.dashboard.totalRevenue') }}</p>
        <h3 class="Raleway-bold">€ {{totalRevenue}}</h3>
    </div>
</template>

<style>
.Raleway {
    font-family: 'Raleway', sans-serif;
}

.Raleway-bold {
    font-family: 'Raleway-Bold', sans-serif;
}
</style>

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
import { ref } from 'vue';

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
                maintainAspectRatio: false,
            }
        }
    },
    setup(props){
        const chartData = ref()
        const totalRevenue = ref()

        const countRevenue = () => {
            const monthAppointments = Array(12).fill(0);
            if(props.componentData){
                //@ts-ignore
                for (let i = 0; i < props.componentData.value.appointments?.length; i++) {
                    //@ts-ignore
                    const appointment = props.componentData.value.appointments[i];
                    const appointmentDate = new Date(appointment.date);

                    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                        const firstDayOfMonth = new Date(new Date().getFullYear(), monthIndex, 1);
                        const lastDayOfMonth = new Date(new Date().getFullYear(), monthIndex + 1, 1);

                        if (appointmentDate > firstDayOfMonth && appointmentDate < lastDayOfMonth) {
                            monthAppointments[monthIndex]+= appointment.price;
                            break;
                        }
                    }
                }
                const dataForChart = [monthAppointments[0], monthAppointments[1], monthAppointments[2], monthAppointments[3], monthAppointments[4], monthAppointments[5], monthAppointments[6], monthAppointments[7], monthAppointments[8], monthAppointments[9], monthAppointments[10], monthAppointments[11]]
                chartData.value = {
                    labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
                        datasets: [
                            {
                                label: '',
                                backgroundColor: '#01B9F9',
                                borderColor: '#01B9F9',
                                data: dataForChart
                            }
                        ]
                }
                totalRevenue.value = monthAppointments[0] + monthAppointments[1] + monthAppointments[2] + monthAppointments[3] + monthAppointments[4] + monthAppointments[5] + monthAppointments[6] + monthAppointments[7] + monthAppointments[8] + monthAppointments[9] + monthAppointments[10] + monthAppointments[11]
                Math.floor(totalRevenue.value)
            }
            return monthAppointments
        }
        return { 
            countRevenue,
            totalRevenue,
            chartData
        }
    }
}
</script>
