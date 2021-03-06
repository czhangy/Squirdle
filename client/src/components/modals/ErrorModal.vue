<template>
	<Modal
		id="error-modal"
		ref="error-modal"
		modalID="error-modal"
		:isClosable="false"
	>
		<div id="error">
			<p v-if="errorCode === INVALID" id="error-msg">
				Not a valid Pokémon!
			</p>
			<p v-else-if="errorCode === DUPLICATE" id="error-msg">
				Pokémon already guessed!
			</p>
			<p v-else id="error-msg">Oops, this error shouldn't exist</p>
		</div>
	</Modal>
</template>

<script>
// Vuex for light mode
import { mapGetters } from "vuex";

// Import global constants for error code processing
import { INVALID, DUPLICATE } from "@/constants.js";

// Import global component
import Modal from "@/components/global/Modal.vue";

export default {
	name: "ErrorModal",
	components: {
		Modal,
	},
	props: {
        // Error code that identifies the correct error message
		errorCode: {
			type: Number,
			required: true,
		},
	},
	data: function () {
		return {
			// Global constants
			INVALID,
			DUPLICATE,
		};
	},
	methods: {
        // Modal control
		openModal: function () {
			// Pop up and close automatically
			this.$refs["error-modal"].openModal();
			setTimeout(() => {
				this.$refs["error-modal"].closeModal();
			}, 750);
		},
	},
    computed: {
		// Map Vuex function for light mode
		...mapGetters(["lightMode"]),
	},
	watch: {
        // Light mode styling on toggle
		lightMode: function () {
			this.$updateLightMode('#error');
		},
	},
	mounted: function () {
        this.$updateLightMode('#error');
	},
};
</script>

<style lang="scss" scoped>
#error {
	height: 100%;
	width: 100%;

	#error-msg {
		color: $accent-color;
		font-size: 1.5rem;
		letter-spacing: 2px;
	}
}

#error.light-mode {
    #error-msg {
        color: $light-accent-color;
    }
}
</style>
