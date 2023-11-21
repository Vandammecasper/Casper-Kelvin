<template>
    <Bar :data="data" :options="options" class="h-40" />
</template>

<script lang="ts">
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import * as chartConfig from './barChartConfig.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
    name: 'App',
    components: {
        Bar
    },
    computed: {
        myStyles() {
            return {
                color: '#DE9D1E',
                position: 'relative'
            }
        }
    },
    data() {
        return chartConfig
    }
}
</script>
./barChartConfig.js