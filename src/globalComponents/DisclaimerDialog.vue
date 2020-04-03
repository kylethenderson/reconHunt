<template>
	<v-dialog v-model="dialog">
		<v-card>
			<v-toolbar color="primary" dark>
				<v-toolbar-title>Terms and Conditions</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-icon @click="closeDialog">mdi-close</v-icon>
			</v-toolbar>
			<v-card-text>
				<h3>Terms and Conditions here</h3>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: {
		isOpen: Boolean
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
			handler(val) {
				this.dialog = val;
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