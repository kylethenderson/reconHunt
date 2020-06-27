<template>
	<div class="px-3">
		<h2 style="text-transform: uppercase">user settings</h2>
		<v-row justify="center">
			<v-col cols="6">
				<v-text-field hide-details :readonly="!editMode" label="First Name" v-model="user.firstName"></v-text-field>
			</v-col>
			<v-col cols="6">
				<v-text-field hide-details :readonly="!editMode" label="Last Name" v-model="user.lastName"></v-text-field>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="12">
				<v-text-field hide-details :readonly="!editMode" label="Email" v-model="user.email"></v-text-field>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="6">
				<v-text-field hide-details :readonly="!editMode" label="Phone" v-model="user.phone"></v-text-field>
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
					hide-details
					v-model="user.emailNotifications"
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
	</div>
</template>

<script>
import crypto from "crypto";

export default {
	data: () => ({
		editMode: false,
		loading: false,
		currentPassword: null,
		newPassword: null,
		showOld: false,
		showNew: false,
		//
		apiPath: process.env.VUE_APP_BASE_PATH || "http://localhost:3000"
	}),
	methods: {
		//
		editSave() {
			// if editMode is false,
			// just toggle it and return
			if (!this.editMode) {
				this.editMode = true;
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
				...this.user
			};

			try {
				if (password.hasOwnProperty("new")) {
					data.password = password.current;
					data.newPassword = password.new;
				}

				const response = await this.$axios({
					method: "put",
					url: `${this.apiPath}/api/user/settings`,
					data,
					headers: {
						authorization: `Bearer ${this.$store.state.auth.token}`
					}
				});

				const user = {
					_id: response.data._id,
					firstName: response.data.firstName,
					lastName: response.data.lastName,
					email: response.data.email,
					phone: response.data.phone
				};
				this.$store.commit("storeUser", user);
			} catch (error) {
				console.log("Error saving data", error);
			}
		}
	},
	computed: {
		//
		user() {
			return this.$store.state.user;
		}
	},
	mounted() {}
};
</script>

<style lang='scss' scoped>
h2 {
	font-weight: 300;
}
</style>