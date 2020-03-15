import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes';

Vue.use(VueRouter);

const verifyToken = (path) => {
	// if user is logged in or we're at login
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