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
						<v-btn color="primary" @click="submit">Submit</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</v-form>
	</div>
</template>

<script>
export default {
	data: () => ({
		//
		valid: false,
		title: "",
		message: "",
		//
		rules: {
			required: v => !!v || "Field is required"
		},
		//
		apiPath: process.env.VUE_APP_BASE_PATH
	}),
	methods: {
		async submit() {
			const data = {
				title: this.title,
				message: this.message
			};
			try {
				console.log(data);
				//
				await this.$axios({
					method: "post",
					url: `${this.apiPath}/`
				});
			} catch (error) {
				console.log(error);
			} finally {
				//
			}
		}
	}
};
</script>

<style lang='scss' scoped>
.contact-title {
	font-size: 1.75rem;
	font-weight: 400;
}
</style>