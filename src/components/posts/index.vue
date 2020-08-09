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
		// reroute if user tries to manually for to '/posts'
		if (this.$route.path == "/posts") this.$router.push("/posts/list");
	},
};
</script>

<style lang='scss' scoped>
h2 {
	font-weight: 300;
}
</style>