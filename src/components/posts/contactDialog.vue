<template>
	<v-dialog v-model="dialog">
		<v-card>
			<v-toolbar color="primary" dark>
				<v-toolbar-title>Contact</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-icon @click="closeDialog">mdi-close</v-icon>
			</v-toolbar>
			<v-row>
				<v-col></v-col>
			</v-row>
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
			// clear data
			this.$emit("closeDialog");
		}
	},
	computed: {
		//
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