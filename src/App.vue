<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<v-toolbar-title class="nav-title">Recon Hunt</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-btn text>Log In</v-btn>
				<v-btn text>Sign Up</v-btn>
			</v-toolbar-items>
		</v-app-bar>

		<v-content></v-content>
	</v-app>
</template>

<script>
export default {
	name: "App",

	components: {},

	data: () => ({
		//
	})
};
</script>

<style scoped>
.nav-title {
	text-transform: uppercase;
	font-size: 2rem;
	letter-spacing: 3px;
}
</style>
