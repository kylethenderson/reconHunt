import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

import router from './router/router'
import axios from 'axios'

import store from './store/store'

Vue.prototype.$axios = axios;

// Global Filters

// capitalize a single word
Vue.filter('capitalizeSingle', function (value) {
	if (!value) return '';
	// ensure its a string and all lower case
	value = value.toString().toLowerCase();
	// capilatize the first word
	return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
	vuetify,
	router,
	store,
	render: h => h(App)
}).$mount('#app')
