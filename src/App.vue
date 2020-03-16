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
		startRefreshInterval() {
			this.refreshInterval = setInterval(async () => {
				console.log("refreshing");
				const tokens = await this.$axios({
					method: "post",
					url: `${this.apiPath}/api/user/refreshToken`,
					data: {
						token: this.$store.state.auth.refreshToken
					}
				});
				this.$store.commit("updateTokens", tokens.data);
			}, 60000 * 15);
		}
	},
	mounted() {
		this.$store.commit("checkLocalStorage");
	},
	created() {
		this.startRefreshInterval();
	},
	beforeDestroy() {
		clearInterval(this.interval);
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
