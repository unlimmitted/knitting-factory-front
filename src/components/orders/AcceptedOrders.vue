<template>
	<div class="content" v-if="acceptedOrders.length !== 0">
		<table class="acceptedOrdersTable">
			<tr>
				<th>Номер заказа</th>
				<th>Наименование товара</th>
				<th>Количество</th>
				<th>Дедлайн</th>
				<th>Дата заказа</th>
				<th>В работу</th>
			</tr>
			<tr v-for="(order, index) in acceptedOrders">
				<td>{{ order.id }}</td>
				<td>{{ order.name }}</td>
				<td>{{ order.quantity }}</td>
				<td>{{ order.deadline }}</td>
				<td>{{ order.dateOfOrder }}</td>
				<td>
					<center>
						<button @click="orderToWork(order.id)">Пустить в работу</button>
					</center>
				</td>
			</tr>
		</table>
	</div>
	<div class="content" v-else>
		<center>
			<h1>Нет принятых заказов</h1>
		</center>
	</div>
</template>

<script>

export default {
	props: ["acceptedOrders", "ordersInWork"],
	data() {
		return {}
	},
	methods: {
		orderToWork(id) {

			this.$emit("orderToWork", id)

		}
	}
}

</script>

<style scoped>
.acceptedOrdersTable {
	margin-top: 20px;
}
</style>