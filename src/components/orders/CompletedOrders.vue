<template>
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

export default {
	props: ["completedOrders"]
}

</script>

<style scoped>

</style>