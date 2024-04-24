import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router/main.js"
import {store} from "@/store/main.js";
import VueApexCharts from "vue3-apexcharts";
import '@/assets/index.css'

createApp(App)
	.use(router)
	.use(store)
	.use(VueApexCharts)
	.mount('#app')
