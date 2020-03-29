<template>
	<div>
		<p>Welcome to Recon Hunt!</p>
		<p>Some blurb about what recon hunt is.</p>
		<p>Get Started</p>
		<v-row>
			<v-col class="text-center" cols="6">
				<v-btn text color="primary" to="/posts/list">View Postings</v-btn>
			</v-col>
			<v-col class="text-center" cols="6">
				<v-btn text color="primary" to="posts/new">Create Post</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	data: () => ({
		//
	}),
	methods: {
		//
	},
	computed: {
		//
	},
	created() {
		//
	}
};
</script>

<style lang='scss' scoped>
</style>