<template>
	<v-toolbar flat fixed>
		<v-row justify="space-between">
			<v-col cols="8" md="6" lg="4" align-self="center">
				<v-icon @click="$emit('pageBack')">mdi-chevron-left</v-icon>
				<span style="font-size: 16px; margin: 10px 0px;">{{ paginationText }}</span>
				<v-icon @click="$emit('pageForward')">mdi-chevron-right</v-icon>
			</v-col>
			<v-col cols="2">
				<v-menu
					nudge-left="150"
					two-line
					v-model="filterMenu"
					nudge-width="250"
					:close-on-content-click="false"
				>
					<template v-slot:activator="{ on }">
						<v-btn icon @click="$emit('openFilter')" id="filterButton" v-on="on">
							<v-icon
								class="filter"
								:color="(search || filterState || filterRegion || filterCategory.length) ? 'secondary' : 'primary'"
							>{{ (search || filterState || filterRegion || filterCategory.length) ? 'mdi-filter-menu' : 'mdi-filter-menu-outline'}}</v-icon>
						</v-btn>
					</template>
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
							<v-col cols="6">
								<v-select clearable label="State" :items="states" v-model="filterState"></v-select>
							</v-col>
							<v-col cols="6">
								<v-select clearable label="Region" :items="regions" v-model="filterRegion"></v-select>
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
		menu: Boolean,
		paginationText: String
	},
	data: () => ({
		search: null,
		filterMenu: false,
		//
		categories: [
			{ text: "Deer", value: "deer" },
			{ text: "Upland", value: "upland" },
			{ text: "Turkey", value: "turkey" },
			{ text: "Varmint", value: "varmint" },
			{ text: "Water Fowl", value: "waterFowl" },
			{ text: "Fishing", value: "fish" },
			{ text: "Guided Hunt", value: "guidedHunt" }
		],
		regions: [
			{ text: "SE - Southeast", value: "se" },
			{ text: "SW - Southwest", value: "sw" },
			{ text: "NW - Northwest", value: "nw" },
			{ text: "NE - Northeast", value: "ne" },
			{ text: "Cen - Central", value: "cen" }
		],
		//
		filterCategory: [],
		filterState: null,
		filterRegion: null
	}),
	computed: {
		//
		states() {
			return this.$store.state.states;
		}
	},
	methods: {
		clearFilters() {
			this.filterCategory = [];
			this.filterState = null;
			this.filterRegion = null;
			const filters = {
				filterCategories: [],
				filterState: "",
				filterRegion: ""
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
				filterState: this.filterState,
				filterRegion: this.filterRegion
			};
			this.$emit("applyFilters", filters);
		},
		async searchPosts() {
			console.log(this.search);
			if (!this.search) return;
			this.$emit("searchPosts", this.search);
		}
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
		this.search = this.$store.state.search;
		this.filterCategory = this.$store.state.filters.filterCategories;
		this.filterState = this.$store.state.filters.filterState;
		this.filterRegion = this.$store.state.filters.filterRegion;
	},
	created() {
		//
	}
};
</script>

<style lang='scss' scoped>
</style>