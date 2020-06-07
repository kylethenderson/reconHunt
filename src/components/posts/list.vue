<template>
	<div>
		<ListToolbar
			@applyFilters="applyFilters"
			@searchPosts="searchPosts"
			:menu="filterMenu"
			@openFilter="filterMenu = true"
			@closeMenu="filterMenu = false"
		/>
		<v-row justify="space-between" v-if="!!posts.length">
			<v-col cols="6">
				<h3>{{ posts.length }} Listings</h3>
			</v-col>
			<v-col cols="6" class="text-right">
				<!-- <v-icon @click="pageBack">mdi-chevron-left</v-icon>
				<span style="font-size: 16px; margin: 10px 0px;">1-{{ posts.length }} of {{ posts.length }}</span>
				<v-icon @click="pageForward">mdi-chevron-right</v-icon>-->
			</v-col>
		</v-row>
		<v-row v-else>
			<v-col cols="6">
				<h3>No listings found for those filters.</h3>
			</v-col>
		</v-row>
		<div v-if="!!posts.length">
			<div
				v-for="(post, index) in posts"
				:key="index"
				color="transparent"
				class="post-card my-3 px-0"
				@click="viewPost(post)"
			>
				<v-row class="mx-1" justify="space-between">
					<v-col>
						<h3>{{ post.title | truncateTitle }}</h3>
					</v-col>
					<v-col class="text-right">
						<h4>{{ post.city}}, {{ post.state }}</h4>
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
					<v-btn @click.stop="viewPost(post)" text style="z-index: 0 !important;">More details ...</v-btn>
				</v-card-actions>
				<v-divider style="margin: 10px 0px 15px 0px !important;"></v-divider>
			</div>
		</div>
	</div>
</template>

<script>
import ListToolbar from "./listToolbar";

export default {
	components: { ListToolbar },
	data: () => ({
		search: "",
		posts: [],
		filterMenu: false,
		//
		filterCategories: [],
		filterState: null,
		filterRegion: null,
		searchString: null,
		//
		apiPath: process.env.VUE_APP_BASE_PATH || "http://localhost:3000"
	}),
	methods: {
		//
		async fetchPostings() {
			const { filters, search } = this.$store.state;
			console.log(filters, search);
			// set default fetch params
			let fetchObject = {
				skip: 0,
				sort: "descending",
				itemsPerPage: "25",
				search: null,
				filterState: null,
				filterRegion: null,
				filterCategory: []
			};

			// set params from api call
			if (this.skip) fetchObject.skip = this.skip;
			if (this.sort) fetchObject.sort = this.sort;
			if (this.itemsPerPage) fetchObject.itemsPerPage = this.itemsPerPage;
			if (filters.filterState)
				fetchObject.filterState = filters.filterState;
			if (filters.filterRegion)
				fetchObject.filterRegion = filters.filterRegion;
			if (filters.filterCategories)
				fetchObject.filterCategory = filters.filterCategories;
			if (search) fetchObject.search = search;

			const posts = await this.$axios({
				method: "get",
				url: `${this.apiPath}/api/post/list`,
				params: fetchObject
			});
			this.posts = posts.data;
		},
		async searchPosts(value) {
			this.$store.commit("storeSearch", value);
			this.skip = 0;
			this.fetchPostings();
		},
		applyFilters(value) {
			console.log(value);
			this.$store.commit("storeFilters", value);
			this.skip = 0;
			this.filterMenu = false;
			this.fetchPostings();
		},
		async viewPost(post) {
			// route to single post page
			this.$router.push(`/posts/view/${post.uuid}`);
		},
		pageForward() {
			console.log("forward");
		},
		pageBack() {
			console.log("back");
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
.v-icon.filter {
	font-size: 30px !important;
}
.v-icon.plus {
	font-size: 32px;
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