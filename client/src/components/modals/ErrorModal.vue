<template>
	<Modal
		id="error-modal"
		ref="error-modal"
		modalID="error-modal"
		:isClosable="false"
	>
		<div id="error">
			<p id="error-msg">{{ error }}</p>
		</div>
	</Modal>
</template>

<script>
// Import global component
import Modal from "@/components/global/Modal.vue";

export default {
	name: "ErrorModal",
	components: {
		Modal,
	},
	data() {
		return {
			error: {
				type: String,
				default: "",
			},
		};
	},
	methods: {
		openModal: function (error) {
			this.error = error;
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
		color: white;
		font-size: 1.5rem;
		letter-spacing: 2px;
	}
}
</style>
