import SockJS from "sockjs-client/dist/sockjs"
import {Stomp} from '@stomp/stompjs'
import {store} from "@/store/main.js"

export function connect() {
	const socket = new SockJS("http://localhost:8080/ws")
	let stompClient = Stomp.over(socket)
	stompClient.connect({}, () => {
		stompClient.subscribe('/topic/activity/',
				message => callback(message)
		)
	})
}

function callback(message) {
	store.commit("SET_DONE", JSON.parse(message.body))
	console.log(JSON.parse(message.body))
}
