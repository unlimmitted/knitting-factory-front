import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router/main.js"
import {store} from "@/store/main.js";

createApp(App)
	.use(router)
	.use(store)
	.mount('#app')
