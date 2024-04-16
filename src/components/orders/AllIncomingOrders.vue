<template>
	<div class="content" v-if="allIncomingOrders.length !== 0">
		<table>
			<tr>
				<th>Номер заказа</th>
				<th>Наименование товара</th>
				<th>Количество</th>
				<th>Дедлайн</th>
				<th>Дата заказа</th>
				<th>Принять</th>
			</tr>
			<tr v-for="order in allIncomingOrders">
				<td>{{ order.id}}</td>
				<td>{{ order.name }}</td>
				<td>{{ order.quantity }}</td>
				<td>{{ order.deadline }}</td>
				<td>{{ order.dateOfOrder }}</td>
				<td><center><button @click="acceptOrder(order.id)" >Принять</button></center></td>
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

export default {
	props: ["allIncomingOrders"],
	methods: {
		acceptOrder(id){
			this.$emit("acceptOrder", id)
		}
	}
}

</script>

<style scoped>
.content {
	margin-top: 20px;
}
</style>