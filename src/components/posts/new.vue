<template>
	<div>
		<v-row style="position: relative">
			<v-icon @click="$router.push('/posts/list')" id="backIcon">mdi-arrow-left</v-icon>
			<v-col class="text-center">
				<h2>Create a new post</h2>
			</v-col>
		</v-row>
		<v-container>
			<v-form ref="postForm" v-model="valid" enctype="multipart/form-data">
				<v-row>
					<v-col cols="5">
						<v-text-field :rules="[rules.required]" label="City" v-model="city"></v-text-field>
					</v-col>
					<v-col cols="3">
						<v-select :rules="[rules.required]" :items="states" label="State" v-model="state"></v-select>
					</v-col>
					<v-col cols="4">
						<v-select :rules="[rules.required]" :items="regions" label="Region" v-model="region"></v-select>
					</v-col>
				</v-row>
				<v-text-field :rules="[rules.required]" label="Title" v-model="title"></v-text-field>
				<v-textarea :rules="[rules.required]" label="Property Description" v-model="description"></v-textarea>
				<v-dialog ref="dialog" v-model="modal" :return-value.sync="dates" persistent width="290px">
					<template v-slot:activator="{ on }">
						<v-text-field
							:value="dateText"
							label="Select availabile dates"
							append-outer-icon="mdi-calendar"
							readonly
							v-on="on"
							:rules="[rules.required]"
						></v-text-field>
					</template>
					<v-date-picker color="primary" v-model="dates" range scrollable>
						<v-spacer></v-spacer>
						<v-btn text color="primary" @click="modal = false">Cancel</v-btn>
						<v-btn text color="primary" @click="$refs.dialog.save(dates)">OK</v-btn>
					</v-date-picker>
				</v-dialog>
				<p class="mb-0 mt-3">Select Hunting Categories</p>
				<v-checkbox
					color="primary"
					hide-details
					v-model="category"
					label="Deer"
					value="deer"
					:error="!!categoryError"
				></v-checkbox>
				<template v-if="includesDeer">
					<v-row justify="center">
						<v-col cols="12" class="pa-0 text-center">
							<p class="mb-0 mt-2">Select Allowed Weapons for Deer</p>
						</v-col>
						<v-col cols="3">
							<v-checkbox
								color="primary"
								class="mt-0"
								hide-details
								v-model="deerWeapon"
								label="Bow"
								value="bow"
								:error="!!methodError"
							></v-checkbox>
						</v-col>
						<v-col cols="3">
							<v-checkbox
								color="primary"
								class="mt-0"
								hide-details
								v-model="deerWeapon"
								label="Slug"
								value="slug"
								:error="!!methodError"
							></v-checkbox>
						</v-col>
						<v-col cols="3">
							<v-checkbox
								color="primary"
								class="mt-0"
								hide-details="auto"
								v-model="deerWeapon"
								label="Rifle"
								value="rifle"
								:error="!!methodError"
							></v-checkbox>
						</v-col>
						<p
							v-if="!!methodError"
							style="margin: 0; padding: 0; color: #FF5252"
							class="caption"
						>At least one weapon required for deer hunting.</p>
					</v-row>
				</template>
				<v-checkbox
					color="primary"
					hide-details
					v-model="category"
					label="Upland"
					value="upland"
					:error="!!categoryError"
				></v-checkbox>
				<v-checkbox
					color="primary"
					hide-details
					v-model="category"
					label="Turkey"
					value="turkey"
					:error="!!categoryError"
				></v-checkbox>
				<v-checkbox
					color="primary"
					hide-details="auto"
					v-model="category"
					label="Varmint"
					value="varmint"
					:error-messages="categoryError"
				></v-checkbox>
				<v-checkbox
					color="primary"
					hide-details="auto"
					v-model="category"
					label="Water Fowl"
					value="waterFowl"
					:error-messages="categoryError"
				></v-checkbox>
				<v-checkbox
					color="primary"
					hide-details="auto"
					v-model="category"
					label="Fishing"
					value="fish"
					:error-messages="categoryError"
				></v-checkbox>
				<v-checkbox
					color="primary"
					hide-details="auto"
					v-model="category"
					label="Guided Hunt"
					value="guidedHunt"
					:error-messages="categoryError"
				></v-checkbox>
				<v-row>
					<v-col cols="6">
						<v-text-field
							hide-details="auto"
							type="number"
							label="Huntable Acres"
							v-model="huntableAcres"
							:rules="[rules.required]"
						></v-text-field>
					</v-col>
					<v-col cols="6">
						<v-text-field
							prepend-icon="mdi-currency-usd"
							hide-details="auto"
							type="number"
							label="Cost/day"
							v-model="price"
							:rules="[rules.required]"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row class="pb-4">
					<v-col cols="12">
						<v-btn @click="$refs.fileInput.click()" block color="primary">Upload Images</v-btn>
						<input style="display: none" ref="fileInput" type="file" name="file" @change="selectImage" />
						<v-alert :value="!!imageUploadError" color="red" outlined dense>{{ imageUploadError }}</v-alert>
					</v-col>
				</v-row>
				<v-row v-for="(image, index) in selectedImages" :key="index">
					<v-col cols="120" class="py-1">{{ image.name }}</v-col>
					<v-col cols="2">
						<v-icon @click="removeImage(index)">mdi-close-circle-outline</v-icon>
					</v-col>
				</v-row>
			</v-form>
			<v-row justify="end">
				<v-col cols="4">
					<v-btn
						block
						color="primary"
						:loading="posting"
						:disabled="posting || !valid"
						@click="createPost"
					>Post</v-btn>
				</v-col>
			</v-row>
		</v-container>
		<SuccessDialog
			v-model="dialogs.success"
			@closeDialog="closeDialog('success')"
			title="Post Added"
			text="Thank you for posting."
		/>
		<ErrorDialog
			v-model="dialogs.error"
			title="Unable to post ad."
			@closeDialog="closeDialog('error')"
			buttonColor="red"
			:text="messages.error"
		/>
	</div>
