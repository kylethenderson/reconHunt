<template>
	<div v-if="post">
		<h2>{{ post.title }}</h2>
		<p>{{ post.description }}</p>
		<p>{{post.area}} acres</p>
		<p>${{post.price}}/day</p>
		<p>{{post.available.from}} - {{ post.available.to}}</p>
		<p>{{post.huntableAcres}}</p>
		<p>deer: {{post.category.deer.allowed}}</p>
		<p v-for="(weapon, index) in post.category.deer.weapon" :key="index">{{ weapon}}</p>
		<p>upland: {{post.category.upland.allowed}}</p>
		<p>turkey: {{post.category.turkey.allowed}}</p>
		<p>varmint: {{post.category.varmint.allowed}}</p>
		<h5>Interested in this property?</h5>
		<v-btn>Contact User</v-btn>
	</div>
</template>

<script>
export default {
	data: () => ({
		post: null,
		//
		apiPath: process.env.VUE_APP_BASE_PATH
	}),
	methods: {
		//
		async fetchPost() {
			console.log(this.$route.params.id);
			try {
				const response = await this.$axios({
					method: "get",
					url: `${this.apiPath}/api/post/view`,
					params: {
						id: this.$route.params.id
					},
					headers: {
						authorization: `Bearer ${this.$store.state.auth.token}`
					}
				});

				this.post = response.data;
			} catch (error) {
				console.log("oh noes!", error.response);
				this.$router.push("/posts/list");
			}
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