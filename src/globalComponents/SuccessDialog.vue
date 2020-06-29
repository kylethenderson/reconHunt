<template>
	<v-dialog :value="value">
		<v-card>
			<v-card-title class="headline">{{ title }}</v-card-title>
			<v-card-text class="title">{{ text }}</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn class="mb-3" :color="buttonColor" @click="closeDialog">{{ buttonText }}</v-btn>
				<v-spacer></v-spacer>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean
		},
		title: {
			type: String,
			default: "Success!"
		},
		text: {
			type: String,
			default: "Click 'ok' to continue"
		},
		toolbarColor: {
			type: String,
			default: "primary"
		},
		buttonText: {
			tye: String,
			default: "Ok"
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
	created() {
		//
	}
};
</script>

<style lang='scss' scoped>
</style>