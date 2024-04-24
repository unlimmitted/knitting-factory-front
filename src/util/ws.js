import SockJS from "sockjs-client/dist/sockjs"
import {Stomp} from '@stomp/stompjs'
import {store} from "@/store/main.js"

export function connect() {
	const socket = new SockJS("http://localhost:8080/ws")
	let stompClient = Stomp.over(socket)
	stompClient.debug = function() {}
	stompClient.connect({}, () => {
		stompClient.subscribe('/topic/orders/',
			message => ordersCallback(message)
		)
		stompClient.subscribe('/topic/ordersInWork/',
			message => ordersInWorkCallback(message)
		)
	})
}

function ordersCallback(message) {
	store.commit("SET_ORDERS_STATS", JSON.parse(message.body).stats)
	store.commit("SET_COMPLETE_ORDERS", JSON.parse(message.body).completed)
	store.commit("SET_ACCEPTED_ORDERS", JSON.parse(message.body).accepted)
	store.commit("SET_INCOMING_ORDERS", JSON.parse(message.body).newOrders)
}

function ordersInWorkCallback(message) {
	store.commit("SET_ORDERS_DONE", JSON.parse(message.body))
}
