<template>
	<v-dialog :value="value">
		<v-card style="text-align: center;">
			<v-card-title class="center headline">{{ title }}</v-card-title>
			<v-card-text class="center title">{{ text }}</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn :color="buttonColor" class="mb-2" dark @click="closeDialog">{{ buttonText}}</v-btn>
				<v-spacer></v-spacer>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: {
		value: {
			type: Boolean,
			required: true
		},
		title: {
			type: String,
			default: "Oh snap!"
		},
		text: {
			type: String,
			default: "Something went awry. Try again later."
		},
		toolbarColor: {
			type: String,
			default: "primary"
		},
		buttonText: {
			type: String,
			default: "Ok"
		},
		buttonColor: {
			type: String,
			default: "primary"
		}
	},
	data: () => ({
		//
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
.center {
	display: inline-block;
	text-align: center;
}
</style>