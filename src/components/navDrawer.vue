<template>
	<v-navigation-drawer
		app
		dark
		color="primary"
		width="225"
		right
		:value="value"
		class="full-height"
		temporary
		@input="updateInput"
	>
		<v-list>
			<v-row justify="space-between">
				<v-col cols="8" class="text-center">
					<h3>Hi, {{ $store.state.user.firstName | capitalizeSingle }}</h3>
				</v-col>
				<v-col cols="4" class="text-center">
					<v-icon @click="$emit('input', false)" class="mr-3">mdi-close</v-icon>
				</v-col>
			</v-row>
			<template v-for="(item, index) in drawerItems">
				<v-list-item :to="item.to" :key="index" @click="$emit('toggleDrawer')">
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>{{ item.text }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</template>
		</v-list>
		<template v-slot:append>
			<div class="pa-2">
				<v-btn text block to="/about">About Us</v-btn>
			</div>
			<div class="pa-2">
				<v-btn text block @click="logout">Logout</v-btn>
			</div>
		</template>
	</v-navigation-drawer>
</template>

<script>
export default {
	props: {
		value: Boolean,
	},
	data: () => ({
		dialogs: {
			contact: false,
		},
		drawerItems: [
			{
				text: "Current Listings",
				icon: "mdi-format-list-bulleted",
				to: "/posts/list",
			},
			{
				text: "New Listing",
				icon: "mdi-plus",
				to: "/posts/new",
			},
			{
				text: "Profile",
				icon: "mdi-account-outline",
				to: "/user/settings",
			},
			{
				text: "Contact Us",
				icon: "mdi-email-outline",
				to: "/contact",
			},
		],
		//
	}),
	methods: {
		//
		logout() {
			this.$store.commit("logout");
			this.$router.push("/login");
		},
		updateInput(value) {
			this.$emit("input", value);
		},
	},
	computed: {
		//
	},
	created() {
		//
	},
};
</script>

<style lang='scss' scoped>
</style>