<template>
	<v-app-bar app color="primary" dark>
		<v-toolbar-title @click="goHome" class="nav-title">Recon Hunt</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items>
			<v-btn v-if="loggedIn" text @click="logout">Logout</v-btn>
			<v-btn v-else text to="/login">Log In/Sign Up</v-btn> 
		</v-toolbar-items>
	</v-app-bar>
</template>

<script>
export default {
	data: () => ({
		//
	}),
	methods: {
		//
		goHome() {
			this.$router.push("/");
		},
		logout() {
			this.$store.commit("logout");
			this.$router.push("/login");
		}
	},
	computed: {
		//
		loggedIn() {
			return !!this.$store.state.auth.token;
		}
	},
	created() {
		//
	}
};
</script>

<style lang='scss' scoped>
.nav-title {
	text-transform: uppercase;
	font-size: 2rem;
	letter-spacing: 3px;
}
.nav-title:hover {
	cursor: pointer;
}
</style>