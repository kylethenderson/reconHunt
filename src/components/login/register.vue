<template>
	<div>
		<v-form ref="registerForm" v-model="valid">
			<v-row justify="center" class="mb-6">
				<v-col cols="10" md="5">
					<v-text-field
						aria-autocomplete="off"
						hide-details="auto"
						label="First Name"
						:rules="[rules.required]"
						v-model="firstName"
					></v-text-field>
				</v-col>
				<v-col cols="10" md="5">
					<v-text-field
						aria-autocomplete="off"
						hide-details="auto"
						label="Last Name"
						:rules="[rules.required]"
						v-model="lastName"
					></v-text-field>
				</v-col>
				<v-col cols="10" md="5">
					<v-text-field
						aria-autocomplete="off"
						hide-details="auto"
						label="Email"
						:rules="[rules.required, rules.email]"
						v-model="email"
						:error-messages="emailExists"
					></v-text-field>
				</v-col>
				<v-col cols="6" md="5">
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
				<v-col cols="4" md="5">
					<v-text-field
						aria-autocomplete="off"
						type="text"
						maxlength="5"
						hide-details="auto"
						label="Zip Code"
						:rules="[rules.required]"
						v-model="zip"
					></v-text-field>
				</v-col>
				<v-col cols="10" md="5">
					<v-text-field
						aria-autocomplete="off"
						hide-details="auto"
						label="Username"
						:rules="[rules.required, rules.min]"
						v-model="username"
						:error-messages="usernameExists"
					></v-text-field>
				</v-col>
				<v-col cols="10" md="5">
					<v-text-field
						aria-autocomplete="off"
						:rules="[rules.required, rules.password]"
						:append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showPass = !showPass"
						:type="showPass ? 'text' : 'password'"
						hide-details="auto"
						label="Password"
						v-model="password"
					></v-text-field>
				</v-col>
				<v-col cols="10" md="5"></v-col>
				<v-col cols="10" md="5">
					<v-text-field
						aria-autocomplete="off"
						:append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showConfirm = !showConfirm"
						:type="showConfirm ? 'text' : 'password'"
						hide-details="auto"
						label="Confirm Password"
						v-model="confirmPassword"
						:error-messages="passwordMatch"
					></v-text-field>
				</v-col>
			</v-row>
			<!-- <v-row justify="center" style="margin-top: -25px;">
				<v-col cols="1" class="mr-2">
					<v-checkbox color="primary" hide-details v-model="disclaimer" :rules="[rules.required]"></v-checkbox>
				</v-col>
				<v-col cols="9" align-self="center" class="mt-5">
					<span>
						I agree to
						<span @click="openDialog('disclaimer')" class="disclaimer">Terms and Conditions</span>
					</span>
				</v-col>
			</v-row>-->
			<v-row>
				<v-col color="primary" class="text-center">
					<v-btn
						:disabled="registerDisabled"
						:loading="loading"
						@click="register"
						color="primary"
					>Sign Up</v-btn>
				</v-col>
			</v-row>
		</v-form>
		<v-row>
			<v-col class="text-center">
				<span>Already a Member?</span>
				<v-btn @click="$emit('toggle-view')" text small>Log In</v-btn>
			</v-col>
		</v-row>
		<DisclaimerDialog :isOpen="dialogs.disclaimer" @closeDialog="closeDialog('disclaimer')" />
	</div>
</template>

<script>
import crypto from "crypto";
import DisclaimerDialog from "../../globalComponents/DisclaimerDialog";
import { bus } from '../../main'

export default {
	components: {
		DisclaimerDialog,
	},
	data: () => ({
		apiPath: process.env.VUE_APP_BASE_PATH,
		//
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		zip: "",
		username: "",
		password: "",
		disclaimer: false,
		//
		confirmPassword: "",
		showPass: false,
		showConfirm: false,
		valid: false,
		loading: false,
		dialogs: {
			success: false,
			error: false,
			disclaimer: false,
		},
		loginUsername: "",
		loginPassword: "",
		//
		usernameExists: null,
		emailExists: null,
		passwordMatch: null,
		rules: {
			required: (val) => !!val || "Input Required",
			min: (val) => (!!val && val.length >= 6) || "Minimum length is 6",
			email: (val) =>
				(!!val && /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(val)) ||
				"Must be valid email",
			phone: (val) =>
				(!!val && /^((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}$/.test(val)) ||
				"Must be valid phone number",
			password: (val) =>
				(!!val &&
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(
						val
					)) ||
				"Password must be at least 8 characters and include a number",
		},
	}),
	methods: {
		//
		openDialog(dialog) {
			this.dialogs[dialog] = true;
		},
		closeDialog(dialog) {
			this.dialogs[dialog] = false;
		},
		async register() {
			this.loading = true;

			// trim and format data for server
			const firstName = this.firstName.trim().toLowerCase();
			const lastName = this.lastName.trim().toLowerCase();
			const email = this.email.trim().toLowerCase();
			const phone = this.phone.trim();
			const username = this.username.trim();
			const zip = this.zip.trim();
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
				zip,
				password: hashedPassword,
				accepted: this.disclaimer,
			};

			// validate the data before we send it
			if (!this.$refs.registerForm.validate()) {
				this.loading = false;
				return;
			}

			// register user
			try {
				await this.$axios.post(
					`${this.apiPath}/user/register`,
					registerObject
				);

				// set data for login after creating user
				this.loginUsername = username;
				this.loginPassword = hashedPassword;

				// on success - empty data from the inputs
				this.$refs.registerForm.reset();

				//login the new user
				try {
					const loginResponse = await this.$axios.post(
						`${this.apiPath}/user/login`,
						{
							username,
							password: hashedPassword,
						}
					);
					console.log('login response', loginResponse)

					// commit tokens to the store
					this.$store.commit("login", loginResponse.data);

					// push user to the home page
					this.$router.push('/');
					// emit to start refresh token interval
					bus.$emit('start-interval');
				} catch (error) {
					console.log('error in login from register');
					throw new Error(error);
				}
			} catch (error) {
				console.log('outer catch', error);
				console.log(
					"error in user registration",
					error.response.data.code
				);
				if (error.response.data.code === "USEREXISTS")
					this.usernameExists =
						"Username already exists, please choose another.";
				if (error.response.data.code === "EMAILEXISTS")
					this.emailExists =
						"Email already in use, please choose another.";
			} finally {
				this.loading = false;
			}
		},
	},
	computed: {
		//
		registerDisabled() {
			return this.loading || !this.valid;
		},
	},
	created() {
		//
	},
	watch: {
		phone: {
			immediate: false,
			handler(value) {
				if (!value) return value;
			},
		},
		confirmPassword: {
			immediate: false,
			handler(value) {
				if (value !== this.password)
					this.passwordMatch = "Passwords do not match";
				else this.passwordMatch = null;
			},
		},
		username: {
			immediate: false,
			handler(value) {
				if (!this.usernameExists) return;
				this.usernameExists = null;
			},
		},
		email: {
			immediate: false,
			handler(value) {
				if (!this.emailExists) return;
				this.emailExists = null;
			},
		},
	},
};
</script>

<style lang='scss' scoped>
.disclaimer {
	display: inline;
	border-bottom: 1px solid #435e40;
}
</style>