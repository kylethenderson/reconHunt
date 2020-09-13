import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes';
import store from '../store/store'
import jwt from 'jsonwebtoken'
import bus from '../main'

Vue.use(VueRouter);

const tokenIsValid = (path) => {
	// if there's a token or we're at login page.
	// add more later - like token exp check, refresh token interval, etc 
	if (localStorage.rHToken) return true;
	// 
	return false
}

// whatever conditions require a forced logout
const requiresLogout = () => {
	const token = jwt.decode(localStorage.rHRefreshToken);
	if (token && token.exp * 1000 < Date.now()) return true;
	return false;
}

const router = new VueRouter({
	mode: 'history',
	routes,
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }
	}
});

router.beforeEach((to, from, next) => {
	if (!tokenIsValid(to.path) && to.path !== '/login' ) return next({ path: '/login' })
	if (requiresLogout()) {
		bus.$emit('clear-interval');
		store.commit('logout');
		return next({ path: '/login' })
	}
	next()
})

export default router;