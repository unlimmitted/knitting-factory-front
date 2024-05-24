<template>
	<div class="main">
		<p>Заказы</p>
		<hr>
		<button class="accordion" @click="showAddingRecipe(0)">Полученные заказы</button>
		<div class="panel">
			<AllIncomingOrders/>
		</div>
		<button class="accordion" @click="showAddingRecipe(1)">Ожидают добавления в очередь</button>
		<div class="panel">
			<AcceptedOrders @orderToWork="orderToWork"/>
		</div>
		<button class="accordion" @click="showAddingRecipe(2)">Прогресс выполнения</button>
		<div class="panel">
			<OrdersInWork/>
		</div>
		<button class="accordion" @click="showAddingRecipe(3)">Выполненые заказы</button>
		<div class="panel">
			<CompletedOrders/>
		</div>
		<hr style="margin-top: 24px">
		<button class="accordion" @click="showAddingRecipe(4)">Заказать материалы</button>
		<div class="panel">
			<OrderingMaterials :materialList="materialInWarehouse"/>
		</div>
	</div>
</template>

<script>

import OrderingMaterials from "@/components/orders/OrderingMaterials.vue";
import AllIncomingOrders from "@/components/orders/AllIncomingOrders.vue";
import axios from "axios";
import AcceptedOrders from "@/components/orders/AcceptedOrders.vue";
import CompletedOrders from "@/components/orders/CompletedOrders.vue";
import OrdersInWork from "@/components/orders/OrdersInWork.vue";

export default {
	components: {OrdersInWork, CompletedOrders, AcceptedOrders, AllIncomingOrders, OrderingMaterials},
	data() {
		return {
			materialInWarehouse: [],
		}
	},
	mounted() {
		this.getAllMaterials()
	},
	methods: {
		getAllMaterials() {
			axios.get("/api/v1/get-material-in-warehouse").then(
				response => {
					this.materialInWarehouse = response.data
				}
			)
		},
		orderToWork(order) {
			axios.post("/api/v1/put-order-to-work", order)
		},
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
.main {
	margin-left: 160px;
	font-size: 28px;
	padding: 0px 10px;
}

</style>