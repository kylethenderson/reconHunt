import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		auth: {
			token: localStorage.token || null,
			refreshToken: null,
		},
	},
	mutations: {
		login(state, payload) {
			state.auth = payload;
			localStorage.token = payload.token;
			localStorage.refreshToken = payload.token;
		},
		logout(state) {
			state.auth = {};
			localStorage.removeItem('token');
			localStorage.removeItem('refreshToken');
		}
	}
});

export default store;