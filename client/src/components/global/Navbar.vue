<template>
	<div id="navbar">
		<HelpModal ref="help-modal" />
		<SettingsModal ref="settings-modal" />
		<button id="help" @click="$refs['help-modal'].openModal">
			<img src="@/assets/icons/help.png" alt="Help" id="help-icon" />
		</button>
		<h1 id="title">SQUIRDLE</h1>
		<button id="settings" @click="$refs['settings-modal'].openModal">
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
import HelpModal from "@/components/modals/HelpModal.vue";
import SettingsModal from "@/components/modals/SettingsModal.vue";

export default {
	name: "Navbar",
	components: {
		HelpModal,
		SettingsModal,
	},
	mounted: function () {
		// Pop up how to play
		if (this.$route.name === "Squirdle")
			setTimeout(() => {
				this.$refs["help-modal"].openModal();
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
		font-family: $alt-font;
		color: $accent-color;
		font-weight: bold;
		font-size: 3rem;
		line-height: 3rem;
		letter-spacing: 3px;
	}
}

// Mobile design
@media screen and (max-width: $mobile) {
	#navbar > #title {
		font-size: 2rem;
		line-height: 2rem;
	}
}
</style>
