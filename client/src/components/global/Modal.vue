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
			<slot />
		</div>
	</div>
</template>

<script>
// Vuex for light mode
import { mapGetters } from "vuex";

export default {
	name: "Modal",
	props: {
        // Specifies which modal is mounted
		modalID: {
			type: String,
			required: true,
		},
        // Specifies if the modal should have an 'X' icon
		isClosable: {
			type: Boolean,
			default: true,
		},
	},
	methods: {
        // Set light mode styling of modal content background
		updateLightMode: function () {
			const modal =
				document.getElementsByClassName("modal")[this.modalID];
			if (localStorage.lightMode && JSON.parse(localStorage.lightMode))
				modal.classList.add("light-mode");
			else modal.classList.remove("light-mode");
		},
		// Modal controls
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
	computed: {
		// Map Vuex function for light mode
		...mapGetters(["lightMode"]),
	},
	watch: {
        // Light mode styling on toggle
		lightMode: function () {
			this.updateLightMode();
		},
	},
	mounted: function () {
		this.updateLightMode();
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
        z-index: $modal-x;
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

.modal.light-mode {
	.modal-content {
		background: $light-main-color;
	}

	.modal-close {
		filter: invert(100%);
	}
}
</style>
