<template>
	<v-dialog v-model="dialog" persistent>
		<v-card>
			<v-toolbar>
				<v-toolbar-title>Contact Us</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-icon @click="$emit('closeDialog')">mdi-close</v-icon>
			</v-toolbar>
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