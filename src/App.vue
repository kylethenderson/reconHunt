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
		//
	}),
	methods: {
		//
	},
	mounted() {
		this.$store.commit("checkLocalStorage");
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
