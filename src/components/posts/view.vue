<template>
	<div v-if="post">
		<v-icon @click="$router.push('/posts/list')">mdi-arrow-left</v-icon>
		<v-row>
			<v-col cols="9">
				<h2>{{ post.title }}</h2>
				<p>{{post.area}}</p>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<p>{{ post.description }}</p>
			</v-col>
		</v-row>
		<v-row class="py-1">
			<v-col cols="12" class="py-0">
				<p class="mb-0">
					<strong>Available Dates:</strong>
				</p>
				<p>{{post.available.from | formatDate }} - {{ post.available.to | formatDate }}</p>
			</v-col>
			<v-col cols="6" class="py-0">
				<p class="mb-0">
					<strong>Huntable Acres</strong>
				</p>
				<p>{{post.huntableAcres}} acres</p>
			</v-col>
		</v-row>
		<v-row class="py-1">
			<v-col cols="12">
				<p class="mb-0">
					<strong>Hunting Categories:</strong>
				</p>
			</v-col>
			<v-col cols="4" class="py-0" v-for="(item, index) in post.category" :key="index">
				<span>{{ item.name | capitalizeSingle }}</span>
			</v-col>

			<template v-if="Object.keys(post.category).includes('deer')">
				<v-col cols="12">
					<p class="mb-0">
						<strong>Allowed Deer Hunting Methods:</strong>
					</p>
					<span
						v-for="(weapon, index) in post.category.deer.methods"
						:key="index"
						class="mr-6"
					>{{ weapon | capitalizeSingle }}</span>
				</v-col>
			</template>
		</v-row>
		<v-row>
			<v-col>
				<p class="mb-0">
					<strong>Price:</strong>
				</p>
				<p>${{post.price}}/day</p>
			</v-col>
		</v-row>
		<v-row>
			<v-slide-group v-model="slideGroup" class="pa-4" show-arrows>
				<v-slide-item
					v-for="(image, index) in post.images"
					:key="index"
					v-slot:default="{ active, toggle }"
				>
					<v-card
						:color="active ? 'primary' : 'grey lighten-1'"
						class="ma-4"
						height="200"
						width="100"
						@click="toggle"
					>
						<v-row class="fill-height" align="center" justify="center">
							<v-scale-transition>
								<v-icon v-if="active" color="white" size="48" v-text="'mdi-close-circle-outline'"></v-icon>
							</v-scale-transition>
						</v-row>
					</v-card>
				</v-slide-item>
			</v-slide-group>

			<v-expand-transition>
				<v-sheet v-if="slideGroup != null" color="grey lighten-4" height="200" tile>
					<v-row class="fill-height" align="center" justify="center">
						<h3 class="title">Selected {{ slideGroup }}</h3>
					</v-row>
				</v-sheet>
			</v-expand-transition>
		</v-row>
		<v-row>
			<v-col class="text-right mr-4">
				<p>
					<strong>Interested in this property?</strong>
				</p>
				<v-btn color="primary" @click="dialogs.contact = !dialogs.contact">Contact User</v-btn>
			</v-col>
		</v-row>

		<!-- contact dialog -->
		<ContactDialog :isOpen="dialogs.contact" @closeDialog="closeDialog('contact')" />
	</div>
</template>

<script>
import ContactDialog from "./contactDialog";

export default {
	components: {
		ContactDialog
	},
	data: () => ({
		post: null,
		dialogs: {
			contact: false,
			success: false,
			error: false
		},
		slideGroup: null,
		//
		apiPath: process.env.VUE_APP_BASE_PATH
	}),
	methods: {
		//
		async fetchPost() {
			try {
				const response = await this.$axios({
					method: "get",
					url: `${this.apiPath}/api/post/view`,
					params: {
						id: this.$route.params.id
					}
				});

				this.post = response.data;
			} catch (error) {
				console.log("oh noes!", error.response);
				this.$router.push("/posts/list");
			}
		},
		closeDialog(dialog) {
			this.dialogs[dialog] = false;
		}
	},
	computed: {
		//
	},
	created() {
		//
	},
	mounted() {
		this.fetchPost();
	}
};
</script>

<style lang='scss' scoped>
</style>