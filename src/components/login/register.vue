<template>
	<div>
		<v-form ref="registerForm" lazy-validation v-model="valid">
			<v-row justify="center" class="mb-6">
				<v-col cols="5">
					<v-text-field
						aria-autocomplete="off"
						hide-details="auto"
						label="First Name"
						:rules="[rules.required]"
						v-model="firstName"
					></v-text-field>
				</v-col>
				<v-col cols="5">
					<v-text-field
						aria-autocomplete="off"
						hide-details="auto"
						label="Last Name"
						:rules="[rules.required]"
						v-model="lastName"
					></v-text-field>
				</v-col>
				<v-col cols="5">
					<v-text-field
						aria-autocomplete="off"
						hide-details="auto"
						label="Email"
						:rules="[rules.required, rules.email]"
						v-model="email"
						:error-messages="emailExists"
					></v-text-field>
				</v-col>
				<v-col cols="5">
					<v-text-field
						aria-autocomplete="off"
						type="text"
						maxlength="10"
						hide-details="auto"
						label="Phone Number"
						:rules="[rules.required]"
						v-model="phone"
					></v-text-field>
				</v-col>
				<v-col cols="5">
					<v-text-field
						aria-autocomplete="off"
						hide-details="auto"
						label="Username"
						:rules="[rules.required, rules.min]"
						v-model="username"
						:error-messages="usernameExists"
					></v-text-field>
				</v-col>
				<v-col cols="5">
					<v-text-field
						aria-autocomplete="off"
						:rules="[rules.required, rules.password]"
						:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="show = !show"
						:type="show ? 'text' : 'password'"
						hide-details="auto"
						label="Password"
						v-model="password"
					></v-text-field>
				</v-col>
				<v-col cols="5"></v-col>
				<v-col cols="5">
					<v-text-field
						aria-autocomplete="off"
						:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="show = !show"
						:type="show ? 'text' : 'password'"
						hide-details="auto"
						label="Confirm Password"
						v-model="confirmPassword"
						:error-messages="passwordMatch"
					></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col color="primary" class="text-center">
					<v-btn :loading="loading" @click="register" color="primary">Sign Up</v-btn>
				</v-col>
			</v-row>
		</v-form>
		<v-row>
			<v-col class="text-center">
				<span>Already a Member?</span>
				<v-btn @click="$emit('toggleView')" text small>Log In</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
import crypto from "crypto";

export default {
	data: () => ({
		apiPath: process.env.VUE_APP_BASE_PATH,
		//
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		username: "",
		password: "",
		//
		confirmPassword: "",
		show: false,
		valid: true,
		loading: false,
		dialogs: {
			success: false,
			error: false
		},
		loginUsername: "",
		loginPassword: "",
		//
		usernameExists: null,
		emailExists: null,
		passwordMatch: null,
		rules: {
			required: val => !!val || "Input Required",
			min: val => (!!val && val.length >= 6) || "Minimum length is 6",
			email: val =>
				(!!val && /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(val)) ||
				"Must be valid email",
			phone: val =>
				(!!val && /^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$/.test(val)) ||
				"Must be valid phone number",
			password: val =>
				(!!val &&
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
						val
					)) ||
				"Password must be at least 8 characters and include a number"
		}
	}),
	methods: {
		//
		async register() {
			this.$refs.registerForm.resetValidation();
			this.loading = true;

			// trim and format data for server
			const firstName = this.firstName.trim().toLowerCase();
			const lastName = this.lastName.trim().toLowerCase();
			const email = this.email.trim().toLowerCase();
			const phone = this.phone.trim();
			const username = this.username.trim();
			const hashedPassword = crypto
				.createHash("sha256")
				.update(this.password.trim())
				.digest("hex");

			// set object for registration
			const registerObject = {
				firstName,
				lastName,
				email,
				phone,
				username,
				password: hashedPassword
			};

			// validate the data before we send it
			if (!this.$refs.registerForm.validate()) return;

			// register user
			try {
				await this.$axios.post(
					`${this.apiPath}/api/user/register`,
					registerObject
				);

				// set data for login after creating user
				this.loginUsername = username;
				this.loginPassword = hashedPassword;

				// on success - empty data from the inputs
				this.$refs.registerForm.reset();

				this.loading = false;

				//login the new user
				try {
					const loginResponse = await this.$axios.post(
						`${this.apiPath}/api/user/login`,
						{
							username: this.loginUsername,
							password: this.loginPassword
						}
					);
					console.log(loginResponse);

					// commit tokens to the store

					// push user to the home page
				} catch (error) {
					throw new Error(error);
				}
			} catch (error) {
				this.loading = false;
				if (error.response.data.code === "USEREXISTS")
					this.usernameExists =
						"Username already exists, please choose another.";
				if (error.response.data.code === "EMAILEXISTS")
					this.emailExists =
						"Email already in use, please choose another.";
				console.log(
					"error in user registration",
					error.response.data.code
				);
			}
		}
	},
	computed: {
		//
	},
	created() {
		//
	},
	watch: {
		phone: {
			immediate: false,
			handler(value) {
				if (!value) return value;
			}
		},
		confirmPassword: {
			immediate: false,
			handler(value) {
				if (value !== this.password)
					this.passwordMatch = "Passwords do not match";
				else this.passwordMatch = null;
			}
		}
	}
};
</script>

<style lang='scss' scoped>
</style>