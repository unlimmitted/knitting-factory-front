<template>
	<div class="allRecipes" v-for="recipe in allRecipes">
		<p>Название: {{ recipe.name }}</p>
		<p>Себестоимость: {{ recipe.price }}₽</p>
		<div class="components">
			<table>
				<tr>
					<th>Наименование</th>
					<th>Количество</th>
					<th>Единица измерения</th>
					<th>Тип</th>
				</tr>
				<tr v-for="material in recipe.recipes">
					<td>{{ material.name }}</td>
					<td>{{ material.quantity }}</td>
					<td>{{ material.unitName }}</td>
					<td>{{ material.typeName }}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
export default {
	props: [
		"allRecipes",
	],
	data: () => ({}),
}
</script>

<style scoped>
.allRecipes {
	font-size: 17px;
}

p {
	font-weight: bolder;
	font-style: oblique;
}
</style>