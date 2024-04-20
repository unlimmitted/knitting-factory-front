<template>
	<div class="container">
		<BarChart :chartData="ordersChart"/>
		<BarChart :chartData="salesChart"/>
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
		<tr v-for="order in completedOrders">
			<td>{{ order.orderId }}</td>
			<td>{{ order.productName }}</td>
			<td>{{ order.quantity }}</td>
			<td>{{ order.price }}</td>
			<td>{{ order.productPrice }}</td>
			<td>{{ order.dateOfOrder }}</td>
		</tr>
	</table>
</template>

<script>
import BarChart from "@/components/BarChart.vue";
import axios from "axios";

export default {
	components: {BarChart},
	props: ["completedOrders"],
	data() {
		return {
			ordersStat: [],
			salesChart: {
				labels: [
					"Январь", "Февраль", "Март",
					"Апрель", "Май", "Июнь",
					"Июль", "Август", "Сентябрь",
					"Октябрь", "Ноябрь", "Декабрь"
				],
				datasets: [
					{
						label: "Статистика прибыли",
						data: [],
						backgroundColor: [
							"rgba(255, 99, 132, 0.2)",
							"rgba(255, 159, 64, 0.2)",
							"rgba(255, 205, 86, 0.2)",
							"rgba(75, 192, 192, 0.2)",
							"rgba(54, 162, 235, 0.2)",
							"rgba(153, 102, 255, 0.2)",
							"rgba(201, 203, 207, 0.2)",
							"rgba(255, 99, 132, 0.2)",
							"rgba(255, 159, 64, 0.2)",
							"rgba(255, 205, 86, 0.2)",
							"rgba(75, 192, 192, 0.2)",
							"rgba(54, 162, 235, 0.2)",
						],
					}
				],

			},
			ordersChart: {
				labels: [
					"Январь", "Февраль", "Март",
					"Апрель", "Май", "Июнь",
					"Июль", "Август", "Сентябрь",
					"Октябрь", "Ноябрь", "Декабрь"
				],
				datasets: [
					{
						label: "Статистика заказов",
						data: [],
						backgroundColor: [
							"rgba(255, 99, 132, 0.2)",
							"rgba(255, 159, 64, 0.2)",
							"rgba(255, 205, 86, 0.2)",
							"rgba(75, 192, 192, 0.2)",
							"rgba(54, 162, 235, 0.2)",
							"rgba(153, 102, 255, 0.2)",
							"rgba(201, 203, 207, 0.2)",
							"rgba(255, 99, 132, 0.2)",
							"rgba(255, 159, 64, 0.2)",
							"rgba(255, 205, 86, 0.2)",
							"rgba(75, 192, 192, 0.2)",
							"rgba(54, 162, 235, 0.2)",
						],
					}
				],

			}
		}
	},
	mounted() {
		this.getOrderStat()
	},
	methods: {
		getOrderStat() {
			axios.get("http://localhost:8080/api/v1/get-orders-stat").then(
				response => {
					this.salesChart.datasets[0].data = response.data[0]
					this.ordersChart.datasets[0].data = response.data[1]
				}
			)
		}
	}
}

</script>

<style scoped>
.container {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin: 10px;
}
</style>