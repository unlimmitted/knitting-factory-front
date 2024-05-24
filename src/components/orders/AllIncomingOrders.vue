<template>
	<div class="content" v-if="store.getters.INCOMING_ORDERS.length > 0">
		<table>
			<tr>
				<th>Номер заказа</th>
				<th>Наименование товара</th>
				<th>Количество</th>
				<th>Дедлайн</th>
				<th>Дата заказа</th>
				<th>Принять</th>
			</tr>
			<tr v-for="(order, index) in store.getters.INCOMING_ORDERS">
				<td>{{ order.id }}</td>
				<td>{{ order.product.name }}</td>
				<td>{{ order.quantity }}</td>
				<td>{{ dateFormatter(order.deadline) }}</td>
				<td>{{ dateFormatter(order.dateOfOrder) }}</td>
				<td>
					<center>
						<button @click="openModal(index)">Принять</button>
					</center>
				</td>
			</tr>
		</table>
	</div>
	<div class="content" v-else>
		<h1>Нет входящих заказов</h1>
	</div>
	<!-- Модальное окно -->
	<div id="recipeModal" class="modal" v-if="isModalOpen">
		<div class="modal-content">
			<span class="close" @click="closeModal">&times;</span>
			<div class="infoBox">
				<div class="aboutRecipe">
					<h1>Возможность выполнения</h1>
					<p>Материалы: </p>
					<table>
						<tr>
							<th>Материал</th>
							<th>Требуется</th>
							<th>Есть на складе</th>
						</tr>
						<tr v-for="(recipe, index) in recipeProduct">
							<td>{{ recipe.material.name }}</td>
							<td>{{ recipe.quantity * store.getters.INCOMING_ORDERS[currentOrderIndex].quantity }}</td>
							<td :id="index + '_quantity'">{{ materialsInWarehouse[index].quantity }}</td>
						</tr>
					</table>
					<button :disabled="disabledSubmitBtn" type="submit" class="createNewRecipe" @click="acceptOrder">
						Подтвердить
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import {store} from "@/store/main.js";
import axios from "axios";

export default {
	computed: {
		store() {
			return store
		},
	},
	data() {
		return {
			disabledSubmitBtn: false,
			isModalOpen: false,
			materialsInWarehouse: [],
			recipeProduct: null,
			currentOrderIndex: null
		}
	},
	mounted() {
	},
	methods: {
		sleep(milliseconds) {
			return new Promise((resolve) => setTimeout(resolve, milliseconds));
		},
		async getRecipeByProduct() {
			await axios.post("/api/v1/get-recipe-by-product",
				this.$store.getters.INCOMING_ORDERS[this.currentOrderIndex].product).then(response => {
				this.recipeProduct = response.data.material
			})
		},
		async getMaterialsInWarehouseByMaterial(material) {
			await axios.post("/api/v1/get-material-in-warehouse-by-material", material).then(
				response => {
					this.materialsInWarehouse.push(response.data)
				}
			)
		},
		async openModal(index) {
			this.currentOrderIndex = index
			await this.getRecipeByProduct()
			for (let i = 0; i < this.recipeProduct.length; i++) {
				await this.getMaterialsInWarehouseByMaterial(this.recipeProduct[i].material)
			}
			console.log(this.materialsInWarehouse[1])
			this.isModalOpen = true
			await this.changeColorItems()
		},
		async changeColorItems() {
			await this.sleep(100)
			this.disabledSubmitBtn = false
			let order = this.$store.getters.INCOMING_ORDERS[this.currentOrderIndex]
			for (let i = 0; i < this.recipeProduct.length; i++) {
				if (this.recipeProduct[i].quantity * order.quantity > this.materialsInWarehouse[i].quantity) {
					let elem = document.getElementById(`${i}_quantity`)
					elem.style.color = "red"
					this.disabledSubmitBtn = true
				}
			}
		},

		closeModal() {
			this.isModalOpen = false;
		},

		dateFormatter(dateString) {
			const date = new Date(dateString)
			const pad = (num) => num < 10 ? `0${num}` : num

			const day = pad(date.getDate())
			const month = pad(date.getMonth() + 1)
			const year = date.getFullYear()

			return `${day}.${month}.${year}`
		},
		acceptOrder() {
			let order = this.$store.getters.INCOMING_ORDERS[this.currentOrderIndex]
			axios.post("/api/v1/make-order-accepted", order)
			this.closeModal()
		}
	}
}

</script>

<style scoped>
.content {
	text-align: center;
	margin-top: 20px;
}

/* Стиль для фона модального окна */
.modal {
	display: block;
	position: fixed;
	z-index: 1000;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	overflow: auto;
	background-color: rgb(0, 0, 0);
	background-color: rgba(0, 0, 0, 0.4);
}

/* Стиль для контента модального окна */
.modal-content {
	.materialInWarehouse {
		display: flex;
		flex-direction: row;

		p {
			font-size: 10px;
		}
	}

	h1 {
		text-align: center;
	}

	p {
		margin-top: 10px;
		margin-bottom: 10px;
		font-size: 20px;
	}

	input {
		font-size: 20px;
		margin-left: 15px;
		margin-top: auto;
		margin-bottom: auto;
	}

	button {
		font-size: 20px;
		width: 100%;
		margin-top: 20px;
	}

	background-color: #fefefe;
	margin: 15% auto; /* 15% от верхнего края и автоматический отступ по бокам */
	padding: 20px;
	border: 1px solid #888;
	width: 50%; /* Ширина контента модального окна */
}

/* Стиль для кнопки закрытия */
.close {
	color: #aaa;
	float: right;
	font-size: 28px;
	font-weight: bold;
}

.close:hover,
.close:focus {
	color: black;
	text-decoration: none;
	cursor: pointer;
}
</style>