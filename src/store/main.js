import Vuex from 'vuex';
import axios from 'axios';

export const store = new Vuex.Store({
	state: {
		order_done: []
	},

	getters: {
		DONE: state => {
			return state.order_done
		},
	},

	mutations: {
		SET_DONE: (state, payload) => {
			state.order_done = payload
		},

		ADD_DONE: (state, payload) => {
			state.order_done.push(payload)
		},
	},

	actions: {
		// GET_DONE: async (context, payload) => {
		// 	let {data} = await axios.get('http://localhost:8080/api/todo');
		// 	context.commit('SET_TODO', data);
		// },

		// SAVE_DONE: async (context, payload) => {
		// 	// let {data} = await axios.post('http://localhost:8080/api/todo');
		// 	// context.commit('ADD_TODO', payload);
		// },
	},
});