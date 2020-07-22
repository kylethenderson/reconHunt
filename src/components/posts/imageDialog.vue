<template>
	<v-dialog :value="value" persistent>
		<v-card style="position: relative;" v-if="value">
			<v-toolbar height="36" color="primary">
				<v-spacer></v-spacer>
				<v-btn icon large dark @click="$emit('input', false)">
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-toolbar>
			<v-img :src="`${apiPath}/images/${image.filename}`"></v-img>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	props: {
		value: Boolean,
		image: Object
	},
	data: () => ({
		//Î
		apiPath: process.env.VUE_APP_BASE_PATH
	})
};
</script>

<style lang='scss' scoped>
</style>