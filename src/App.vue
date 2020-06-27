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
		async checkForTokens() {
			// check to see if we have a token in storage.
			// if yes and its expired, refresh them.
			// otherwise, we've got tokens and they're good, so just set the refresh interval
			if (localStorage.rHToken) {
				const decoded = jwt.decode(localStorage.rHToken);
				if (decoded.exp < Date.now())
					await 	this.refreshTokens(localStorage.rHRefreshToken);
				this.startRefreshInterval();
			} else this.$router.push("/login");
		},
		async refreshTokens(token) {
			try {
				// try to refresh tokens
				const tokens = await this.$axios({
					method: "post",
					url: `${this.apiPath}/api/user/refreshToken`,
					data: {
						token: token || this.$store.state.auth.refreshToken
					}
				});
				this.$store.commit("updateTokens", tokens.data);
			} catch (error) {
				// if we get a JWTEXPIRE error back, logout and route to login page.
				if (error.response && error.response.code === "JWTEXPIRE");
				this.$store.commit("logout");
				this.$router.push("/login");
			} finally {
				//
			}
		},
		startRefreshInterval() {
			this.refreshInterval = setInterval(this.refreshTokens, 60000 * 14);
		}
	},
	mounted() {
		// this.$store.commit("checkLocalStorage");
	},
	created() {
		this.checkForTokens();
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
