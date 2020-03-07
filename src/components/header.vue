<template>
	<v-app-bar app color="primary" dark>
		<v-toolbar-title @click="goHome" class="nav-title">Recon Hunt</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items>
			<v-btn text to="/login">Log In/Sign Up</v-btn>
		</v-toolbar-items>
	</v-app-bar>
</template>

<script>
export default {
	data: () => ({
		//
	}),
	methods: {
        //
        goHome() {
            this.$router.push('/')
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
.nav-title {
	text-transform: uppercase;
	font-size: 2rem;
	letter-spacing: 3px;
}
.nav-title:hover {
    cursor: pointer;
}
</style>