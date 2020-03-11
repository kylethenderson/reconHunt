import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const apiPath = process.env.VUE_APP_BASE_PATH;

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		auth: {
			token: localStorage.rHToken || null,
			refreshToken: localStorage.rHRefreshToken || null,
		},
	},
	mutations: {
		login(state, payload) {
			// set tokens from login in store
			state.auth = payload;

			// and also in localStorage
			localStorage.rHToken = payload.token;
			localStorage.rHRefreshToken = payload.token;
		},
		logout(state) {
			// remove refresh token from user in db
			axios({
				method: 'post',
				url: `${apiPath}/api/user/logout`,
				headers: {
					Authorization: `Bearer ${state.auth.token}`
				}
			})

			// clear store auth state
			state.auth = {};

			// clear tokens from localStorage
			localStorage.removeItem('rHToken');
			localStorage.removeItem('rHRefreshToken');
		}
	}
});

export default store;