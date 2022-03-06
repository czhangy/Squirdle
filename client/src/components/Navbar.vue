<template>
	<div id="navbar">
		<Modal id="help-modal" :onClose="closeHelpModal">
			<Help />
		</Modal>
		<Modal id="settings-modal" :onClose="closeSettingsModal">
            <Settings />
            </Modal>
		<button id="help" @click="openHelpModal">
			<img src="@/assets/icons/help.png" alt="Help" id="help-icon" />
		</button>
		<h1 id="title">SQUIRDLE</h1>
		<button id="settings" @click="openSettingsModal">
			<img
				src="@/assets/icons/settings.png"
				alt="Settings"
				id="settings-icon"
			/>
		</button>
	</div>
</template>

<script>
// Import components
import Modal from "@/components/Modal.vue";
import Help from "@/components/Help.vue";
import Settings from "@/components/Settings.vue";

export default {
	name: "Navbar",
	components: {
		Modal,
        Help,
        Settings,
	},
	methods: {
		// Help modal control
		openHelpModal: function () {
			document.getElementById("help-modal").classList.add("overlay");
			document.getElementById("help-modal").classList.add("show");
		},
		closeHelpModal: function () {
			document.getElementById("help-modal").classList.remove("show");
			setTimeout(() => {
				document
					.getElementById("help-modal")
					.classList.remove("overlay");
			}, 400);
		},
		// Settings modal control
		openSettingsModal: function () {
			document.getElementById("settings-modal").classList.add("overlay");
			document.getElementById("settings-modal").classList.add("show");
		},
		closeSettingsModal: function () {
			document.getElementById("settings-modal").classList.remove("show");
			setTimeout(() => {
				document
					.getElementById("settings-modal")
					.classList.remove("overlay");
			}, 400);
		},
	},
	mounted: function () {
		// Pop up how to play
		setTimeout(() => {
			this.openHelpModal();
		}, 500);
	},
};
</script>

<style lang="scss" scoped>
#navbar {
	// Bar styling
	background: $main-color;
	// Sizing
	max-width: 100vw;
	height: $navbar-height;
	// Border
	border-bottom: 2px solid $accent-color;
	// Layout
	display: flex;
	justify-content: space-between;
	align-items: center;
	// Spacing
	padding: 0 16px;

	button {
		// Remove default styling
		background: transparent;
		border: none;
		// Clickable
		cursor: pointer;

		img {
			// Icon sizing
			height: 24px;
			width: 24px;
		}
	}

	#title {
		// Typography
		color: $accent-color;
		font-weight: bold;
		font-size: 3rem;
		letter-spacing: 3px;
	}
}

// Mobile design
@media screen and (max-width: $mobile) {
	#navbar > #title {
		font-size: 2rem;
	}
}
</style>
