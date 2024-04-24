<template>
	<div class="superMain">
		<div class="isNotCustomer" v-if="$route.name !== 'CustomerScreen'">
			<Menu/>
		</div>
		<div class="content">
			<router-view/>
		</div>
	</div>
</template>

<script>


import Recipes from "@/pages/Recipes.vue"
import Menu from "@/components/Menu.vue"
import {connect} from '@/util/ws'

export default {
	components: {Menu, Recipes},
	data() {
		return {
			received_messages: [],
			send_message: null,
			connected: false
		};
	},
	mounted() {
		connect()
	},
	methods: {

	}
}
</script>

<style>

.superMain {
	font-family: Lato, sans-serif;
}

table {
	font-family: arial, sans-serif;
	border-collapse: collapse;
	width: 100%;
}

td, th {
	border: 1px solid #dddddd;
	text-align: center;
	padding: 8px;
}

tr:nth-child(even) {
	background-color: #dddddd;
}

</style>