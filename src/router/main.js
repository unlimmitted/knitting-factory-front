import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import Recipes from '@/pages/Recipes.vue'
import Providers from '@/pages/Providers.vue'
import Orders from "@/pages/Orders.vue";
import Warehouse from "@/pages/Warehouse.vue";
import StartScreen from "@/components/StartScreen.vue";
import CustomerScreen from "@/pages/CustomerScreen.vue";

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
	},
	{
		path: "/providers",
		name: "Providers",
		component: Providers
	}
]

const router = createRouter({history: createWebHistory(), routes})
export default router