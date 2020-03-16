import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes';

Vue.use(VueRouter);

const verifyToken = (path) => {
	// if there's a token or we're at login page.
	// add more later - like token exp check, refresh token interval, etc 
	if (localStorage.rHToken || path === '/login') return true
	// 
	return false
}

const router = new VueRouter({
	mode: 'history',
	routes
});

router.beforeEach((to, from, next) => {
	if (!verifyToken(to.path)) next({ path: '/login' })
	else next()
})

export default router;