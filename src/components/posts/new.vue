<template>
	<div>
		<v-row>
			<v-col class="text-center">
				<h2>Create a new post</h2>
			</v-col>
		</v-row>
		<v-container>
			<v-select :items="postAreas" label="Select Area" v-model="post.area"></v-select>
			<v-text-field label="Title" v-model="post.title"></v-text-field>
			<v-textarea label="Message" v-model="post.message"></v-textarea>
			<v-row justify="end">
				<v-col cols="4">
					<v-btn block color="primary">Post</v-btn>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
export default {
	data: () => ({
		//
		postAreas: [
			{ text: "Minneapolis", value: "msp" },
			{ text: "Rochester", value: "rochester" },
			{ text: "St. Cloud", value: "stcloud" }
		],
		post: {}
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
	font-weight: 300;
}
</style>