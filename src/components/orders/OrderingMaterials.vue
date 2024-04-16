<template>
	<table class="materialTable">
		<tr>
			<th>Название материала</th>
			<th>Цена за единицу</th>
			<th>Единицы измерения</th>
			<th>Требуемое количество</th>
			<th>Заказать</th>
		</tr>
		<tr v-for="material in materialList">
			<td>{{ material.name }}</td>
			<td>{{ material.price }}</td>
			<td>{{ material.unitName }}</td>
			<td><input type="number" :value="materialQuantity" min="1"></td>
			<td><center><button @click="orderingMaterial(material.id)" >Заказать</button></center></td>
		</tr>
	</table>
</template>

<script>
export default {
	props: ["materialList"],
	data(){
		return {
			materialQuantity: 1
		}
	},
	methods: {
		orderingMaterial(){

		}
	}
}
</script>

<style scoped>

.materialTable {
	margin-top: 20px;
}

</style>