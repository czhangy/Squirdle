<template>
	<div id="navbar">
		<HelpModal ref="help-modal" />
		<SettingsModal ref="settings-modal" />
		<div class="button-container">
			<button id="help" @click="$refs['help-modal'].openModal">
				<img src="@/assets/icons/help.png" alt="Help" id="help-icon" />
			</button>
		</div>
		<h1 id="title">SQUIRDLE</h1>
		<div id="right-container" class="button-container">
			<button id="settings" @click="$refs['settings-modal'].openModal">
				<img src="@/assets/icons/user.png" alt="User" id="user-icon" />
			</button>
			<button id="settings" @click="$refs['settings-modal'].openModal">
				<img
					src="@/assets/icons/settings.png"
					alt="Settings"
					id="settings-icon"
				/>
			</button>
		</div>
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
	background: $main-color;
	max-width: 100vw;
	height: $navbar-height;
	border-bottom: 2px solid $accent-color;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 16px;
	// Overlap dropdown overlay
	z-index: $modal;

	.button-container {
		width: 75px;
        display: flex;
        justify-content: flex-start;

		button {
			background: transparent;
			border: none;
			cursor: pointer;

			img {
				height: 24px;
				width: 24px;
			}
		}
	}

    #right-container {
        justify-content: flex-end;
    }

	#title {
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
