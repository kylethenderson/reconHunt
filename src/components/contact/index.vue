<template>
	<div>
		<v-row justify="center">
			<v-col class="text-center">
				<h1 class="contact-title">Give us a shout</h1>
			</v-col>
		</v-row>
		<v-form v-model="valid">
			<v-container>
				<v-text-field label="Title" v-model="title" :rules="[rules.required]"></v-text-field>
				<v-textarea label="Message" v-model="message" :rules="[rules.required]"></v-textarea>
				<v-row>
					<v-spacer></v-spacer>
					<v-col class="flex-grow-0 flex-shrink-1">
						<v-btn color="primary" :loading="submitting" :disabled="submitting" @click="submit">Submit</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-form>

		<SuccessDialog
			v-model="dialogs.success"
			title="Email Sent"
			text="Thank you for your feedback. We will review and contact you if necessary."
		/>
		<ErrorDialog
			v-model="dialogs.error"
			title="Error"
			text="There was an error sending the email. Please try later."
		/>
	</div>
</template>

<script>
export default {
	data: () => ({
		//
		submitting: false,
		valid: false,
		title: "",
		message: "",
		//
		dialogs: {
			success: false,
			error: false,
		},
		rules: {
			required: (v) => !!v || "Field is required",
		},
		//
		apiPath: process.env.VUE_APP_BASE_PATH,
	}),
	methods: {
		async submit() {
			this.submitting = true;
			const data = {
				title: this.title,
				message: this.message,
			};
			try {
				console.log(data);
				//
				await this.$axios({
					method: "post",
					url: `${this.apiPath}/user/contact`,
					data,
				});
				this.dialogs.success = true;
			} catch (error) {
				console.log(error);
				this.dialogs.error = false;
			} finally {
				//
				this.submitting = false;
				this.title = null;
				this.message = null;
			}
		},
	},
};
</script>

<style lang='scss' scoped>
.contact-title {
	font-size: 1.75rem;
	font-weight: 400;
}
</style>