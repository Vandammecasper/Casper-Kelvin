<template>
    <Line v-if="hasFetchedData" :data="chartData" :options="chartOptions" />
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
        // if(this.hasFetchedData){
            return {
                chartData: {
                    labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
                    datasets: [
                        {
                            label: '',
                            backgroundColor: '#F91818',
                            borderColor: '#F91818',
                            data: [this.ChartData]
                        }
                    ]
                },
                chartOptions: {
                    responsive: true,
                    maintainAspectRatio: false,
                }
            }
        // }
        
    },
    
    setup(){
        const firstDayOfJanuary= new Date(new Date().getFullYear(), 0, 1)
        const firstDayOfFebruary= new Date(new Date().getFullYear(), 1, 1)
        const firstDayOfMarch= new Date(new Date().getFullYear(), 2, 1)
        const firstDayOfApril= new Date(new Date().getFullYear(), 3, 1)
        const firstDayOfMay= new Date(new Date().getFullYear(), 4, 1)
        const firstDayOfJune= new Date(new Date().getFullYear(), 5, 1)
        const firstDayOfJuly= new Date(new Date().getFullYear(), 6, 1)
        const firstDayOfAugust= new Date(new Date().getFullYear(), 7, 1)
        const firstDayOfSeptember= new Date(new Date().getFullYear(), 8, 1)
        const firstDayOfOctober= new Date(new Date().getFullYear(), 9, 1)
        const firstDayOfNovember= new Date(new Date().getFullYear(), 10, 1)
        const firstDayOfDecember= new Date(new Date().getFullYear(), 11, 1)
        let januaryAppointments= 0
        let februaryAppointments= 0
        let marchAppointments= 0
        let aprilAppointments= 0
        let mayAppointments= 0
        let juneAppointments= 0
        let julyAppointments= 0
        let augustAppointments= 0
        let septemberAppointments= 0
        let octoberAppointments= 0
        let novemberAppointments= 0
        let decemberAppointments= 0
        let ChartData = []
        
        const {
            result: getAppointmentsResult,
            refetch
        } = useQuery(GET_ALL_APPOINTMENTS)

        const hasFetchedData = ref(false);

        watchEffect(() => {
            if (getAppointmentsResult.value) {
                hasFetchedData.value = true;
                countAppointments(getAppointmentsResult.value);
            } else if (hasFetchedData.value) {
                console.log('Retrying data fetch...');
                refetch();
            } else {
                console.log('No data');
                refetch();
            }
        });


        const countAppointments = (data) => {
            console.log('start counting appointments', data.value)
            for (let i = 0; i < getAppointmentsResult.value.appointments?.length; i++) {
                const appointment = getAppointmentsResult.value.appointments[i];
                console.log(new Date(appointment.date) > firstDayOfNovember && new Date(appointment.date) < firstDayOfDecember)
                if (new Date(appointment.date) > firstDayOfJanuary && new Date(appointment.date) < firstDayOfFebruary) {
                    januaryAppointments++
                }
                if (new Date(appointment.date) > firstDayOfFebruary && new Date(appointment.date) < firstDayOfMarch) {
                    februaryAppointments++
                }
                if (new Date(appointment.date) > firstDayOfMarch && new Date(appointment.date) < firstDayOfApril) {
                    marchAppointments++
                }
                if (new Date(appointment.date) > firstDayOfApril && new Date(appointment.date) < firstDayOfMay) {
                    aprilAppointments++
                }
                if (new Date(appointment.date) > firstDayOfMay && new Date(appointment.date) < firstDayOfJune) {
                    mayAppointments++
                }
                if (new Date(appointment.date) > firstDayOfJune && new Date(appointment.date) < firstDayOfJuly) {
                    juneAppointments++
                }
                if (new Date(appointment.date) > firstDayOfJuly && new Date(appointment.date) < firstDayOfAugust) {
                    julyAppointments++
                }
                if (new Date(appointment.date) > firstDayOfAugust && new Date(appointment.date) < firstDayOfSeptember) {
                    augustAppointments++
                }
                if (new Date(appointment.date) > firstDayOfSeptember && new Date(appointment.date) < firstDayOfOctober) {
                    septemberAppointments++
                }
                if (new Date(appointment.date) > firstDayOfOctober && new Date(appointment.date) < firstDayOfNovember) {
                    octoberAppointments++
                }
                if (new Date(appointment.date) > firstDayOfNovember && new Date(appointment.date) < firstDayOfDecember) {
                    novemberAppointments++
                    console.log('november', novemberAppointments)
                }
                if (new Date(appointment.date) > firstDayOfDecember && new Date(appointment.date) < new Date(new Date().getFullYear(), 12, 1)) {
                    decemberAppointments++
                }
                
            }
            ChartData = [januaryAppointments, februaryAppointments, marchAppointments, aprilAppointments, mayAppointments, juneAppointments, julyAppointments, augustAppointments, septemberAppointments, octoberAppointments, novemberAppointments, decemberAppointments]
        }



        return{
            getAppointmentsResult,
            januaryAppointments,
            februaryAppointments,
            marchAppointments,
            aprilAppointments,
            mayAppointments,
            juneAppointments,
            julyAppointments,
            augustAppointments,
            septemberAppointments,
            octoberAppointments,
            novemberAppointments,
            decemberAppointments,
            hasFetchedData,
            ChartData
        }
    }
}
</script>
