<template>
		<NewOrder @sendNewOrder="sendNewOrder" :productProduced="productProduced"/>
</template>

<script>
import NewOrder from "@/components/customerScreen/NewOrder.vue"
import axios from "axios";

export default {
	components: {
		NewOrder
	},
	data() {
		return {
			productProduced: []
		}
	},
	mounted() {
		this.getAllProducts()
	},
	methods: {

		sendNewOrder(request) {
			axios.post("/api/v1/create-new-order", request)
		},

		getAllProducts() {
			axios.get("/api/v1/get-all-recipe")
				.then(response => this.productProduced = response.data )
		}
	}
}

</script>

<style scoped>

</style>