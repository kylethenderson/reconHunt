<template>
	<div>
		<v-row justify="center" class="mb-6">
			<v-col cols="5">
				<v-text-field hide-details label="First Name" v-model="registerObject.firstName"></v-text-field>
			</v-col>
			<v-col cols="5">
				<v-text-field hide-details label="Last Name" v-model="registerObject.lastName"></v-text-field>
			</v-col>
			<v-col cols="5">
				<v-text-field hide-details label="Email" v-model="registerObject.email"></v-text-field>
			</v-col>
			<v-col cols="5">
				<v-text-field hide-details label="Phone Number" v-model="registerObject.phone"></v-text-field>
			</v-col>
			<v-col cols="5">
				<v-text-field hide-details label="Username" v-model="registerObject.username"></v-text-field>
			</v-col>
			<v-col cols="5">
				<v-text-field hide-details label="Password" v-model="registerObject.password"></v-text-field>
			</v-col>
		</v-row>
		<v-row>
			<v-col color="primary" class="text-center">
				<v-btn @click="validateForm" color="primary">Sign Up</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="text-center">
				<span>Already a Member?</span>
				<v-btn @click="$emit('toggleView')" text small>Log In</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	data: () => ({
		registerObject: {}
		//
	}),
	methods: {
		//
		validateForm() {
			// validate the data
			// then submit the form;
		},
		async register() {
			try {
				const response = await this.$axios.post(
					`{process.env.BASE_PATH}/api/user/register`
				);
				console.log(response);
			} catch (error) {
				console.log("error", error);
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