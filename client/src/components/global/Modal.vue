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
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	// Hide by default
	z-index: $hidden;

	.modal-backdrop {
		width: 100%;
		height: 100%;
		background: black;
		transition: opacity 0.4s ease;
		// Reset transition
		opacity: 0;
	}

	.modal-content {
        // Scroll on small displays
        max-height: 80vh;
        overflow-y: scroll;
		width: 400px;
		position: absolute;
		background: $main-color;
		border-radius: 5px;
		transition: all 0.4s ease;
		// Reset transition
		transform: translateY(40px);
		opacity: 0;
		padding: 24px;

        &::-webkit-scrollbar {
            // Hide scrollbar
            display: none;
        }
	}

	.modal-close {
		position: absolute;
		top: 16px;
		right: 16px;
		height: 32px;
		width: 32px;
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
	// Overlay all other content
	z-index: $modal;
}
</style>
