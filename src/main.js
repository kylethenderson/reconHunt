import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

import router from './router/router'
import axios from 'axios'
import store from './store/store'

// Add a request interceptor
axios.interceptors.request.use(async (req) => {
	// add auth header to each request if we have a token
	const token = store.state.auth.token;
	if (token) req.headers.authorization = `Bearer ${token}`;

	return req;
}, (error) => {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(async (res) => {
	return res;
}, (error) => {
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

Vue.filter('capitalizeAll', string => {
	if (!string) return '';
	// ensure its a string and all lower case
	string = string.toString().toLowerCase();
	// create array of single word strings
	const array = string.split(' ');
	// capitalize each, join them again, and return
	return array.map(item => item.toLowerCase().charAt(0).toUpperCase() + item.slice(1)).join(' ');
})

Vue.filter('formatDate', value => {
	const split = new Date(value).toDateString().split(' ');
	return `${split[1]}, ${split[2]} ${split[3]}`;
});

Vue.filter('formatDateShort', function (value) {
	if (!value) return '';

	const dateVals = value.split(' ');
	const month = dateVals[1];
	const date = dateVals[2];
	return `${month} ${date}`;
})

export const bus = new Vue();
new Vue({
	vuetify,
	router,
	store,
	render: h => h(App)
}).$mount('#app')
