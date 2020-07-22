<template>
	<div id="loginView">
		<v-row justify="center" class="fill-height" align="center">
			<v-col cols="12" sm="8" md="6" lg="4">
				<v-card class="pt-3">
					<v-row justify="center">
						<v-col cols="9">
							<v-img src="../../assets/logo.png"></v-img>
						</v-col>
					</v-row>
					<v-row>
						<v-col class="text-center">
							<h1 color="primary">{{ login ? 'Login' : 'Register' }}</h1>
						</v-col>
					</v-row>
					<Login v-if="login" @toggleView="toggleView" />
					<Register v-else @toggleView="toggleView" />
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import Login from "./login";
import Register from "./register";

export default {
	components: {
		Login,
		Register
	},
	data: () => ({
		login: true
		//
	}),
	methods: {
		toggleView() {
			this.login = !this.login;
		}
		//
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
#loginView {
	height: 100vh;

	h1 {
		font-size: 2rem;
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 2px;
	}
}
</style>