</template>

<script>
export default {
	data: () => ({
		city: "",
		state: "",
		region: "",
		title: "",
		description: "",
		availableFrom: "",
		availableTo: "",
		category: [],
		deerWeapon: [],
		huntableAcres: "",
		price: "",
		//
		rules: {
			required: val => !!val || "Input is required"
		},
		valid: false,
		categoryError: "",
		methodError: "",
		//
		regions: [
			{ text: "SE - Southeast", value: "se" },
			{ text: "SW - Southwest", value: "sw" },
			{ text: "NW - Northwest", value: "nw" },
			{ text: "NE - Northeast", value: "ne" },
			{ text: "Cen - Central", value: "cen" }
		],
		dates: [],
		modal: false,
		posting: false,
		dialogs: {
			success: false,
			error: false
		},
		messages: {
			success: "",
			error: ""
		},
		imageUploadError: "",
		selectedImage: null,
		selectedImages: [],
		//
		apiPath: process.env.VUE_APP_BASE_PATH || "http://localhost:3000"
	}),
	computed: {
		states() {
			return this.$store.state.states;
		},
		//
		includesDeer() {
			if (this.category.includes("deer")) {
				return true;
			} else {
				this.clearDeerWeapon();
				return false;
			}
		},
		dateText() {
			if (!this.dates) return;
			const formattedDates = this.dates.map(date => {
				const words = date.split("-");
				return `${words[1]}-${words[2]}-${words[0]}`;
			});
			return formattedDates.join(" -> ");
		}
	},
	methods: {
		//
		clearDeerWeapon() {
			this.deerWeapon = [];
		},
		closeDialog(dialog) {
			this.dialogs[dialog] = false;
			this.messages[dialog] = "";
			if (dialog === "error") return;
			this.$refs.postForm.reset();
			this.$router.push("/posts/list");
		},
		selectImage(event) {
			this.imageUploadError = "";
			const maxSize = 3000000;
			const maxImages = 6;
			const image = event.target.files[0];
			if (!image) return;
			const allowedTypes = [
				"image/jpeg",
				"image/png",
				"image/gif",
				"image/jpg"
			];

			if (!allowedTypes.includes(image.type))
				return (this.imageUploadError = "Only images are allowed.");
			if (image.size > maxSize)
				return (this.imageUploadError = `File size too large. Max size ${maxSize /
					1000000}Mb.`);
			if (this.selectedImages.length >= maxImages)
				return (this.imageUploadError = `Maximum of ${maxImages} images allowed.`);

			this.selectedImages.push(image);
		},
		removeImage(index) {
			this.selectedImages.splice(index, 1);
		},
		async createPost() {
			this.posting = true;
			// clear errors
			// this.$refs.postForm.resetValidation();
			this.categoryError = "";
			this.methodError = "";

			// validate the form
			const valid = this.$refs.postForm.validate();
			const hasCategory = !!this.category.length;
			if (!hasCategory)
				this.categoryError = "At least one category required.";
			let deerMethod = true;
			if (this.includesDeer) {
				let deerMethods = !!this.deerWeapon.length;
				if (!deerMethods)
					this.methodError =
						"At least one method required for deer hunting.";
			}
			if (!valid || !hasCategory || !deerMethod) {
				this.posting = false;
				return;
			}

			const formData = new FormData();
			this.selectedImages.forEach(image => {
				formData.append("image", image);
			});

			// cool, everything is validated.
			const post = {
				city: this.city,
				state: this.state,
				region: this.region,
				title: this.title,
				description: this.description,
				available: {
					from: this.availableFrom,
					to: this.availableTo
				},
				price: this.price,
				category: this.category,
				deerMethods: this.deerWeapon,
				huntableAcres: this.huntableAcres
			};

			formData.append("data", JSON.stringify(post));

			try {
				await this.$axios({
					method: "post",
					url: `${this.apiPath}/post/create`,
					data: formData,
					headers: { "Content-Type": "multipart/form-data" }
				});
				this.dialogs.success = true;
			} catch (error) {
				console.log("Error creating post", error.response.data.message);
				this.messages.error = error.response.data.message;
				this.dialogs.error = true;
			} finally {
				this.posting = false;
			}
		}
	},
	watch: {
		dates: {
			immediate: false,
			handler(val) {
				if (val[0]) this.availableFrom = new Date(val[0]);
				if (val[1]) this.availableTo = new Date(val[1]);
				else this.availableTo = new Date(val[0]);
			}
		}
	},
	created() {
		//
	}
};
</script>

<style lang='scss' scoped>
h2 {
	font-weight: 300;
}
#backIcon {
	position: absolute;
	top: 0px;
	left: 10px;
}
</style>