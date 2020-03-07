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
	})
};
</script>

<style scoped>
</style>
