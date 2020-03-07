import Home from '../components/home'
import Login from '../components/login'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
]

export default routes;