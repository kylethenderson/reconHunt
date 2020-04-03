<template>
	<v-dialog v-model="dialog" persistent>
		<v-card>
			<v-toolbar color="primary" dark>
				<v-toolbar-title>Contact</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-icon @click="closeDialog">mdi-close</v-icon>
			</v-toolbar>
			<v-container>
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
						<v-btn color="primary" @click="submit">Submit</v-btn>
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
		isOpen: Boolean
	},
	data: () => ({
		//
		dialog: false,
		name: "",
		email: "",
		message: ""
	}),
	methods: {
		//
		closeDialog() {
			// clear data
			this.$emit("closeDialog");
		},
		submit() {
			const submitObject = {
				postId: this.$route.params.id,
				name: this.name,
				email: this.email,
				message: this.message
			};
			console.log(submitObject);
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
	},
	created() {
		//
	},
	watch: {
		isOpen: {
			immediate: false,
			handler(val) {
				this.dialog = val;
			}
		}
	}
};
</script>

<style lang='scss' scoped>
</style>