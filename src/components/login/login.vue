<template>
	<div>
		<v-row justify="center" class="mb-6">
			<v-col cols="8">
				<v-text-field hide-details label="Username" v-model="username"></v-text-field>
			</v-col>
			<v-col cols="8">
				<v-text-field hide-details label="Password" v-model="password"></v-text-field>
			</v-col>
		</v-row>
		<v-row>
			<v-col color="primary" class="text-center">
				<v-btn color="primary" >Log In</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col class="text-center">
				<span>Not a Member?</span>
				<v-btn @click="$emit('toggleView')" text small>Sign Up</v-btn>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	name: "login",
	data: () => ({
		//
		username: null,
		password: null
	}),
	methods: {
		//
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