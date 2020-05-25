<template>
	<div>
		<v-row>
			<v-col class="text-center">
				<h2>Create a new post</h2>
			</v-col>
		</v-row>
		<v-container>
			<v-form ref="postForm" v-model="valid">
				<v-select :rules="[rules.required]" :items="postAreas" label="Property Area" v-model="area"></v-select>
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
				<p class="mb-0 mt-3">Select Allowed Hunting Category</p>
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
			</v-form>
			<v-row justify="end">
				<v-col cols="4">
					<v-btn block color="primary" :loading="posting" :disabled="posting" @click="createPost">Post</v-btn>
				</v-col>
			</v-row>
		</v-container>
		<SuccessDialog
			:isOpen="dialogs.success"
			@closeDialog="closeDialog('success')"
			:text="messages.success"
		/>
	</div>
</template>

<script>
export default {
	data: () => ({
		area: "",
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
		valid: true,
		categoryError: "",
		methodError: "",
		//
		postAreas: [
			{ text: "Minneapolis", value: "msp" },
			{ text: "Rochester", value: "rochester" },
			{ text: "St. Cloud", value: "stcloud" }
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
		//
		apiPath: process.env.VUE_APP_BASE_PATH || "http://localhost:3000"
	}),
	methods: {
		//
		clearDeerWeapon() {
			this.deerWeapon = [];
		},
		closeDialog(dialog) {
			this.dialogs[dialog] = false;
			this.messages[dialog] = "";
			this.$refs.postForm.reset();
			this.$router.push("/posts/list");
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

			// cool, everything is validated.
			let post = {
				area: this.area,
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

			try {
				await this.$axios({
					method: "post",
					url: `${this.apiPath}/api/post/create`,
					data: post
				});
				this.dialogs.success = true;
			} catch (error) {
				console.log("Error creating post", error.response.message);
				this.dialogs.error = true;
			} finally {
				this.posting = false;
			}
		}
	},
	computed: {
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
	watch: {
		dates: {
			immediate: false,
			handler(val) {
				if (val[0]) {
					this.availableFrom = new Date(val[0]);
				}
				if (val[1]) {
					this.availableTo = new Date(val[0]);
				}
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
</style>