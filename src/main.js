import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

import router from './router/router'
import axios from 'axios'

import store from './store/store'

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
