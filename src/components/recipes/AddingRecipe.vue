<template>
	<div class="recipeNaming">
		<p>Название рецепта</p>
		<input class="recipeName" type="text" v-model="recipeName">
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
			<center><p>Количество</p></center>
			<input type="number" v-model="quantity">
		</div>
		<div class="materialUnit">
			<center><p>Единица измерения</p></center>
			<div class="unit">
				<center><p>{{ selectedMaterialUnit }}</p></center>
			</div>
		</div>
	</div>
	<div v-if="selectedMaterial.length === 0"></div>
	<div v-else>
		<button
			class="addMaterialBtn"
			@click="addMaterial"
			type="submit">Добавить материал
		</button>
	</div>
	<hr class="line">
	<p>Добавленные материалы для рецепта</p>
	<div class="infoBox">
		<div class="addedMaterials">
			<table @change="updateInfoBox">
				<tr>
					<th>
						<center>Наименование</center>
					</th>
					<th>
						<center>Количество</center>
					</th>
					<th>
						<center>
							Единица измерения
						</center>
					</th>
					<th>
						<center>Тип</center>
					</th>
					<th>
						<center>Удалить материал</center>
					</th>
				</tr>
				<tr v-for="(material, index) in addedMaterials" :key="index">
					<td>
						<center>{{ material.name }}</center>
					</td>
					<td>
						<center>{{ material.quantity }}</center>
					</td>
					<td>
						<center>{{ material.unitName }}</center>
					</td>
					<td>
						<center>{{ material.typeName }}</center>
					</td>
					<td>
						<center>
							<button class="delElemBtn" @click="deleteMaterial(index)">Удалить</button>
						</center>
					</td>
				</tr>
			</table>
		</div>
		<div class="aboutRecipe">
			<center><h1>О рецепте</h1></center>
			<p id="infoPrice">Себестоимость: {{ infoBoxPrice }}</p>
			<div class="timeNorm" style="display: flex">
				<p>Норма времени на единицу товара (минуты):</p>
				<input type="number" v-model="timeNorm" min="1">
			</div>
			<button :disabled="!isFilled" type="submit" class="createNewRecipe" @click="sendNewRecipe">
				Подтвердить
			</button>
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
		checkInputFields() {
			this.isFilled = this.recipeName.trim() !== '' && this.addedMaterials.length !== 0;
		},
		updateInfoBox() {
			let totalPrice = 0;
			for (let material of this.addedMaterials) {
				totalPrice += material.price * material.quantity;
			}
			this.infoBoxPrice = totalPrice;
		},
		deleteMaterial(index) {
			this.addedMaterials.splice(index, 1)
			console.log(index)
		},
		sendNewRecipe() {
			let request = {
				name: this.recipeName,
				productionTime: this.timeNorm,
				recipes: this.addedMaterials
			}
			this.$emit("sendNewRecipe", request)

			this.selectedMaterialUnit = "Не выбрано"
			this.addedMaterials = []
			this.selectedMaterial = []
			this.recipeName = ""
			this.quantity = 1
			console.log(request)
		},

		addMaterial() {
			this.selectedMaterial.quantity = this.quantity
			this.addedMaterials.push(this.selectedMaterial)

		},
		onChangeSelectorMaterial(event) {
			let currentElement = this.availableMaterials[event.target.value]

			this.selectedMaterial = {
				material_id: currentElement.id,
				name: currentElement.name,
				price: currentElement.price,
				typeName: currentElement.typeName,
				unitName: currentElement.unitName
			}

		},
		changeSelectedMaterialUnit() {
			this.selectedMaterialUnit = this.selectedMaterial.unitName
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

.recipeNaming {

	margin-top: 15px;

	p {
		margin: 0;
	}

	.recipeName {
		width: 32%;
		padding: 12px 20px;
		margin: 8px 0;
		box-sizing: border-box;
		font-size: 20px;
	}
}

.selectMaterialBox {
	margin-top: 10px;
	display: flex;

	.selectorMaterial {
		p {
			margin: 0;
		}

		padding: 0;

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
			margin: 0;
			padding: 0;
		}
	}
}

.createNewRecipe {
	height: 50px;
	font-size: 23px;
	margin-top: 5px;
	width: 100%;
}

.addedMaterials {
	width: 70%;
}

.infoBox {
	display: flex;
}

.aboutRecipe {

	.timeNorm {

		p {
			font-size: 14px;
			margin-top: 15px;
			margin-right: 10px;
		}

		input[type=number] {
			width: 150px;
			margin-top: 10px;
			margin-bottom: 10px;
			box-sizing: border-box;
			font-size: 18px;
		}
	}

	h1 {
		font-size: 18px;
		padding: 0;
		margin: 0;
	}

	margin-left: 30px;
	padding: 20px;
	width: 30%;
	height: 100%;
	background-color: #ccc;
}

.delElemBtn {
	font-weight: bolder;
	color: crimson;
	width: 100%;
	height: 30px;
}

</style>