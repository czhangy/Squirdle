<template>
	<div id="navbar">
		<HelpModal ref="help-modal" />
		<UserModal ref="user-modal" />
		<SettingsModal ref="settings-modal" />
		<div id="left-container" class="button-container">
			<button id="help-button" class="nav-button" @click="openHelpModal">
				<img
					src="@/assets/icons/help.png"
					alt="Help"
					id="help-icon"
					class="button-icon"
				/>
			</button>
		</div>
		<h1 id="site-title">SQUIRDLE</h1>
		<div id="right-container" class="button-container">
			<button
				id="user-button"
				class="nav-button"
				@click="openGameOverModal"
			>
				<img
					src="@/assets/icons/user.png"
					alt="User"
					id="user-icon"
					class="button-icon"
				/>
			</button>
			<button
				id="settings-button"
				class="nav-button"
				@click="openSettingsModal"
			>
				<img
					src="@/assets/icons/settings.png"
					alt="Settings"
					id="settings-icon"
					class="button-icon"
				/>
			</button>
		</div>
	</div>
</template>

<script>
// Import components
import HelpModal from "@/components/modals/HelpModal.vue";
import UserModal from "@/components/modals/UserModal.vue";
import SettingsModal from "@/components/modals/SettingsModal.vue";

export default {
	name: "Navbar",
	components: {
		HelpModal,
		UserModal,
		SettingsModal,
	},
	methods: {
		// Modal controls
		openHelpModal: function () {
			this.$refs["help-modal"].openModal();
		},
		openGameOverModal: function () {
			this.$refs["user-modal"].openModal();
		},
		openSettingsModal: function () {
			this.$refs["settings-modal"].openModal();
		},
	},
	mounted: function () {
		// Automatically pop up how to play on game screen
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

		.nav-button {
			background: transparent;
			border: none;
			cursor: pointer;

			.button-icon {
				height: 24px;
				width: 24px;
			}
		}
	}

	#right-container {
		// Right align
		justify-content: flex-end;
	}

	#site-title {
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
