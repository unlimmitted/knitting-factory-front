<template>
	<div class="container">
		<div class="charts">
			<div class="chart">
				<div class="item">
					<p>Статистика дохода</p>
					<apexchart
						width="600"
						type="line"
						:options="profitData.options"
						:series="profitData.series"
					/>
				</div>
			</div>
			<div class="chart">
				<div class="item">
					<p>Статистика заказов</p>
					<apexchart
						width="600"
						type="line"
						:options="ordersData.options"
						:series="ordersData.series"
					/>
				</div>
			</div>
		</div>
	</div>
	<hr>
	<table class="acceptedOrdersTable" style="margin-top: 20px">
		<tr>
			<th>Номер заказа</th>
			<th>Наименование товара</th>
			<th>Количество</th>
			<th>Цена заказа</th>
			<th>Цена за единицу товара</th>
			<th>Дата заказа</th>
		</tr>
		<tr v-if="store.getters.COMPLETE_ORDERS.length > 0" v-for="order in store.getters.COMPLETE_ORDERS">
			<td>{{ order.id }}</td>
			<td>{{ order.product.name }}</td>
			<td>{{ order.quantity }}</td>
			<td>{{ Math.ceil(order.quantity * order.product.price) }}</td>
			<td>{{ order.product.price }}</td>
			<td>{{ dateFormatter(order.dateOfOrder) }}</td>
		</tr>
		<tr v-else>
			<td colspan="6">Нет выполненных заказов</td>
		</tr>
	</table>
</template>

<script>
import {store} from "@/store/main.js";
import {mapGetters} from "vuex";

export default {
	computed: {
		store() {
			return store
		},
		...mapGetters({
			ordersStats: 'ORDERS_STATS'
		}),
		profitData() {
			return {
				months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Ноябрь", "Декаберь"],
				options: {
					chart: {
						id: 'vuechart-example'
					},
					xaxis: {
						categories: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Ноябрь", "Декаберь"]
					}
				},
				series: [{
					name: 'series-1',
					data: this.ordersStats && this.ordersStats.length > 0 ? this.ordersStats[0] : []
				}]
			};
		},
		ordersData() {
			return {
				months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Ноябрь", "Декаберь"],
				options: {
					chart: {
						id: 'vuechart-example'
					},
					xaxis: {
						categories: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Ноябрь", "Декаберь"]
					}
				},
				series: [{
					name: 'series-1',
					data: this.ordersStats && this.ordersStats.length > 0 ? this.ordersStats[1] : []
				}]
			};
		}
	},
	data() {
		return {

		}
	},
	methods: {
		dateFormatter(dateString) {
			const date = new Date(dateString)
			const pad = (num) => num < 10 ? `0${num}` : num

			const day = pad(date.getDate())
			const month = pad(date.getMonth() + 1)
			const year = date.getFullYear()

			return `${day}.${month}.${year}`
		}
	}
}
</script>

<style scoped>
.container {
	margin: 10px;

	.charts {
		margin-top: 30px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.chart {

			margin: auto;
			.item {
				display: flex;
				flex-direction: column;
				p{
					margin: 0;
				}
				align-items: center;
			}
		}
	}

}
</style>