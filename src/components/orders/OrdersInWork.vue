<template>
	<div v-if="ordersInWorkProgress.length !== 0">
		<table class="orderTable">
			<tr>
				<th>Номер заказа</th>
				<th>Продукт</th>
				<th>Количество</th>
				<th>Дедлайн</th>
				<th>Прогресс</th>
			</tr>
			<tr v-for="order in store.getters.DONE">
				<td>{{ order.id }}</td>
				<td>{{ order.productName }}</td>
				<td>{{ order.quantity }}</td>
				<td>{{ order.deadline }}</td>
				<td>{{ order.done }} %</td>
			</tr>
		</table>
	</div>
	<div v-else>
		<center><h1>Нет выполняющихся заказов</h1></center>
	</div>


</template>

<script>

import axios from "axios";
import {store} from "@/store/main.js";

export default {
	props: ["ordersInWorkProgress"],
	data() {
		return {
			data: []
		}
	},
	mounted() {
		console.log(this.$store.getters.DONE)
	},
	computed: {
		store() {
			return store
		},
		getOrderStat() {
			return this.$store.getters.DONE
		},
	}
}

</script>

<style scoped>

.orderTable {
	margin-top: 20px;
}

</style>