import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import VuexPersist from 'vuex-persist'

const apiPath = process.env.VUE_APP_BASE_PATH;

Vue.use(Vuex);

const vuexLocal = new VuexPersist({
	storage: window.localStorage
})

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
		},
		search: '',
		pagination: {
			skip: 0,
		},
		filters: {
			filterState: '',
			filterRegion: '',
			filterCategories: []
		},
		states: ["AL", "AK", "AK", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
	},
	mutations: {
		setTokensFromLocal(state) {
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
				url: `${apiPath}/user/logout`,
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
		},
		storeSearch(state, payload) {
			state.search = payload;
		},
		storeFilters(state, payload) {
			if (payload.filterCategories) state.filters.filterCategories = payload.filterCategories;
			else state.filterCategories = [];
			if (payload.filterState) state.filters.filterState = payload.filterState;
			else state.filters.filterState = '';
			if (payload.filterRegion) state.filters.filterRegion = payload.filterRegion;
			else state.filters.filterRegion = '';
		},
		storePagination(state, payload) {
			const keys = Object.keys(payload);
			keys.forEach(key => state.pagination[key] = payload[key]);
		},
		storeUser(state, payload) {
			const keys = Object.keys(payload);
			keys.forEach(key => {
				if (key === 'firstName' || key === 'lastName') state.user[key] = payload[key].charAt(0).toUpperCase() + payload[key].slice(1);
				else state.user[key] = payload[key]
			})
		}
	},
	plugins: [vuexLocal.plugin]
});

export default store;