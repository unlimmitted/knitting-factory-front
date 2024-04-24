<template>
	<div v-if="allRecipes.length > 0">
		<div class="allRecipes" v-for="recipe in allRecipes">
			<div class="labels">
				<p>Название: {{ recipe.products.name }}</p>
				<p>Себестоимость: {{ recipe.products.price }}₽</p>
			</div>
			<div class="components">
				<table>
					<tr>
						<th>Наименование</th>
						<th>Количество</th>
						<th>Единица измерения</th>
						<th>Тип</th>
					</tr>
					<tr v-for="material in recipe.material">
						<td>{{ material.material.name }}</td>
						<td>{{ material.quantity }}</td>
						<td>{{ material.material.unitName }}</td>
						<td>{{ material.material.typeName }}</td>
					</tr>
				</table>
			</div>
			<div class="delBtn">
				<button @click="deleteRecipe(recipe)">Удалить рецепт</button>
			</div>
		</div>
	</div>
	<div class="notFound" v-else>
		<h1>Нет рецептов</h1>
	</div>
</template>

<script>
import axios from "axios";

export default {
	props: [
		"allRecipes",
	],
	data: () => ({}),
	methods: {
		deleteRecipe(recipe) {
			axios.post("http://localhost:8080/api/v1/delete-recipe", recipe).then(response =>{
				this.allRecipes = response.data;
			})
		}
	}
}
</script>

<style scoped>
.delBtn {
	button {
		color: crimson;
		margin-top: 10px;
		width: 100%;
		font-size: 20px;
	}
}

.labels {
	display: flex;
	flex-direction: row;
	justify-content: center;
	p{
		margin-top: 0;
		margin-bottom: 10px;
		margin-right: 20px;
	}
}

.notFound {
	text-align: center;
}

.allRecipes {
	padding: 10px;
	margin-bottom: 10px;
	border: solid 2px #ccc;
	font-size: 17px;
}

p {
	font-weight: bolder;
	font-style: oblique;
}
</style>