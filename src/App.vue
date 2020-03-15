<template>
	<v-app>
		<Header v-if="$route.name !== 'login'" @toggleDrawer="drawer = !drawer" />
		<v-navigation-drawer
			app
			dark
			color="primary"
			width="175"
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
					<v-col cols="4" class="text-right">
						<v-icon @click="drawer = !drawer" class="mr-3">mdi-close</v-icon>
					</v-col>
				</v-row>
				<v-list-item to="/post">
					<v-list-item-icon>
						<v-icon>mdi-plus</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>New Post</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<template v-slot:append>
				<div class="pa-2">
					<v-btn text block>Logout</v-btn>
				</div>
			</template>
		</v-navigation-drawer>
		<v-content>
			<router-view></router-view>
		</v-content>
	</v-app>
</template>

<script>
import Header from "./components/header";
export default {
	name: "App",
	components: { Header },

	data: () => ({
		drawer: false
		//
	}),
	methods: {
		logout() {
			this.$store.commit("logout");
			this.$router.push("/login");
		}
	},
	mounted() {
		this.$store.commit("checkLocalStorage");
	}
};
</script>

<style scoped>
body {
	font-family: "Roboto";
}
h3 {
	font-weight: 400;
	letter-spacing: 1px;
}
</style>
