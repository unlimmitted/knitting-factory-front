import Vuex from 'vuex';

export const store = new Vuex.Store({
	state: {
		ordersDone: [],
		ordersStats: [],
		completedOrders: [],
		acceptedOrders: [],
		incomingOrders: []
	},

	getters: {
		INCOMING_ORDERS: state => {
			return state.incomingOrders
		},
		ORDERS_STATS: state => {
			return state.ordersStats
		},
		ORDERS_DONE: state => {
			return state.ordersDone
		},
		ACCEPTED_ORDERS: state => {
			return state.acceptedOrders
		},
		COMPLETE_ORDERS: state => {
			return state.completedOrders
		},
	},

	mutations: {
		SET_INCOMING_ORDERS: (state, payload) => {
			state.incomingOrders = payload
		},
		SET_ACCEPTED_ORDERS: (state, payload) => {
			state.acceptedOrders = payload
		},
		SET_COMPLETE_ORDERS: (state, payload) => {
			state.completedOrders = payload
		},
		SET_ORDERS_STATS: (state, payload) => {
			state.ordersStats = payload
		},
		SET_ORDERS_DONE: (state, payload) => {
			state.ordersDone = payload
		},
	},

	actions: {

	},
});