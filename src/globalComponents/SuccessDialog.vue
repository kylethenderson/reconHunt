<template>
	<v-dialog v-model="dialog">
		<v-card>
			<v-card-title>{{ title }}</v-card-title>
			<v-card-text>{{ title }}</v-card-text>
			<v-card-actions>
				<v-btn :color="buttonColor" @click="closeDialog">ok</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: {
		isOpen: {
			type: Boolean,
			required: true
		},
		title: {
			type: String,
			default: "Victory!"
		},
		test: {
			type: String,
			default: "Cool. Click 'ok' to continue"
		},
		toolbarColor: {
			type: String,
			default: "primary"
		},
		buttonColor: {
			type: String,
			default: "primary"
		}
	},
	data: () => ({
		//
		dialog: false
	}),
	methods: {
		//
		closeDialog() {
			this.$emit("closeDialog");
		}
	},
	computed: {
		//
	},
	watch: {
		isOpen: {
			immediate: true,
			handler(value) {
				this.dialog = value;
			}
		}
	},
	created() {
		//
	}
};
</script>

<style lang='scss' scoped>
</style>