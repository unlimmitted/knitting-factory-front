<template>
	<div class="main">
		<p>Заказы</p>
		<hr>
		<button class="accordion" @click="showAddingRecipe(0)">Полученные заказы</button>
		<div class="panel">
			<AllIncomingOrders @acceptOrder="acceptOrder" :allIncomingOrders="allIncomingOrders"/>
		</div>
		<button class="accordion" @click="showAddingRecipe(1)">Ожидают добавления в очередь</button>
		<div class="panel">
			<AcceptedOrders @orderToWork="orderToWork" :ordersInWork="ordersInWork" :acceptedOrders="acceptedOrders"/>
		</div>
		<button class="accordion" @click="showAddingRecipe(2)">Прогресс выполнения</button>
		<div class="panel">
			<OrdersInWork :ordersInWorkProgress="ordersInWorkProgress"/>
		</div>
		<button class="accordion" @click="showAddingRecipe(3)">Выполненые заказы</button>
		<div class="panel">
			<CompletedOrders :completedOrders="completedOrders"/>
		</div>
		<hr style="margin-top: 24px">
		<button class="accordion" @click="showAddingRecipe(4)">Заказать материалы</button>
		<div class="panel">
			<OrderingMaterials :materialList="materialList"/>
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
import SalesChart from "@/components/BarChart.vue";

export default {
	components: {OrdersInWork, CompletedOrders, AcceptedOrders, AllIncomingOrders, OrderingMaterials},
	data() {
		return {
			ordersInWorkProgress: [],
			completedOrders: [],
			allIncomingOrders: [],
			acceptedOrders: [],
			materialList: [],
			ordersInWork: []
		}
	},
	mounted() {
		this.getOrdersCollection()
		this.getAllMaterials()
	},
	methods: {
		getOrdersCollection(){
			axios.get("http://localhost:8080/api/v1/orders").then(
				response => {
					this.completedOrders = response.data.completedOrders
					this.ordersInWork = response.data.orderInWork
					this.acceptedOrders = response.data.acceptedOrder
					this.allIncomingOrders = response.data.orders
					this.ordersInWorkProgress = response.data.orderInWorkJoinOrders
				}
			)
		},
		getAllMaterials() {
			axios.get("http://localhost:8080/api/v1/").then(
				response => {
					this.materialList = response.data
				}
			)
		},
		orderToWork(orderId) {
			let request = {
				id: null,
				orderId: orderId
			}
			axios.post("http://localhost:8080/api/v1/put-order-to-work", request).then(
				response => {
					this.acceptedOrders = response.data[0]
					this.ordersInWorkProgress = response.data[1]
				}
			)
		},
		acceptOrder(orderId) {
			let request = {
				id: null,
				orderId: orderId
			}
			axios.post("http://localhost:8080/api/v1/make-order-accepted", request).then(
				response => {
					this.allIncomingOrders = response.data[0]
					this.acceptedOrders = response.data[1]
				}
			)
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