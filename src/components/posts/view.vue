<template>
	<div>
		<h1>view single post</h1>
	</div>
</template>

<script>
export default {
	data: () => ({
		//
	}),
	methods: {
		//
		fetchPost() {
			console.log(this.$route.params.id);
		}
	},
	computed: {
		//
	},
	created() {
		//
	},
	mounted() {
		this.fetchPost();
	}
};
</script>

<style lang='scss' scoped>
</style>