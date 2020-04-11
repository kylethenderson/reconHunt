<template>
	<v-app>
		<Header v-if="$route.name !== 'login'" />
		<v-content>
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
import Header from "./components/header";
import jwt from "jsonwebtoken";

export default {
	name: "App",
	components: { Header },

	data: () => ({
		refreshInterval: null,
		//
		apiPath: process.env.VUE_APP_BASE_PATH || "http://localhost:3000"
	}),
	methods: {
		//
		async refreshTokens(token) {
			const tokens = await this.$axios({
				method: "post",
				url: `${this.apiPath}/api/user/refreshToken`,
				data: {
					token: token || this.$store.state.auth.refreshToken
				}
			});
			this.$store.commit("updateTokens", tokens.data);
		},
		startRefreshInterval() {
			this.refreshInterval = setInterval(this.refreshTokens, 60000 * 14);
		}
	},
	mounted() {
		this.$store.commit("checkLocalStorage");
	},
	created() {
		// on create, refresh tokens if we need to and start the refresh interval
		if (localStorage.rHToken) {
			const decoded = jwt.decode(localStorage.rHToken);
			if (decoded.exp < Date.now())
				this.refreshTokens(localStorage.rHRefreshToken);
			this.startRefreshInterval();
		}
	},
	beforeDestroy() {
		clearInterval(this.refreshInterval);
	}
};
</script>

<style scoped>
body {
	font-family: "Roboto";
}
h3 {
	font-weight: 400;
	letter-spacing: 1px;
}
</style>
