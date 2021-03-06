<template>
	<div class="px-3">
		<h2 style="text-transform: uppercase">user settings</h2>
		<v-form ref="settingsForm" v-model="settingsForm">
			<v-row justify="center">
				<v-col cols="6">
					<v-text-field
						hide-details="auto"
						:readonly="!editMode"
						label="First Name"
						v-model="user.firstName"
						:rules="editMode ? [rules.required] : []"
					></v-text-field>
				</v-col>
				<v-col cols="6">
					<v-text-field
						hide-details="auto"
						:readonly="!editMode"
						label="Last Name"
						v-model="user.lastName"
						:rules="editMode ? [rules.required] : []"
					></v-text-field>
				</v-col>
			</v-row>
			<v-row justify="center">
				<v-col cols="12">
					<v-text-field
						hide-details="auto"
						:error-messages="emailError"
						:readonly="!editMode"
						label="Email"
						v-model="user.email"
						:rules="editMode ? [rules.required] : []"
					></v-text-field>
				</v-col>
			</v-row>
			<v-row justify="center">
				<v-col cols="6">
					<v-text-field
						hide-details="auto"
						:readonly="!editMode"
						label="Phone"
						v-model="user.phone"
						:rules="editMode ? [rules.required] : []"
					></v-text-field>
				</v-col>
				<v-col cols="6"></v-col>
			</v-row>
			<v-row justify="center">
				<v-col cols="12" class="pb-0">
					<h4 style="font-weight: 400; letter-spacing: 1px;">Notifications</h4>
				</v-col>
				<v-col cols="8" class="pt-0">
					<v-switch
						:disabled="!editMode"
						color="primary"
						label="Email Notifications"
						hide-details="auto"
						v-model="user.emailNotifications"
						:rules="editMode ? [rules.required] : []"
					></v-switch>
				</v-col>
				<v-spacer></v-spacer>
			</v-row>
			<v-row justify="center">
				<v-col cols="12" class="pb-0">
					<h4 style="font-weight: 400; letter-spacing: 1px;">Update Password</h4>
				</v-col>
				<v-col cols="6" class="pt-0">
					<v-text-field
						:append-icon="showOld ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showOld = !showOld"
						:type="showOld ? 'text' : 'password'"
						hide-details="auto"
						:readonly="!editMode"
						label="Current Password"
						v-model="currentPassword"
					></v-text-field>
				</v-col>
				<v-col cols="6" class="pt-0">
					<v-text-field
						:append-icon="showNew ? 'mdi-eye' : 'mdi-eye-off'"
						@click:append="showNew = !showNew"
						:type="showNew ? 'text' : 'password'"
						hide-details="auto"
						:disabled="!currentPassword"
						:error-messages="newPasswordError"
						:readonly="!editMode"
						label="New Password"
						v-model="newPassword"
					></v-text-field>
				</v-col>
			</v-row>

			<v-row justify="center" class="mt-4">
				<v-col cols="6">
					<v-btn
						block
						color="primary"
						@click="editSave"
						:outlined="!editMode"
						:loading="loading"
						:disabled="loading"
					>{{ editMode ? 'Save' : 'Edit Settings'}}</v-btn>
				</v-col>
			</v-row>
			<v-row v-if="editMode" justify="center">
				<v-col cols="6">
					<v-btn block color="primary" text @click="cancelEdit">Cancel</v-btn>
				</v-col>
			</v-row>
		</v-form>
	</div>
</template>

<script>
import crypto from "crypto";

export default {
	data: () => ({
		user: {},
		editMode: false,
		loading: false,
		currentPassword: null,
		newPassword: null,
		showOld: false,
		showNew: false,
		emailError: null,
		settingsForm: false,
		newPasswordError: null,
		rules: {
			required: (v) => !!v || "Input is required",
		},
		//
		apiPath: process.env.VUE_APP_BASE_PATH || "http://localhost:3000",
	}),
	methods: {
		//
		editSave() {
			// if editMode is false,
			// just toggle it and return
			if (!this.editMode) return (this.editMode = true);

			// the rest of this function is when user is in edit mode and saving new settings
			this.emailError = null;
			this.newPasswordError = null;

			if (this.newPassword && this.newPassword === this.currentPassword) {
				this.newPasswordError =
					"New password must be different than current.";
				return;
			}

			const hashed = {};
			// if user wants to change password, hash them
			if (this.currentPassword && this.newPassword) {
				hashed.current = crypto
					.createHash("sha256")
					.update(this.currentPassword)
					.digest("hex");

				hashed.new = crypto
					.createHash("sha256")
					.update(this.newPassword)
					.digest("hex");
			}

			// we've edited. save said data;
			this.saveNewUserData(hashed);
			this.editMode = false;
		},
		async saveNewUserData(password) {
			const data = {
				...this.user,
			};

			try {
				if (password.hasOwnProperty("new")) {
					data.password = password.current;
					data.newPassword = password.new;
				}

				const response = await this.$axios({
					method: "put",
					url: `${this.apiPath}/user/settings`,
					data,
					headers: {
						authorization: `Bearer ${this.$store.state.auth.token}`,
					},
				});

				const user = {
					_id: response.data._id,
					firstName: response.data.firstName,
					lastName: response.data.lastName,
					email: response.data.email,
					phone: response.data.phone,
					emailNotifications: response.data.emailNotifications,
				};
				this.$store.commit("storeUser", user);
			} catch (error) {
				// error in email
				if (
					error.response &&
					error.response.data &&
					error.response.data.code === "EMAILINUSE"
				) {
					this.emailError = "Email already in use by another user.";
					this.$store.commit(
						"storeUser",
						error.response.data.userData
					);
				}
				console.log("Error saving data", error);
			}
		},
		cancelEdit() {
			this.editMode = false;
			this.setUserData();
		},
		setUserData() {
			const user = {
				firstName: this.$store.state.user.firstName,
				lastName: this.$store.state.user.lastName,
				email: this.$store.state.user.email,
				phone: this.$store.state.user.phone,
				emailNotifications: this.$store.state.user.emailNotifications,
			};
			this.user = user;
		},
	},
	mounted() {
		console.log("mounted", this.$store.state.user);
		this.setUserData();
	},
};
</script>

<style lang='scss' scoped>
h2 {
	font-weight: 300;
}
</style>