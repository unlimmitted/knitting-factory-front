<template>
	<div class="isNotCustomer" v-if="$route.name !== 'CustomerScreen'">
		<Menu/>
	</div>
	<div class="content">
		<router-view/>
	</div>
</template>

<script>


import Recipes from "@/pages/Recipes.vue";
import Menu from "@/components/Menu.vue";

export default {
	components: {Menu, Recipes},
	data: () => ({}),
}
</script>

<style>

table {
	font-family: arial, sans-serif;
	border-collapse: collapse;
	width: 100%;
}

td, th {
	border: 1px solid #dddddd;
	text-align: left;
	padding: 8px;
}

tr:nth-child(even) {
	background-color: #dddddd;
}

</style>