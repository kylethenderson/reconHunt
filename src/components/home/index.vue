<template>
	<div>
		<v-row justify="center">
			<v-col cols="10">
				<v-img class="mt-12" src="../../assets/logo.png"></v-img>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="text-center">
				<p>Some blurb about what recon hunt is.</p>
			</v-col>
		</v-row>

		<v-row class="mt-12">
			<v-col class="text-center" cols="6">
				<v-btn color="primary" to="/posts/list">View Postings</v-btn>
			</v-col>
			<v-col class="text-center" cols="6">
				<v-btn color="primary" to="posts/new">Create Post</v-btn>
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
h2 {
	text-transform: uppercase;
	font-weight: 400;
	font-size: 2rem;
}
</style>