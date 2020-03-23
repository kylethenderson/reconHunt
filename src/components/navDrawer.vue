<template>
	<v-navigation-drawer
		app
		dark
		color="primary"
		width="225"
		right
		v-model="drawer"
		class="full-height"
		temporary
	>
		<v-list>
			<v-row justify="space-between">
				<v-col cols="8" class="text-center">
					<h3>Hi, {{ $store.state.user.firstName | capitalizeSingle }}</h3>
				</v-col>
				<v-col cols="4" class="text-center">
					<v-icon @click="$emit('toggleDrawer')" class="mr-3">mdi-close</v-icon>
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
				<v-btn text block @click="logout">Logout</v-btn>
			</div>
		</template>
	</v-navigation-drawer>
</template>

<script>
export default {
	props: {
		isOpen: Boolean
	},
	data: () => ({
		drawer: false,
		drawerItems: [
			{
				text: "Current Posts",
				icon: "mdi-format-list-bulleted",
				to: "/posts/list"
			},
			{
				text: "New Post",
				icon: "mdi-plus",
				to: "/posts/new"
			},
			{
				text: "Profile",
				icon: "mdi-account-outline",
				to: "/user/settings"
			}
		]
		//
	}),
	methods: {
		//
		logout() {
			this.$store.commit("logout");
			this.$router.push("/login");
		}
	},
	computed: {
		//
	},
	created() {
		//
	},
	watch: {
		isOpen: {
			immediate: true,
			handler(value) {
				this.drawer = value;
			}
		}
	}
};
</script>

<style lang='scss' scoped>
</style>