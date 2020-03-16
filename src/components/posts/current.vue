<template>
	<div>
		<p>current postings</p>
		<p>we'll need a search</p>
		<p>and a list of all postings</p>
	</div>
</template>

<script>
export default {
	data: () => ({
		//
		apiPath: process.env.VUE_APP_BASE_PATH || "http://localhost:3000"
	}),
	methods: {
		//
		async fetchPostings() {
			const postings = await this.$axios({
				method: "get",
				url: `${this.apiPath}/api/post/list`,
				headers: {
					authorization: `Bearer ${this.$store.state.auth.token}`
				}
			});
			console.log(postings);
		}
	},
	computed: {
		//
	},
	created() {
		//
	},
	mounted() {
		this.fetchPostings();
	}
};
</script>

<style lang='scss' scoped>
</style>