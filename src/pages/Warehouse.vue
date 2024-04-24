<template>
	<div class="main">
		<p>Склад</p>
		<hr>
		<button class="accordion" @click="showAddingRecipe(0)">Товары на складе</button>
		<div class="panel">
			<ExistingProducts :existingProducts="existingProducts"/>
		</div>
		<button class="accordion" @click="showAddingRecipe(1)">Материалы на складе</button>
		<div class="panel">
			<ExistingMaterials :existingMaterial="existingMaterial"/>
		</div>
	</div>
</template>

<script>
import ExistingMaterials from "@/components/warehouse/ExistingMaterials.vue"
import OrderingMaterials from "@/components/orders/OrderingMaterials.vue";
import axios from "axios";
import ExistingProducts from "@/components/warehouse/ExistingProducts.vue";

export default {
	components: {ExistingProducts, OrderingMaterials, ExistingMaterials},
	data: () => ({
		existingProducts: [],
		existingMaterial: []
	}),
	mounted() {
		this.getExistingProducts()
		this.getExistingMaterial()
	},
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
		getExistingProducts() {
			axios.get("http://localhost:8080/api/v1/get-product-in-warehouse")
				.then(response => {
					this.existingProducts = response.data
				}
			)
		},
		getExistingMaterial(){
			axios.get("http://localhost:8080/api/v1/get-material-in-warehouse")
				.then(response => {
					this.existingMaterial = response.data
				})
		}
	}
}

</script>

<style scoped>
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
}

</style>