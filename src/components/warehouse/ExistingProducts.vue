<template>
	<div v-if="existingProducts.length !== 0">
		<table style="margin-top: 20px">
			<tr>
				<th>Наименование</th>
				<th>Количество</th>
				<th>Стоиомсть (рубли)</th>
				<th>Относится к заказу (номер заказа)</th>
			</tr>
			<tr v-for="product in existingProducts">
				<td>{{ product.product.name }}</td>
				<td>{{ product.quantity }}</td>
				<td>{{ product.product.price }}</td>
				<td>{{ product.order.id }}</td>
			</tr>
		</table>
	</div>
	<div v-else>
		<center>
			<h3>Товаров на складе нет</h3>
		</center>
	</div>
</template>

<script>

export default {
	props: ["existingProducts"]
}

</script>


<style scoped>

</style>