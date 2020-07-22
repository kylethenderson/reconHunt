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
import refreshTokens from "./scripts/refreshTokens";

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
			// if we don't have tokens in local storage, go to login
			if (!localStorage.rHToken || !localStorage.rHRefreshToken)
				return this.$router.push("/login");

			// we've got tokens, make sure they're in the app
			this.$store.commit("setTokensFromLocal");

			// check expiration - if expired, get new tokens
			const decoded = jwt.decode(localStorage.rHToken);
			if (decoded.exp * 1000 < Date.now()) {
				await refreshTokens(localStorage.rHRefreshToken);
			}
			// start the interval for getting new tokens when expired
			this.startRefreshInterval();
		},
		startRefreshInterval() {
			// check every second for expired token,
			// once expired, get new ones
			this.refreshInterval = setInterval(() => {
				const decoded = jwt.decode(localStorage.rHToken);
				if (!decoded) {
					clearInterval(this.refreshInterval);
					return;
				}
				if (decoded.exp * 1000 < Date.now())
					refreshTokens(localStorage.rHRefreshToken);
			}, 1000);
		}
	},
	mounted() {
		this.checkForTokens();
	},
	created() {},
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
