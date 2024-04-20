<template>
	<div class="contentBlock">
		<center><h1 class="blockTitle">Заказ</h1></center>
		<div class="orderDetail">
			<div class="productsProduced">
				<div class="selectors">
					<p>Товар</p>
					<select @change="onChangeSelectorProduct($event)">
						<option selected disabled hidden>Выбери</option>
						<option v-for="product in productProduced"
								:value="productProduced.indexOf(product)">
							{{ product.name }}
						</option>
					</select>
					<p>Количество</p>
					<input type="number" v-model="quantityProduct" min="0">
					<p>Дедлайн</p>
					<input type="date" v-model="deadline">
				</div>
			</div>
			<div class="aboutProduct">
				<center><p>Выбранно</p></center>
				<div class="details">
					<p>Название: {{ selectedProductName }}</p>
					<p>Количество: {{ quantityProduct }}</p>
					<hr>
					<p>Итоговая стоимость: {{ Number((selectedProductPrice).toFixed(2)) }}</p>
				</div>
				<button class="orderBtn" @click="sendNewOrder">Заказать</button>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	props: [
		"productProduced"
	],
	data() {
		return {
			deadline: '',
			quantityProduct: 0,
			selectedProductName: '',
			selectedProductPrice: 0,
			selectedProduct: []
		}
	},
	methods: {
		onChangeSelectorProduct(event) {
			let currentElement = this.productProduced[event.target.value]
			this.selectedProduct = {
				id: currentElement.id,
				name: currentElement.name,
				price: currentElement.price,
			}
		},
		sendNewOrder() {
			let request = {
				productId: this.selectedProduct.id,
				name: this.selectedProduct.name,
				quantity: this.quantityProduct,
				deadline: new Date(this.deadline),
				dateOfOrder: new Date()
			}
			this.$emit("sendNewOrder", request)
			this.deadline = ''
			this.quantityProduct = 0
			this.selectedProductName = ''
			this.selectedProductPrice = 0

		},
		changeSelectedProductName() {
			this.selectedProductName = this.selectedProduct.name
			this.selectedProductPrice = this.selectedProduct.price * this.quantityProduct
		}
	},
	watch: {
		quantityProduct: {
			handler(newValue, oldValue) {
				this.changeSelectedProductName()
			}
		},
		selectedProduct: {
			handler(newValue, oldValue) {
				this.changeSelectedProductName()
			},
			deep: true
		},
	}
}

</script>

<style scoped>

.contentBlock {
	margin-top: 50px;
	margin-left: auto;
	margin-right: auto;
	border-style: solid;
	border-color: #111111;
	padding: 0;
	width: 30%;
	background-color: azure;

	.blockTitle {
		margin: 20px;
	}

	.orderDetail {
		display: flex;

		padding-bottom: 50px;

		p {
			padding: 0;
			margin: 0;
		}

		.productsProduced {
			background-color: #ccc;
			padding: 20px;
			margin-left: auto;
			margin-right: 20px;

			p {
				padding-top: 5px;
				padding-bottom: 5px;
			}

			input[type=number] {
				width: 95%;
			}

			select {
				width: 100%;
				font-size: 15px;
			}
		}

		.aboutProduct {
			padding-top: 10px;
			padding-bottom: 20px;
			padding-left: 30px;
			padding-right: 30px;
			background-color: #ccc;
			margin-right: auto;

			p {
				padding-top: 0;
			}

			.details {
				width: 100%;

				p {
					font-size: 16px;
				}
			}

			.orderBtn {
				width: 100%;
				font-size: 18px;
			}
		}

	}
}

</style>