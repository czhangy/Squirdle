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
// Import global constants
import { INVALID, DUPLICATE } from "@/constants.js";

// Import global component
import Modal from "@/components/global/Modal.vue";

export default {
	name: "ErrorModal",
	components: {
		Modal,
	},
	props: {
		errorCode: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			// Global constants
			INVALID,
			DUPLICATE,
		};
	},
	methods: {
		openModal: function () {
			// Display as pop-up
			this.$refs["error-modal"].openModal();
			setTimeout(() => {
				this.$refs["error-modal"].closeModal();
			}, 750);
		},
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
</style>
