import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes';

Vue.use(VueRouter);

const loggedIn = false;

const isLoggedIn = (path) => {
    // if user is logged in or we're at login
    if (loggedIn || path === '/login' ) return true
    // 
    return false
}

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach((to, from, next) => {
    if (!isLoggedIn(to.path)) next({ path: '/login' })
    else next()   
})

export default router;