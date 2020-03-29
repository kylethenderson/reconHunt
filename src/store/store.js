import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'

const apiPath = process.env.VUE_APP_BASE_PATH;

Vue.use(Vuex);

const decodeToken = (token) => {
	const decoded = jwt.decode(token);
	return decoded;
}

const store = new Vuex.Store({
	state: {
		auth: {
			token: localStorage.rHToken || null,
			refreshToken: localStorage.rHRefreshToken || null,
		},
		user: {
			//
		}
	},
	mutations: {
		checkLocalStorage(state) {
			// put tokens from local storage in the app
			if (localStorage.rHToken) {
				state.auth.token = localStorage.rHToken;
				const { user } = decodeToken(localStorage.rHToken);
				state.user = user;
			}
			if (localStorage.rHRefreshToken) state.auth.refreshToken = localStorage.rHRefreshToken;

		},
		login(state, payload) {
			// set tokens from login in store
			state.auth = payload;

			const { user } = decodeToken(payload.token);
			state.user = user;

			// and also in localStorage
			localStorage.rHToken = payload.token;
			localStorage.rHRefreshToken = payload.refreshToken;
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
		},
		updateTokens(state, payload) {
			// set tokens from login in store
			state.auth = payload;

			const { user } = decodeToken(payload.token);
			state.user = user;

			// and also in localStorage
			localStorage.rHToken = payload.token;
			localStorage.rHRefreshToken = payload.refreshToken;
		}
	}
});

export default store;