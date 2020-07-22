<template>
	<v-dialog :value="value" persistent>
		<v-card>
			<v-toolbar color="primary" dark>
				<v-toolbar-title>Contact</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-icon @click="closeDialog">mdi-close</v-icon>
			</v-toolbar>
			<v-container>
				<v-row justify="center">
					<v-col cols="10">
						<p>Fill out the form below and we'll email the property owner your details.</p>
					</v-col>
				</v-row>
				<v-row justify="center">
					<v-col cols="10">
						<v-text-field label="Contact Name" v-model="name"></v-text-field>
					</v-col>
					<v-col cols="10">
						<v-text-field label="Contact Email" v-model="email"></v-text-field>
					</v-col>
					<v-col cols="10">
						<v-textarea label="Message" v-model="message"></v-textarea>
					</v-col>
					<v-col cols="10" class="text-right">
						<v-btn color="primary" @click="submit" :disabled="submitting" :loading="submitting">Submit</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-card>
	</v-dialog>
</template>

<script>
import jwt from "jsonwebtoken";

export default {
	props: {
		value: Boolean
	},
	data: () => ({
		//
		dialog: false,
		name: "",
		email: "",
		message: "",
		//
		submitting: false,
		//
		apiPath: process.env.VUE_APP_BASE_PATH
	}),
	methods: {
		//
		closeDialog() {
			// clear data
			this.message = "";
			this.$emit("input", false);
		},
		async submit() {
			this.submitting = true;

			const data = {
				postId: this.$route.params.id,
				name: this.name,
				email: this.email,
				message: this.message
			};

			try {
				await this.$axios({
					method: "post",
					url: `${this.apiPath}/api/post/contact`,
					data
				});
				this.closeDialog();
			} catch (error) {
				console.log("Error submitting interest", error);
			} finally {
				this.submitting = false;
			}
		}
	},
	computed: {
		//
		userData() {
			return this.$store.state.user;
		}
	},
	mounted() {
		this.email = this.userData.email;
		const firstName =
			this.userData.firstName.charAt(0).toUpperCase() +
			this.userData.firstName.slice(1);
		const lastName =
			this.userData.lastName.charAt(0).toUpperCase() +
			this.userData.lastName.slice(1);
		this.name = `${firstName} ${lastName}`;
	}
};
</script>

<style lang='scss' scoped>
</style>