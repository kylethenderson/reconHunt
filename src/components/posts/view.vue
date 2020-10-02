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
			<v-col cols="4" class="py-0" v-for="(item, index) in categories" :key="index">
				<span>{{ item | capitalizeSingle }}</span>
			</v-col>

			<template v-if="categories.includes('deer')">
				<v-col cols="12">
					<p class="mb-0">
						<strong>Allowed Deer Hunting Methods:</strong>
					</p>
					<span
						v-for="(weapon, index) in post.category.deer.options.hunting_methods"
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
			<v-col v-for="(image, index) in post.images" :key="index">
				<img
					:src="`/images/thumbnail_${image.filename}`"
					@click="viewImage(image)"
					class="pointer"
				/>
			</v-col>
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
		<ContactDialog v-model="dialogs.contact" @emailResult="emailResult" />

		<!-- success dialog -->
		<SuccessDialog v-model="dialogs.success" :title="title.success" :text="text.success" />

		<!-- error dialog -->
		<ErrorDialog v-model="dialogs.error" :title="title.error" :text="text.error" />

		<!-- image dialog -->
		<ImageDialog v-model="dialogs.image" :image="selectedImage"></ImageDialog>
	</div>
</template>

<script>
import ContactDialog from "./contactDialog";
import ImageDialog from "./imageDialog";

export default {
	components: {
		ContactDialog,
		ImageDialog,
	},
	data: () => ({
		post: null,
		dialogs: {
			contact: false,
			success: false,
			error: false,
			image: false,
		},
		title: {
			success: null,
			error: null,
		},
		text: {
			success: null,
			error: null,
		},

		selectedImage: {},
		//
		apiPath: process.env.VUE_APP_BASE_PATH,
		imagePath: process.env.VUE_APP_IMAGE_PATH,
	}),
	computed: {
		categories() {
			const keys = Object.keys(this.post.category);
			return keys;
		},
		imageDialog() {
			return this.dialogs.image;
		},
	},
	methods: {
		//
		async fetchPost() {
			try {
				const response = await this.$axios({
					method: "get",
					url: `${this.apiPath}/post/view`,
					params: {
						id: this.$route.params.id,
					},
				});

				this.post = response.data;
			} catch (error) {
				console.log("richard, what'd you do?!?", error.response);
				this.$router.push("/posts/list");
			}
		},
		viewImage(image) {
			this.dialogs.image = true;
			this.selectedImage = image;
		},
		emailResult(object) {
			if (object.result) {
				this.dialogs.success = true;
				this.title.success = "Email sent";
				this.text.success = `Your email has been sent to ${object.username}. `;
			} else {
				this.dialogs.error = true;
				this.text.error =
					"There was an error sending the email. Please try again later.";
			}
		},
	},
	mounted() {
		this.fetchPost();
	},
	watch: {
		imageDialog: {
			immediate: true,
			handler(value) {
				if (!value) this.selectedImage = {};
			},
		},
	},
};
</script>

<style lang='scss' scoped>
.pointer:hover {
	cursor: pointer;
}
</style>