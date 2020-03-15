<template>
	<div>
		<v-app-bar app color="primary" dark>
			<v-toolbar-title @click="goHome" class="nav-title">Recon Hunt</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<template v-if="loggedIn">
					<template v-if="$vuetify.breakpoint.mdAndDown">
						<v-btn icon @click="toggleDrawer">
							<v-icon>mdi-menu</v-icon>
						</v-btn>
					</template>
					<template v-else>
						<v-btn text to="/post">Post</v-btn>
						<v-menu bottom y-offset close-on-click>
							<template v-slot:activator="{ on }">
								<v-btn text v-on="on">{{ $store.state.user.firstName }}</v-btn>
							</template>

							<v-list>
								<v-list-item
									v-for="(item, index) in menuItems"
									:key="index"
									@click="item.action && handleClick(item.action)"
									:to="item.to && item.to"
								>
									<v-list-item-title>{{ item.text }}</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</template>
				</template>
				<template v-else>
					<v-btn text to="/login">Log In/Sign Up</v-btn>
				</template>
			</v-toolbar-items>
		</v-app-bar>
		<NavDrawer :isOpen="drawer" @toggleDrawer="drawer = !drawer" />
	</div>
</template>

<script>
import NavDrawer from "./navDrawer";

export default {
	components: { NavDrawer },
	data: () => ({
		drawer: false,
		//
		menuItems: [
			{
				text: "Settings",
				icon: null,
				to: "/userSettings",
				action: null
			},
			{
				text: "Logout",
				icon: null,
				to: null,
				action: "logout"
			}
		]
	}),
	methods: {
		//
		goHome() {
			this.$router.push("/");
		},
		logout() {
			this.$store.commit("logout");
			this.$router.push("/login");
		},
		handleClick(method) {
			switch (method) {
				case "logout":
					this.logout();
					break;
			}
		},
		toggleDrawer() {
			this.drawer = !this.drawer;
		}
	},
	computed: {
		//
		loggedIn() {
			return !!this.$store.state.auth.token;
		}
	},
	created() {
		//
	}
};
</script>

<style lang='scss' scoped>
.nav-title {
	text-transform: uppercase;
	font-size: 2rem;
	letter-spacing: 3px;
}
.nav-title:hover {
	cursor: pointer;
}
</style>