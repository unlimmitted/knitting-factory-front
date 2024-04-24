<template>
	<div v-if="store.getters.ORDERS_DONE.length > 0">
		<table class="orderTable">
			<tr>
				<th>Номер заказа</th>
				<th>Продукт</th>
				<th>Количество</th>
				<th>Дедлайн</th>
				<th>Прогресс</th>
			</tr>
			<tr v-for="order in store.getters.ORDERS_DONE">
				<td>{{ order.id }}</td>
				<td>{{ order.order.product.name }}</td>
				<td>{{ order.order.quantity }}</td>
				<td>{{ dateFormatter(order.order.deadline) }}</td>
				<td>
					<fwb-progress
						:progress="Math.ceil(order.done * 100 / order.needToDo)"
						label-position="inside"
						label-progress
						color="green"
						size="lg"
					/>
				</td>
			</tr>
		</table>
	</div>
	<div v-else>
		<center><h1>Нет выполняющихся заказов</h1></center>
	</div>


</template>

<script>
import {FwbProgress} from "flowbite-vue";
import {store} from "@/store/main.js";

export default {
	components: {FwbProgress},
	data() {
		return {
			data: []
		}
	},
	methods: {
		dateFormatter(dateString) {
			const date = new Date(dateString)
			const pad = (num) => num < 10 ? `0${num}` : num

			const day = pad(date.getDate())
			const month = pad(date.getMonth() + 1)
			const year = date.getFullYear()

			return `${day}.${month}.${year}`
		}
	},
	computed: {
		store() {
			return store
		},
	}
}
</script>

<style scoped>

.orderTable {
	margin-top: 20px;
}

</style>