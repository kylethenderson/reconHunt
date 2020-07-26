<template>
	<div>
		<ListToolbar
			@applyFilters="applyFilters"
			@searchPosts="searchPosts"
			:menu="filterMenu"
			:paginationText="paginationText"
			@pageBack="pageBack"
			@pageForward="pageForward"
			@openFilter="filterMenu = true"
			@closeMenu="filterMenu = false"
			v-if="!errors.fetch"
		/>
		<v-row v-else justify="center">
			<v-col v-if="!errors.fetch" cols="2" class="mt-12" align-self-center>
				<v-progress-circular size="60" indeterminate color="primary"></v-progress-circular>
			</v-col>
			<v-col v-else-if="!errors.fetch && !fetchingPosts" cols="6" class="text-center">
				<h3>No listings found.</h3>
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
						<h4>{{ post.city | capitalize }}, {{ post.state }}</h4>
					</v-col>
				</v-row>
				<v-row v-if="post.images.length" justify="center">
					<v-col cols="10" class="py-0">
						<v-img :src="`${apiPath}/images/${post.images[0].filename}`"></v-img>
					</v-col>
				</v-row>
				<v-card-text class="py-0">
					<v-row>
						<v-col cols="12">
							<p>{{ post.description | truncateDescription }}</p>
						</v-col>
						<v-col cols="8" class="py-1">
							<p class="mb-0">
								<strong>Acreage: {{ post.huntableAcres }} acres</strong>
							</p>
						</v-col>
						<v-col cols="4" class="text-center py-1">
							<strong>${{ post.price }}/day</strong>
						</v-col>
						<v-col cols="8" class="py-1">
							<p class="mb-1">
								<strong>
									Available:
									<br />
									{{ post.available.from | formatDate }} - {{ post.available.to | formatDate }}
								</strong>
							</p>
						</v-col>
					</v-row>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn @click.stop="viewPost(post)" text style="z-index: 0 !important;">
						Details
						<v-icon small>mdi-chevron-right</v-icon>
					</v-btn>
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
		fetchingPosts: false,
		errors: {
			fetch: false
		},
		skip: 0,
		search: "",
		posts: [],
		postTotal: 0,
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
			this.errors.fetch = false;
			this.fetchingPosts = true;
			const { filters, search, pagination } = this.$store.state;
			const { skip, sort, itemsPerPage } = pagination;
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

			// set params for api call
			if (skip) fetchObject.skip = skip;
			if (sort) fetchObject.sort = sort;
			if (itemsPerPage) fetchObject.itemsPerPage = this.itemsPerPage;
			if (filters.filterState)
				fetchObject.filterState = filters.filterState;
			if (filters.filterRegion)
				fetchObject.filterRegion = filters.filterRegion;
			if (filters.filterCategories)
				fetchObject.filterCategory = filters.filterCategories;
			if (search) fetchObject.search = search;

			try {
				//
				const response = await this.$axios({
					method: "get",
					url: `${this.apiPath}/api/post/list`,
					params: fetchObject
				});
				const { total, posts } = response.data;
				this.postTotal = total;
				this.posts = posts;
			} catch (error) {
				this.errors.fetch = true;
				console.log(error);
			} finally {
				//
				this.fetchingPosts = false;
			}
		},
		async searchPosts(value) {
			this.$store.commit("storeSearch", value);
			this.$store.commit("storePagination", { skip: 0 });
			this.fetchPostings();
		},
		applyFilters(value) {
			console.log(value);
			this.$store.commit("storeFilters", value);
			this.$store.commit("storePagination", { skip: 0 });
			this.filterMenu = false;
			this.fetchPostings();
		},
		async viewPost(post) {
			// route to single post page
			this.$router.push(`/posts/view/${post.uuid}`);
		},
		pageForward() {
			let skip = this.pagination.skip;
			skip++;
			if (skip * 25 > this.postTotal) return;
			this.$store.commit("storePagination", { skip });
			this.fetchPostings();
		},
		pageBack() {
			let skip = this.pagination.skip;
			if (skip == 0) return;
			skip--;
			this.$store.commit("storePagination", { skip });
			this.fetchPostings();
		}
	},
	computed: {
		pagination() {
			return this.$store.state.pagination;
		},
		//
		paginationText() {
			const start = this.pagination.skip * 25 + 1;
			let end = 0;
			if (this.posts.length == 25) end = start + 24;
			else end = start + this.posts.length - 1;
			return `${start} - ${end} of ${this.postTotal}`;
		}
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
			if (value.length < 150) return value;
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