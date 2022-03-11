<template>
	<Modal id="error-modal" ref="error-modal" modalID="error-modal" :isClosable="false">
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
	props: {
		error: {
			type: String,
			required: true,
		},
	},
	methods: {
		openModal: function () {
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
	// Sizing
	height: 100%;
	width: 100%;

    #error-msg {
        // Typography
        color: white;
        font-size: 1.5rem;
        letter-spacing: 2px;
    }
}
</style>
