<template>
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
				<v-btn icon @click="$emit('openFilter')" id="filterButton">
					<v-icon
						class="filter"
						:color="(search || filterArea || filterCategory.length) ? 'secondary' : 'primary'"
					>{{ (search || filterArea || filterCategory.length) ? 'mdi-filter-menu' : 'mdi-filter-menu-outline'}}</v-icon>
				</v-btn>
				<v-menu
					attach="#filterButton"
					nudge-left="150"
					two-line
					v-model="filterMenu"
					nudge-width="250"
					:close-on-content-click="false"
				>
					<v-toolbar color="primary" dark>
						<v-toolbar-title>Filter Listings</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-icon @click="$emit('closeMenu')">mdi-close</v-icon>
					</v-toolbar>
					<v-card class="pa-2">
						<!-- <v-row>
							<v-col>
								<p class="pl-0 subtitle-1">Radius (mi)</p>
								<v-slider v-model="filterDistance" class="align-center" max="500" min="0" hide-details>
									<template v-slot:append>
										<p>{{ filterDistance }}</p>
									</template>
								</v-slider>
							</v-col>
						</v-row>
						<v-divider class="mb-4"></v-divider>-->
						<v-row class="px-4">
							<v-col cols="12" class="pa-0">
								<p class="mb-3">Select Category</p>
							</v-col>
							<v-col cols="3" class="pa-0 text-center" v-for="(item, index) in categories" :key="index">
								<v-checkbox
									class="text-center"
									color="primary"
									v-model="filterCategory"
									:value="item.value"
									:hint="item.text"
									persistent-hint
								></v-checkbox>
							</v-col>
						</v-row>
						<v-divider class="mt-4"></v-divider>
						<v-row>
							<v-col cols="9">
								<v-select label="Area" :items="areaItems" v-model="filterArea"></v-select>
							</v-col>
						</v-row>
						<v-row justify="end">
							<v-col class="text-right">
								<v-btn small class="mr-4" @click="clearFilters">Clear</v-btn>
								<v-btn small @click="applyFilters">Apply</v-btn>
							</v-col>
						</v-row>
					</v-card>
				</v-menu>
			</v-col>
			<v-col cols="2">
				<v-btn icon @click="newPost">
					<v-icon class="plus">mdi-plus-circle-outline</v-icon>
				</v-btn>
			</v-col>
		</v-row>
	</v-toolbar>
</template>

<script>
export default {
	props: {
		menu: Boolean
	},
	data: () => ({
		search: null,
		filterMenu: false,
		//
		categories: [
			{ text: "Deer", value: "deer" },
			{ text: "Upland", value: "upland" },
			{ text: "Turkey", value: "turkey" },
			{ text: "Varmint", value: "varmint" }
		],
		areaItems: [
			{ text: "Minneapolis", value: "msp" },
			{
				text: "Rochester",
				value: "rochester"
			},
			{ text: "St. Cloud", value: "stCloud" }
		],
		//
		filterCategory: [],
		filterArea: null
	}),
	methods: {
		clearFilters() {
			this.filterCategory = [];
			this.filterArea = "";
			const filters = {
				filterCategories: [],
				filterArea: ""
			};
			this.$emit("applyFilters", filters);
		},
		newPost() {
			this.$router.push("/posts/new");
		},
		//
		applyFilters() {
			const filters = {
				filterCategories: this.filterCategory,
				filterArea: this.filterArea
			};
			this.$emit("applyFilters", filters);
		},
		async searchPosts() {
			console.log(this.search);
			if (!this.search) return;
			this.$emit("searchPosts", this.search);
		}
	},
	computed: {
		//
	},
	watch: {
		menu: {
			immediate: true,
			handler(value) {
				this.filterMenu = value;
			}
		}
	},
	mounted() {
		console.log(this.$store.state.filters.filterCategories);
		this.search = this.$store.state.search;
		this.filterCategory = this.$store.state.filters.filterCategories;
		this.filterArea = this.$store.state.filters.filterArea;
	},
	created() {
		//
	}
};
</script>

<style lang='scss' scoped>
</style>