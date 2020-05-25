import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import jwt from 'jsonwebtoken'

Vue.config.productionTip = false

import router from './router/router'
import axios from 'axios'
import store from './store/store'

const refreshPath = process.env.VUE_APP_BASE_PATH

const refreshTokens = async (token) => {
	try {
		// try to refresh tokens
		const tokens = await this.$axios({
			method: "post",
			url: `${refreshPath}/api/user/refreshToken`,
			data: {
				token: store.state.auth.refreshToken
			}
		});
		store.commit("updateTokens", tokens.data);
	} catch (error) {
		// if we get a JWTEXPIRE error back, logout and route to login page.
		if (error.response && error.response.code === "JWTEXPIRE") {
			store.commit("logout");
			router.push("/login");
		}
		return new Error('Error refreshing token');	
	}
}

// Add a request interceptor
axios.interceptors.request.use(async (req) => {
	console.log('req interceptor')

	// check token before request. if token is expired,
	// try to refresh before making a request
	const { exp } = jwt.decode(store.state.auth.token);
	if ((exp * 1000) <= Date.now()) {
		const response = await refreshTokens(store.state.auth.token);
		console.log('refresh interceptor', response);
	}

	// add auth header to each request
	const token = store.state.auth.token;
	if (token) req.headers.authorization = `Bearer ${token}`;

	console.log('making request')
	return req;
}, (error) => {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (res) {
	console.log('res interceptor')
	return res;
}, function (error) {
	// Do something with response error
	if (error.response.status === 401) {
		store.commit('logout');
		router.push('/login');
	}
	return Promise.reject(error);
});

Vue.prototype.$axios = axios;

// Global Components 

// get all the files from the folder
const requireComponent = require.context(
	'./globalComponents',
	false,
	/[A-Z]\w+\.(vue|js)$/
)

// create component from each file
requireComponent.keys().forEach(fileName => {
	// Get component config
	const componentConfig = requireComponent(fileName)

	const componentName = fileName
		.split('/')
		.pop()
		.replace(/\.\w+$/, '');

	// Register component globally
	Vue.component(
		componentName,
		componentConfig.default || componentConfig
	)
})

// Global Filters

// capitalize a single word
Vue.filter('capitalizeSingle', function (value) {
	if (!value) return '';
	// ensure its a string and all lower case
	value = value.toString().toLowerCase();
	// capilatize the first word
	return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('formatDateShort', function (value) {
	if (!value) return '';

	const dateVals = value.split(' ');
	const month = dateVals[1];
	const date = dateVals[2];
	return `${month} ${date}`;
})

new Vue({
	vuetify,
	router,
	store,
	render: h => h(App)
}).$mount('#app')
