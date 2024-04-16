<template>
	<div class="menu">
		<ul>
			<li>
				<router-link :to="{ name: 'Warehouse' }" class="link">Склад</router-link>
			</li>

			<li>
				<router-link :to="{ name: 'Recipes' }" class="link">Рецепты</router-link>
			</li>

			<li>
				<router-link :to="{ name: 'Orders' }" class="link">Заказы</router-link>
			</li>
		</ul>
	</div>
</template>

<script>

export default {

}

</script>

<style scoped>

.menu a:hover {
	color: #f1f1f1;
}

.menu a {
	cursor: pointer;
	padding: 6px 8px 6px 16px;
	text-decoration: none;
	font-size: 25px;
	color: #818181;
	display: block;
}

.menu li {
	margin-bottom: 10px;
	list-style-type: none
}

.menu ul {
	padding: 0;
}

.menu {
	height: 100%;
	width: 160px;
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	background-color: #111;
	overflow-x: hidden;
	padding-top: 20px;
}
</style>