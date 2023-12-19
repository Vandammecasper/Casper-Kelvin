<template>
    <Line v-if="chartData" :data="chartData" :options="chartOptions" />
    <div class="flex justify-between">
        <p>Total customers</p>
        <h3>{{totalUsers}}</h3>
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
            loading,
            onResult
        } = useQuery(GET_ALL_USERS)

        const data = ref({})

        onResult((result) => {
            if (!result.loading) {
                // console.log(result)
                data.value = getUsersResult
                countUsers()
            }
        })

        const chartData = ref()
        const totalUsers = ref()

        const countUsers = () => {
            const monthUsers = Array(12).fill(0);
            if (data.value) {
                for (let i = 0; i < getUsersResult.value.users?.length; i++) {
                    // console.log(getUsersResult.value.users)
                    if (getUsersResult.value.users[i].role === 'USER') {
                        // console.log('user')
                        const user = getUsersResult.value.users[i];
                        const creationDate = new Date(user.createdAt);
                        // console.log(creationDate)

                        for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
                            const firstDayOfMonth = new Date(new Date().getFullYear(), monthIndex, 1);
                            const lastDayOfMonth = new Date(new Date().getFullYear(), monthIndex + 1, 1);

                            if (creationDate > firstDayOfMonth && creationDate < lastDayOfMonth) {
                                monthUsers[monthIndex] += 1;
                                break; // Break out of the loop once the month is found
                            }
                        }
                    }
                }
                const dataForChart = [monthUsers[0], monthUsers[1], monthUsers[2], monthUsers[3], monthUsers[4], monthUsers[5], monthUsers[6], monthUsers[7], monthUsers[8], monthUsers[9], monthUsers[10], monthUsers[11]]
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
                totalUsers.value = monthUsers[0] + monthUsers[1] + monthUsers[2] + monthUsers[3] + monthUsers[4] + monthUsers[5] + monthUsers[6] + monthUsers[7] + monthUsers[8] + monthUsers[9] + monthUsers[10] + monthUsers[11]
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
