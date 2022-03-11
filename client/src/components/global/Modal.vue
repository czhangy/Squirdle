<template>
	<div class="modal">
		<div class="modal-backdrop" @click="closeModal" />
		<div class="modal-content">
			<img
				v-if="isClosable"
				src="@/assets/icons/close.png"
				alt="Close Modal"
				class="modal-close"
				@click="closeModal"
			/>
			<slot ref="slot" />
		</div>
	</div>
</template>

<script>
export default {
	name: "Modal",
	props: {
		modalID: {
			type: String,
			required: true,
		},
		isClosable: {
			type: Boolean,
			default: true,
		},
	},
	methods: {
		openModal: function () {
			document.getElementById(this.modalID).classList.add("overlay");
			document.getElementById(this.modalID).classList.add("show");
		},
		closeModal: function () {
			document.getElementById(this.modalID).classList.remove("show");
			setTimeout(() => {
				document
					.getElementById(this.modalID)
					.classList.remove("overlay");
			}, 400);
		},
	},
};
</script>

<style lang="scss" scoped>
.modal {
	// Container positioning and sizing
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	// Flexbox for centering
	display: flex;
	justify-content: center;
	align-items: center;
	// Hide
	z-index: -1;

	.modal-backdrop {
		// Sizing
		width: 100%;
		height: 100%;
		// Color
		background: black;
		// Smooth animation
		transition: opacity 0.4s ease;
		// Reset transition
		opacity: 0;
	}

	.modal-content {
		// Sizing
		width: 400px;
		position: absolute;
		// Color
		background: $main-color;
		// Container
		border-radius: 5px;
		// Smooth animation
		transition: all 0.4s ease;
		// Reset transition
		transform: translateY(40px);
		opacity: 0;
		// Spacing
		padding: 24px;
	}

	.modal-close {
		// Positioning
		position: absolute;
		top: 16px;
		right: 16px;
		// Sizing
		height: 32px;
		width: 32px;
		// Clickable
		cursor: pointer;
	}
}

.show {
	.modal-backdrop {
		// Darken background
		opacity: 0.8;
	}

	.modal-content {
		// Fall from top
		transform: translateY(0);
		opacity: 1;
	}
}

.overlay {
	// Overlay
	z-index: 999;
}
</style>
