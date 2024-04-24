<template>
	<div class="content" v-if="store.getters.INCOMING_ORDERS.length > 0">
		<table>
			<tr>
				<th>Номер заказа</th>
				<th>Наименование товара</th>
				<th>Количество</th>
				<th>Дедлайн</th>
				<th>Дата заказа</th>
				<th>Принять</th>
			</tr>
			<tr v-for="order in store.getters.INCOMING_ORDERS">
				<td>{{ order.id}}</td>
				<td>{{ order.product.name }}</td>
				<td>{{ order.quantity }}</td>
				<td>{{ dateFormatter(order.deadline) }}</td>
				<td>{{ dateFormatter(order.dateOfOrder) }}</td>
				<td><center><button @click="acceptOrder(order)" >Принять</button></center></td>
			</tr>
		</table>
	</div>
	<div class="content" v-else>
		<center>
			<h1>Нет входящих заказов</h1>
		</center>
	</div>
</template>

<script>

import {store} from "@/store/main.js";

export default {
	computed: {
		store() {
			return store
		}
	},
	props: ["allIncomingOrders"],
	methods: {
		dateFormatter(dateString) {
			const date = new Date(dateString)
			const pad = (num) => num < 10 ? `0${num}` : num

			const day = pad(date.getDate())
			const month = pad(date.getMonth() + 1)
			const year = date.getFullYear()

			return `${day}.${month}.${year}`
		},
		acceptOrder(order){
			this.$emit("acceptOrder", order)
		}
	}
}

</script>

<style scoped>
.content {
	margin-top: 20px;
}
</style>