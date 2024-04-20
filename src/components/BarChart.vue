<template>
	<div class="chart">
		<Bar
			:options="chartOptions"
			:data="this.chartData"
		/>
	</div>
</template>

<script>
import {Bar} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

export default {
	name: 'BarChart',
	components: {Bar},
	props: ['chartData'],
	data() {
		return {
			chartOptions: {
				responsive: true
			}
		}
	},

}
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
</script>


<style scoped>
.chart {
	margin: auto;
	width: 550px;
	height: 100%;
}
</style>