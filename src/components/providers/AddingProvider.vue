<template>
	<p>Название компании поставщика</p>
	<input type="text" v-model="this.providerName">
	<p style="margin-top: 10px">Материал</p>
	<select @change="onChangeSelectorMaterial($event)">
		<option selected disabled hidden>Выбери</option>
		<option v-for="material in materials"
				:value="materials.indexOf(material)">
			{{ material.name }}
		</option>
	</select>
	<button @click="addMaterial">Добавить материал</button>
	<div class="addedMaterials" style="margin-top: 10px">
		<table>
			<tr>
				<th>Наименование</th>
				<th>Единица измерения</th>
				<th>Тип</th>
				<th>Удалить материал</th>
			</tr>
			<tr v-if="providerMaterials.length > 0" v-for="(material, index) in providerMaterials" :key="index">
				<td>{{ material.material.name }}</td>
				<td>{{ material.material.unitName }}</td>
				<td>{{ material.material.typeName }}</td>
				<td>
					<button class="delElemBtn" @click="deleteMaterial(index)">Удалить</button>
				</td>
			</tr>
			<tr v-else>
				<td colspan="5">Материалы не добавлены</td>
			</tr>
		</table>
	</div>
	<button
		@click="setNewProvider"
		style="margin-top: 10px; width: 100%; font-size: 25px"
	>
		Добавить поставщика
	</button>
</template>

<script>
import axios from "axios";

export default {
	props: ['materials'],
	data() {
		return {
			providerName: '',
			providerMaterials: [],
			selectedMaterial: []
		}
	},
	methods: {
		onChangeSelectorMaterial(event) {
			let currentElement = this.materials[event.target.value]
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
		addMaterial() {
			this.providerMaterials.push(this.selectedMaterial)
		},
		deleteMaterial(index) {
			this.providerMaterials.splice(index, 1)
		},
		setNewProvider() {
			let request = {
				id: null,
				companyName: this.providerName,
				material: this.providerMaterials
			}
			axios.post("/api/v1/set-new-provider", request)
			this.providerName = ''
			this.providerMaterials = []
		}
	}
}
</script>

<style scoped>

</style>