<template>
	<div v-if="existingMaterial.length !== 0">
		<table style="margin-top: 20px">
			<tr>
				<th>Наименование</th>
				<th>Количество</th>
				<th>Тип</th>
				<th>Суммарная стоиомсть (рубли)</th>
			</tr>
			<tr v-for="material in existingMaterial">
				<td>{{ material.name }}</td>
				<td>{{ material.quantity }}</td>
				<td>{{ material.typeName }}</td>
				<td>{{ material.price }}</td>
			</tr>
		</table>
	</div>
	<div>
		<center>
			<h3>Материалов на складе нет</h3>
		</center>
	</div>
</template>

<script>

export default {
	props: ["existingMaterial"],
}
</script>

<style scoped>

</style>