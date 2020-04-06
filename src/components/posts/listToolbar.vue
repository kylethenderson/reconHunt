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
				<v-menu
					offset-y
					two-line
					v-model="filterMenu"
					nudge-width="250"
					:close-on-content-click="false"
				>
					<template v-slot:activator="{ on }">
						<v-btn icon v-on="on">
							<v-icon class="filter">mdi-filter-menu-outline</v-icon>
						</v-btn>
					</template>
					<v-toolbar color="primary" dark>
						<v-toolbar-title>Filter Listings</v-toolbar-title>
						<v-spacer></v-spacer>
						<v-icon @click="filterMenu = false">mdi-close</v-icon>
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
								<p class="mb-0">Select Category</p>
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
								<v-select label="Area" :items="areaItems"></v-select>
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
	data: () => ({
		search: null,
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
		filterMenu: false,
		filterDistance: null,
		filterCategory: [],
		filterArea: null
	}),
	methods: {
		clearFilters() {
			this.filterDistance = 0;
			this.filterCategory = [];
			this.filterArea = null;
			this.$emit("clearFilters");
		},
		newPost() {
			this.$router.push("/posts/new");
		},
		//
		applyFilters() {
			const filters = {
				filterDistance: this.filterDistance,
				filterCategories: this.filterCategory,
				filterArea: this.filterArea
			};
			console.log(filters);
			this.$emit("applyFilters", filters);
		},
		async searchPosts() {
			console.log(this.search);
			this.$emit("searchPosts", this.search);
		}
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