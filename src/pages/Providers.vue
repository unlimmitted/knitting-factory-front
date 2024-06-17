<template>
	<div class="main">
		<p>Поставщики</p>
		<hr>
		<button class="accordion" @click="showAddingRecipe(0)">Добавить поставщика</button>
		<div class="panel">
			<AddingProviders :materials="materials"/>
		</div>
		<button class="accordion" @click="showAddingRecipe(1)">Поставщики</button>
		<div class="panel">
			<ExistingProviders :allProviders="this.allProviders"/>
		</div>
	</div>
</template>

<script>

import AddingProviders from '@/components/providers/AddingProvider.vue'
import axios from "axios";
import ExistingProviders from "@/components/providers/ExistingProviders.vue";

export default {
	components: {AddingProviders, ExistingProviders},
	data() {
		return {
			materials: [],
			allProviders: []
		}
	},
	mounted() {
		axios.get("/api/v1/get-all-material")
			.then(response => this.materials = response.data)
		axios.get("/api/v1/get-all-providers")
			.then(response => this.allProviders = response.data)
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
	}
}
</script>

<style scoped>

</style>