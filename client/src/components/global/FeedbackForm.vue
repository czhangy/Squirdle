<template>
	<form id="feedback-form" ref="form" @submit.prevent="submitFeedback">
		<h2 id="feedback-header">FEEDBACK</h2>
		<label for="subject" class="form-label">Subject</label>
		<input id="subject" v-model="subject" name="subject" class="form-input" />
		<label for="message" class="form-label">Message</label>
		<textarea id="message" v-model="message" name="message" class="form-input" />
		<input type="submit" id="feedback-submit" value="SUBMIT" />
	</form>
</template>

<script>
// Vuex for light mode
import { mapGetters } from "vuex";

// Import library for email
import emailjs from "@emailjs/browser";

export default {
	name: "FeedbackForm",
	data: function () {
		return {
			subject: "",
			message: "",
		};
	},
	methods: {
        // Send email using form
		submitFeedback: function () {
			emailjs
				.sendForm(
					"service_npxdd6d",
					"template_u9dkwey",
					this.$refs.form,
					"user_gWrfu7e48Jcu4pRpqXqUi"
				)
				.then(
					(result) => {
						console.log("SUCCESS!", result.text);
					},
					(error) => {
						console.log("FAILED...", error.text);
					}
				);
		},
	},
	computed: {
		// Map Vuex function for light mode
		...mapGetters(["lightMode"]),
	},
	watch: {
		lightMode: function () {
			// Update light mode on toggle
			this.$updateLightMode("#feedback-form");
		},
	},
	mounted: function () {
		this.$updateLightMode("#feedback-form");
	},
};
</script>

<style lang="scss" scoped>
#feedback-form {
	display: flex;
	flex-direction: column;

	#feedback-header {
		font-family: $alt-font;
		font-size: 1.5rem;
		line-height: 1.5rem;
		letter-spacing: 2px;
		text-decoration: underline;
		margin-bottom: 32px;
	}

	.form-label {
		text-align: left;
		margin-bottom: 8px;
		margin-left: 12px;
		font-family: $alt-font;
		font-size: 1.2rem;
		line-height: 1.2rem;
	}

	.form-input {
		background: transparent;
		border: 1px solid $tile-color;
		font-family: $main-font;
		color: $accent-color;
		font-size: 1.2rem;
		letter-spacing: 1px;
		padding: 8px 12px;
		margin-bottom: 24px;

		&:focus {
			outline: none;
			background: $focus-color;
		}
	}

	#message {
		height: 100px;
	}

	#feedback-submit {
		color: $accent-color;
		height: 50px;
		width: 150px;
		margin: 0 auto;
		font-family: $alt-font;
		font-size: 1.2rem;
		line-height: 1.2rem;
		background: transparent;
		border: 2px solid $accent-color;
		// Center button text
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}
}

#feedback-form.light-mode {
	.form-input {
		color: $light-accent-color;

		&:focus {
			background: $light-focus-color;
		}

		&::placeholder {
			color: lighten(grey, 20);
		}
	}

	#feedback-submit {
		color: $light-accent-color;
		border-color: $light-accent-color;
	}
}

// Sticky hover
@media (hover: hover) {
	#feedback-form > #feedback-submit:hover {
		background: $accent-color;
		color: $main-color;
	}

	#feedback-form.light-mode > #feedback-submit:hover {
		background: $light-accent-color;
		color: $light-main-color;
	}
}
</style>
