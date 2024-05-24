<template>
	<table class="materialTable">
		<tr>
			<th>Название материала</th>
			<th>Цена за единицу</th>
			<th>Требуемое количество</th>
			<th>Единицы измерения</th>
			<th>Заказать</th>
		</tr>
		<tr>
			<td>
				<select @change="onChangeSelectorMaterial($event)">
					<option selected disabled hidden>Выбери</option>
					<option v-for="material in materialList"
							:value="materialList.indexOf(material)">
						{{ material.material.name }}
					</option>
				</select>
			</td>
			<td>{{ selectedMaterial.price }}</td>
			<td><input type="number" v-model="materialQuantity" min="1"></td>
			<td>{{ selectedMaterial.unitName }}</td>
			<td>
				<button @click="orderingMaterial">Заказать</button>
			</td>
		</tr>
	</table>
</template>

<script>
import axios from "axios";

export default {
	props: ["materialList"],
	data() {
		return {
			materialInWarehouseId: 0,
			selectedMaterial: {
				id: null,
				name: null,
				price: null,
				unit: null,
				type: null,
				typeName: null,
				unitName: null,
			},
			materialQuantity: 1
		}
	},
	methods: {
		onChangeSelectorMaterial(event) {
			this.materialInWarehouseId = this.materialList[event.target.value].id
			this.selectedMaterial.id = this.materialList[event.target.value].material.id
			this.selectedMaterial.name = this.materialList[event.target.value].material.name
			this.selectedMaterial.price = this.materialList[event.target.value].material.price
			this.selectedMaterial.unit = this.materialList[event.target.value].material.unit
			this.selectedMaterial.type = this.materialList[event.target.value].material.type
			this.selectedMaterial.unitName = this.materialList[event.target.value].material.unitName
			this.selectedMaterial.typeName = this.materialList[event.target.value].material.typeName
		},
		orderingMaterial() {
			let request = {
				id: this.materialInWarehouseId,
				quantity: this.materialQuantity,
				material: this.selectedMaterial
			}
			axios.post("/api/v1/ordering-material", request)

			this.selectedMaterial = {
				id: null,
				name: null,
				price: null,
				unit: null,
				type: null,
				typeName: null,
				unitName: null,
			}

			this.materialQuantity = 1

		}
	}
}
</script>

<style scoped>

.materialTable {
	margin-top: 20px;
}

</style>