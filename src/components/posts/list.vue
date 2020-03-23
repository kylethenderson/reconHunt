<template>
	<div>
		<v-toolbar flat fixed>
			<v-row justify="space-between">
				<v-col cols="8" md="6" lg="4" align-self="center">
					<v-text-field
						v-model="search"
						append-icon="mdi-magnify"
						label="Search"
						single-line
						hide-details="auto"
						@keydown.enter="searchPosts"
						@click:append="searchPosts"
					></v-text-field>
				</v-col>
				<v-col cols="2">
					<v-menu offset-y>
						<template v-slot:activator="{ on }">
							<v-btn icon v-on="on">
								<v-icon>mdi-filter-menu-outline</v-icon>
							</v-btn>
						</template>
						<v-list>
							<v-list-item>
								<v-list-item-title>filter item</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<v-list-item-title>filter item</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<v-list-item-title>filter item</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<v-list-item-title>filter item</v-list-item-title>
							</v-list-item>
							<v-list-item>
								<v-list-item-title>clear filters</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</v-col>
				<!-- <v-col cols="2">
					<v-btn icon>
						<v-icon>mdi-close-circle-outline</v-icon>
					</v-btn>
				</v-col>-->
			</v-row>
		</v-toolbar>
		<v-row>
			<v-col>
				<h3>{{ posts.length }} Listings</h3>
			</v-col>
		</v-row>
		<template v-if="posts.length > 0">
			<div v-for="(post, index) in posts" :key="index" color="transparent" class="post-card my-3 px-0">
				<v-row class="mx-1" justify="space-between">
					<v-col>
						<h3>{{ post.title | truncateTitle }}</h3>
					</v-col>
					<v-col class="text-right">
						<h4>{{ post.area}}</h4>
					</v-col>
				</v-row>
				<v-card-text class="py-0">
					<v-row>
						<v-col cols="12">
							<p>{{ post.description | truncateDescription }}</p>
						</v-col>
						<v-col cols="8">
							<p>
								<strong>Huntable Area: {{ post.huntableAcres }} acres</strong>
							</p>
						</v-col>
						<v-col cols="4" class="text-center">
							<strong>${{ post.price }}/day</strong>
						</v-col>
					</v-row>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click="viewPost(post)" text>More details ...</v-btn>
				</v-card-actions>
				<v-divider style="margin: 10px 0px 15px 0px !important;"></v-divider>
			</div>
		</template>
	</div>
</template>

<script>
export default {
	data: () => ({
		search: "",
		posts: [],
		//
		apiPath: process.env.VUE_APP_BASE_PATH || "http://localhost:3000"
	}),
	methods: {
		//
		async fetchPostings() {
			const posts = await this.$axios({
				method: "get",
				url: `${this.apiPath}/api/post/list`,
				headers: {
					authorization: `Bearer ${this.$store.state.auth.token}`
				}
			});
			this.posts = posts.data;
			console.log(this.posts);
		},
		async searchPosts() {},
		async viewPost(post) {
			console.log(post);
			// route to single post page
			this.$router.push(`/posts/view/${post.uuid}`);
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
	},
	filters: {
		truncateDescription(value) {
			if (!value) return "";
			const truncated = value.substring(0, 150);
			return `${truncated} ...`;
		},
		truncateTitle(value) {
			if (!value) return "";
			if (value.length > 30) {
				const truncated = value.substring(0, 30);
				return `${truncated} ...`;
			} else return value;
		}
	}
};
</script>

<style lang='scss' scoped>
.v-icon {
	font-size: 28px !important;
}
p {
	margin-bottom: 0;
}
.post-card {
	/* Add shadows to create the "card" effect */
	// box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
	transition: 0.25s;
}

/* On mouse-over, add a deeper shadow */
.post-card:hover {
	box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.25);
}
</style>