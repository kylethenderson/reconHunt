import Home from '../components/home'
import Login from '../components/login'
import Post from '../components/post'

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
	},
	{
		path: '/post',
		name: 'post',
		component: Post
	}
]

export default routes;