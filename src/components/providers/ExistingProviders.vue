<template>
	<div class="providers">
		<div class="container" v-for="provider in allProviders" :key="provider.id">
			<p>{{ provider.companyName }}</p>
			<div class="materials" style="margin-top: 10px">
				<table>
					<tr>
						<th>Наименование</th>
						<th>Единица измерения</th>
						<th>Тип</th>
					</tr>
					<tr v-for="(material, index) in provider.material" :key="index">
						<td>{{ material.material.name }}</td>
						<td>{{ material.material.unitName }}</td>
						<td>{{ material.material.typeName }}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>

</template>

<script>

export default {
	props: ['allProviders'],
	data() {
		return {

		}
	},
	methods: {

	}
}

</script>

<style scoped>

</style>