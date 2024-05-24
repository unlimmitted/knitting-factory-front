<template>
	<div class="main">
		<p>Рецепты</p>
		<hr>
		<button class="accordion" @click="showAddingRecipe(0)">Существующие рецепты</button>
		<div class="panel">
			<AllRecipes :allRecipes="allRecipes"/>
		</div>
		<button class="accordion" @click="showAddingRecipe(1)">Добавление рецепта</button>
		<div class="panel">
			<AddingRecipe @sendNewRecipe="sendNewRecipe" :availableMaterials="availableMaterials"/>
		</div>
	</div>
</template>

<script>
import axios from "axios"
import AddingRecipe from "@/components/recipes/AddingRecipe.vue";
import AllRecipes from "@/components/recipes/AllRecipes.vue"

export default {

	components: {
		AddingRecipe,
		AllRecipes
	},

	data: () => ({
		allRecipes: [],
		selectedMaterial: [],
		recipeName: '',
		quantity: 1,
		addedMaterials: [],
		availableMaterials: []
	}),

	methods: {
		showAddingRecipe(id) {
			let acc = document.getElementsByClassName("accordion")[id]
			acc.classList.toggle("active")
			let panel = acc.nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null
			} else {
				panel.style.maxHeight = "100%"
			}
		},
		sendNewRecipe(request) {
			axios.post("/api/v1/create-recipe", request).then(response =>{
				this.allRecipes = response.data
				}
			)
		},
	},

	mounted() {
		axios.get("/api/v1/get-all-material").then(response => {
			this.availableMaterials = response.data
		})
		axios.get("/api/v1/get-all-recipe").then(response => {
			this.allRecipes = response.data
		})
	}

}
</script>

<style>

.main {

	margin-left: 160px;
	font-size: 28px;
	padding: 0px 10px;

	.accordion {
		font-weight: bolder;
		margin-top: 10px;
		background-color: lightgray;
		color: #444;
		cursor: pointer;
		padding: 18px;
		width: 100%;
		text-align: left;
		border: none;
		outline: none;
		transition: 0.4s;
	}

	.active, .accordion:hover {
		background-color: #ccc;
	}

	.panel {
		font-size: 17px;
		padding: 0 18px;
		background-color: white;
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.2s ease-out;
	}

	.line {
		margin-top: 40px;
		margin-bottom: 40px;
	}

	p {
		margin-bottom: 5px;
		margin-top: 20px;
		padding: 0;
	}
}

</style>