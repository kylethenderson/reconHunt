import Home from '../components/home'
import Login from '../components/login'
import Post from '../components/posts'
import NewPost from '../components/posts/new'
import CurrentPosts from '../components/posts/current'
import User from '../components/user'
import UserSettings from '../components/user/settings'

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
		path: '/posts',
		name: 'post',
		component: Post,
		children: [
			{
				path: 'new',
				component: NewPost,
			},
			{
				path: 'current',
				component: CurrentPosts,
			}

		]
	},
	{
		path: '/user',
		name: 'user',
		component: User,
		children: [
			{
				path: 'settings',
				component: UserSettings
			}
		]
	}
]

export default routes;