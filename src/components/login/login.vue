<template>
	<div>
		<v-form ref="loginForm">
			<v-row justify="center" class="mb-6">
				<v-col cols="8">
					<v-text-field
						hide-details="auto"
						:error-messages="invalidCreds"
						label="Username"
						v-model="username"
						@keydown.enter="login"
						:rules="[rules.required]"
					></v-text-field>
				</v-col>
				<v-col cols="8">
					<v-text-field
						:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="show = !show"
						:type="show ? 'text' : 'password'"
						hide-details="auto"
						label="Password"
						v-model="password"
						:error-messages="invalidCreds"
						@keydown.enter="login"
						:rules="[rules.required]"
					></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col color="primary" class="text-center">
					<v-btn color="primary" :loading="loading" :disabled="loading" @click="login">Log In</v-btn>
				</v-col>
			</v-row>
		</v-form>
		<v-row>
			<v-col class="text-center">
				<span>Not a Member?</span>
				<v-btn @click="$emit('toggleView')" text small>Sign Up</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import crypto from "crypto";

export default {
	name: "login",
	data: () => ({
		apiPath: process.env.VUE_APP_BASE_PATH,
		//
		username: null,
		password: null,
		show: false,
		loading: false,
		invalidCreds: "",
		//
		rules: {
			required: val => !!val || "Input is required"
		}
	}),
	methods: {
		//
		async login() {
			const validate = this.$refs.loginForm.validate();
			if (!validate) return;

			this.loading = true;

			const hashedPassword = crypto
				.createHash("sha256")
				.update(this.password)
				.digest("hex");

			try {
				console.log('logging in')
				const response = await this.$axios.post(
					`${this.apiPath}/api/user/login`,
					{
						username: this.username,
						password: hashedPassword
					}
				);

				// commit tokens to the store
				this.$store.commit("login", response.data);

				this.loading = false;

				this.$refs.loginForm.reset();

				// reroute user to the home page
				this.$router.push("/");
			} catch (error) {
				console.log("login error", error);
				this.loading = false;
				this.invalidCreds = "Username or Password incorrect";
			}
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