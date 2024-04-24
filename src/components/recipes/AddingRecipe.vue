<template>
	<div class="newRecipeForm">
		<div class="recipeNaming">
			<div class="items">
				<p>Название рецепта</p>
				<input class="recipeName" type="text" v-model="recipeName">
			</div>
		</div>

		<div class="selectMaterialBox">
			<div class="selectorMaterial">
				<p>Материал</p>
				<select @change="onChangeSelectorMaterial($event)">
					<option selected disabled hidden>Выбери</option>
					<option v-for="material in availableMaterials"
							:value="availableMaterials.indexOf(material)">
						{{ material.name }}
					</option>
				</select>
			</div>
			<div class="inputField">
				<p>Количество</p>
				<input type="number" v-model="quantity">
			</div>
			<div class="materialUnit">
				<p>Единица измерения</p>
				<div class="unit">
					<p>{{ selectedMaterialUnit }}</p>
				</div>
			</div>
		</div>

		<div class="addMaterialBtn" v-if="selectedMaterial.length !== 0">
			<button
				class="addMaterialBtn"
				@click="addMaterial"
				type="submit">Добавить материал
			</button>
		</div>

		<hr style="width: 100%; margin: 0">
		<div class="addedMaterials">
			<table @change="updateInfoBox">
				<tr>
					<th>Наименование</th>
					<th>Количество</th>
					<th>Единица измерения</th>
					<th>Тип</th>
					<th>Удалить материал</th>
				</tr>
				<tr v-if="addedMaterials.length > 0" v-for="(material, index) in addedMaterials" :key="index">
					<td>{{ material.material.name }}</td>
					<td>{{ material.quantity }}</td>
					<td>{{ material.material.unitName }}</td>
					<td>{{ material.material.typeName }}</td>
					<td><button class="delElemBtn" @click="deleteMaterial(index)">Удалить</button></td>
				</tr>
				<tr v-else>
					<td colspan="5">Материалы не добавлены</td>
				</tr>
			</table>
		</div>

		<div class="submitBtn">
			<button :disabled="!isFilled" type="button" @click="openModal">
				Подтвердить
			</button>
		</div>

		<!-- Модальное окно -->
		<div id="recipeModal" class="modal" v-if="isModalOpen">
			<div class="modal-content">
				<span class="close" @click="closeModal">&times;</span>
				<div class="infoBox">
					<div class="aboutRecipe">
						<h1>О рецепте</h1>
						<p id="infoPrice">Себестоимость: {{ infoBoxPrice }} ₽</p>
						<div class="timeNorm" style="display: flex">
							<p>Норма времени на единицу товара (минуты):</p>
							<input type="number" v-model="timeNorm" min="1">
						</div>
						<button type="submit" class="createNewRecipe" @click="sendNewRecipe">
							Подтвердить
						</button>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
export default {
	el: 'infoPrice',

	props: [
		"availableMaterials"
	],

	data: () => ({
		isModalOpen: false,
		timeNorm: 1,
		selectedMaterialUnit: "Не выбрано",
		isFilled: false,
		infoBoxPrice: 0,
		selectedMaterial: [],
		recipeName: '',
		quantity: 1,
		addedMaterials: [],
	}),
	methods: {
		openModal() {
			this.isModalOpen = true;
		},
		closeModal() {
			this.isModalOpen = false;
		},
		checkInputFields() {
			this.isFilled = this.recipeName.trim() !== '' && this.addedMaterials.length !== 0;
		},
		updateInfoBox() {
			let totalPrice = 0;
			for (let material of this.addedMaterials) {
				totalPrice += material.material.price * material.quantity;
			}
			this.infoBoxPrice = totalPrice;
		},
		deleteMaterial(index) {
			this.addedMaterials.splice(index, 1)
		},
		sendNewRecipe() {
			let request = {
				material: this.addedMaterials,
				products: {
					name: this.recipeName,
					price: this.infoBoxPrice,
					productionTime: this.timeNorm
				}
			}
			this.$emit("sendNewRecipe", request)
			this.closeModal()
			this.selectedMaterialUnit = "Не выбрано"
			this.addedMaterials = []
			this.selectedMaterial = []
			this.recipeName = ""
			this.quantity = 1
		},

		addMaterial() {
			this.selectedMaterial.quantity = this.quantity
			this.addedMaterials.push(this.selectedMaterial)

		},
		onChangeSelectorMaterial(event) {
			let currentElement = this.availableMaterials[event.target.value]
			this.unitName = currentElement.unitName
			this.typeName = currentElement.typeName
			this.selectedMaterial = {
				material: {
					id: currentElement.id,
					name: currentElement.name,
					price: currentElement.price,
					type: currentElement.type,
					unit: currentElement.unit,
					typeName: currentElement.typeName,
					unitName: currentElement.unitName,
				},
			}
		},
		changeSelectedMaterialUnit() {
			this.selectedMaterialUnit = this.unitName || "Не выбрано"

		}
	},
	computed: {
		isFormValid() {
			return this.recipeName.trim() !== '' && this.addedMaterials.length !== 0;
		}
	},
	watch: {
		recipeName(newValue, oldValue) {
			this.checkInputFields()
		},
		selectedMaterial: {
			handler(newValue, oldValue) {
				this.changeSelectedMaterialUnit()
			},
			deep: true
		},
		addedMaterials: {
			handler(newValue, oldValue) {
				this.updateInfoBox()
				this.checkInputFields()
			},
			deep: true
		}
	},
}

</script>

<style scoped>

.newRecipeForm {
	border: solid 2px #ddd;
	border-top-style: unset;
	display: flex;
	flex-direction: column;
	padding: 10px;
}

.recipeNaming {
	border: solid 2px #ddd;
	padding: 10px;
	margin-top: 15px;
	display: flex;
	align-items: center;
	justify-content: center;

	.items {
		p {
			text-align: center;
			margin: 0;
		}

		.recipeName {
			width: 100%;
			padding: 12px 20px;
			margin: 8px 0;
			box-sizing: border-box;
			font-size: 20px;
		}
	}

}

.selectMaterialBox {
	margin-top: 10px;
	margin-bottom: 10px;
	padding: 10px;
	border: solid 2px #ccc;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;

	.selectorMaterial {
		padding: 0;

		p {
			text-align: center;
			margin: 0;
		}

		select {
			color: black;
			padding-left: 10px;
			padding-bottom: 0;
			font-size: 18px;
		}
	}

	.materialUnit {
		margin-left: 10px;
		p {
			margin: 0;
		}

		.unit {
			p {
				text-align: center;
				font-size: 21px;
				margin: 0;
				padding: 2px;
			}
			background-color: #ccc;
		}
	}

	.inputField {
		margin-left: 5px;
		width: 150px;

		input[type=number] {
			width: 150px;
			box-sizing: border-box;
			font-size: 18px;
		}

		p {
			text-align: center;
			margin: 0;
			padding: 0;
		}
	}
}

.addMaterialBtn{
	width: 100%;
	font-size: 20px;
	margin-bottom: 10px;
	button{
		margin: 0;
	}
}

.submitBtn {
	margin-top: 10px;

	button {
		font-size: 20px;
		margin: 0;
		width: 100%;
	}
}

.addedMaterials {
	margin-top: 10px;
	width: 100%;
}

.delElemBtn {
	font-weight: bolder;
	color: crimson;
	width: 100%;
	height: 30px;
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
	background-color: rgb(0,0,0);
	background-color: rgba(0,0,0,0.4);
}

/* Стиль для контента модального окна */
.modal-content {
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