import {createRouter, createWebHistory} from 'vue-router'
import Recipes from '@/pages/Recipes.vue'
import Orders from "@/pages/Orders.vue";
import Warehouse from "@/pages/Warehouse.vue";
import StartScreen from "@/components/StartScreen.vue";
import CustomerScreen from "@/pages/CustomerScreen.vue";
import OrdersInWork from "@/components/orders/OrdersInWork.vue";

const routes = [
	{
		path: "/",
		name: "StartScreen",
		component: StartScreen
	},
	{
		path: '/recipes',
		name: 'Recipes',
		component: Recipes
	},
	{
		path: "/orders",
		name: "Orders",
		component: Orders
	},
	{
		path: "/warehouse",
		name: "Warehouse",
		component: Warehouse
	},
	{
		path: "/customer-screen",
		name: "CustomerScreen",
		component: CustomerScreen
	}
]

const router = createRouter({history: createWebHistory(), routes})
export default router