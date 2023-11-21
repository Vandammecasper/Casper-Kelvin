<template>
    <Line :data="chartData" :options="chartOptions" />
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
            chartData: {
                labels: ['', '', '', '', '', '', '', '', '', '', '', ''],
                datasets: [
                    {
                        label: '',
                        backgroundColor: '#01B9F9',
                        borderColor: '#01B9F9',
                        data: [40, 39, 10, 40, 39, 80, 40, 39, 10, 40, 39, 80, 40]
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
            }
        }
    }
}
</script>
