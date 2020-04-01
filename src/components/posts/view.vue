<template>
	<div v-if="post">
		<v-row>
			<v-col>
				<h2>{{ post.title }}</h2>
				<p>{{post.area}}</p>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<p>{{ post.description }}</p>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="6">
				<p class="mb-0">
					<strong>Available Dates:</strong>
				</p>
				<p>{{post.available.from | formatDateShort }} - {{ post.available.to | formatDateShort }}</p>
			</v-col>
			<v-col cols="6">
				<p class="mb-0">
					<strong>Huntable Acres</strong>
				</p>
				<p>{{post.huntableAcres}} acres</p>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12">
				<p class="mb-0">
					<strong>Hunting Categories:</strong>
				</p>
				<span
					class="mr-6"
					v-for="(item, index) in Object.keys(post.category)"
					:key="index"
				>{{ item | capitalizeSingle }}</span>
			</v-col>

			<template v-if="Object.keys(post.category).includes('deer')">
				<v-col>
					<p class="mb-0">
						<strong>Allowed Deer Hunting Methods:</strong>
					</p>
					<span
						v-for="(weapon, index) in post.category.deer.methods"
						:key="index"
						class="mr-6"
					>{{ weapon | capitalizeSingle }}</span>
				</v-col>
			</template>
		</v-row>
		<v-row>
			<v-col>
				<p class="mb-0">
					<strong>Price:</strong>
				</p>
				<p>${{post.price}}/day</p>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<p>
					<strong>Interested in this property?</strong>
				</p>
				<v-btn small>Contact User</v-btn>
			</v-col>
		</v-row>
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
				console.log(Object.keys(this.post.category));
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