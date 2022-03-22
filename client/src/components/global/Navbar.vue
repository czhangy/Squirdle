<template>
	<div id="navbar">
		<HelpModal ref="help-modal" />
		<PreviewModal ref="preview-modal" />
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
		<h1 id="site-title"><a href="/" id="home-link">SQUIRDLE</a></h1>
		<div id="right-container" class="button-container">
			<button
				id="user-button"
				class="nav-button"
				@click="openPreviewModal"
			>
				<img
					src="@/assets/icons/preview.png"
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
import PreviewModal from "@/components/modals/PreviewModal.vue";
import SettingsModal from "@/components/modals/SettingsModal.vue";

export default {
	name: "Navbar",
	components: {
		HelpModal,
		PreviewModal,
		SettingsModal,
	},
	methods: {
		// Modal controls
		openHelpModal: function () {
			this.$refs["help-modal"].openModal();
		},
		openPreviewModal: function () {
			this.$refs["preview-modal"].openModal();
		},
		openSettingsModal: function () {
			this.$refs["settings-modal"].openModal();
		},
	},
	mounted: function () {
		// Automatically pop up how to play on game screen on first play
		if (JSON.parse(localStorage.seen).length === 0)
			setTimeout(() => {
				this.openHelpModal();
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
		width: 80px;
		display: flex;
		justify-content: flex-start;

		.nav-button {
			background: transparent;
			border: none;
			cursor: pointer;

			.button-icon {
				width: 24px;
			}
		}
	}

	#right-container {
		// Right align
		justify-content: space-between;
	}

	#site-title {
		font-family: $alt-font;
		font-weight: bold;
		font-size: 3rem;
		line-height: 3rem;
		letter-spacing: 3px;

		#home-link {
			color: $accent-color;
			text-decoration: none;
		}
	}
}

// Mobile design
@media screen and (max-width: $mobile) {
	#navbar > #site-title {
		font-size: 2rem;
		line-height: 2rem;
		letter-spacing: 0;
	}
}
</style>
