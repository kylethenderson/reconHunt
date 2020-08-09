import Home from '../components/home'
import Login from '../components/login'
import Post from '../components/posts'
import NewPost from '../components/posts/new'
import PostList from '../components/posts/list'
import User from '../components/user'
import UserSettings from '../components/user/settings'
import ViewPost from '../components/posts/view'
const Contact = () => import('../components/contact')
const About = () => import('../components/about');

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
				path: 'list',
				component: PostList,
			},
			{
				path: 'view/:id',
				component: ViewPost,
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
	},
	{
		path: '/contact',
		name: 'Contact',
		component: Contact
	},
	{
		path: '/about',
		name: 'About',
		component: About
	}
]

export default routes;