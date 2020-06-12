<template>
	<div>
		<h2 style="text-transform: uppercase">user settings</h2>
		<v-row justify="center">
			<v-col cols="5">
				<v-text-field :readonly="!editMode" label="First Name" v-model="user.firstName"></v-text-field>
			</v-col>
			<v-col cols="6">
				<v-text-field :readonly="!editMode" label="Last Name" v-model="user.lastName"></v-text-field>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="11">
				<v-text-field :readonly="!editMode" label="Email" v-model="user.email"></v-text-field>
			</v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="6">
				<v-text-field :readonly="!editMode" label="Phone" v-model="user.phone"></v-text-field>
			</v-col>
			<v-col cols="5"></v-col>
		</v-row>
		<v-row justify="center">
			<v-col cols="6">
				<v-btn
					block
					color="primary"
					@click="editSave"
					:outlined="!editMode"
					:loading="loading"
					:disabled="loading"
				>{{ editMode ? 'Save' : 'Edit'}}</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	data: () => ({
		editMode: false,
		loading: false,
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

			// we've edited. save said data;
			this.saveNewUserData();
			this.editMode = false;
		},
		async saveNewUserData() {
			try {
				const response = await this.$axios({
					method: "put",
					url: `${this.apiPath}/api/user/settings`,
					data: this.user,
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