const refreshPath = process.env.VUE_APP_BASE_PATH
import store from '../store/store'
import router from '../router/router'
import axios from 'axios'
import { bus } from '../main'

const refreshTokens = async (token) => {
	try {
		// try to refresh tokens
		const tokens = await axios({
			method: "post",
			url: `${refreshPath}/user/refreshToken`,
			data: {
				token
			}
		});
		store.commit("updateTokens", tokens.data);
	} catch (error) {
		console.log(error)
		// if we get a JWTEXPIRE error back, logout and route to login page.
		if (error.response && error.response.code === "JWTEXPIRE") {
			bus.$emit('clear-interval');
			store.commit("logout");
			router.push("/login");
		}
		return new Error('Error refreshing token');
	}
}

export default refreshTokens;