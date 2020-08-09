<template>
	<v-container>
		<router-view></router-view>
	</v-container>
</template>

<script>
export default {
	data: () => ({
		//
	}),
	mounted() {
		// reroute if user tries to manually for to '/user'
		if (this.$route.path == "/user") this.$router.push("/user/settings");
	},
};
</script>

<style lang='scss' scoped>
h2 {
	font-weight: 300;
}
</style>