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
// Vuex for light mode
import { mapGetters } from "vuex";

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
		// Pop up help modal on site's first visit
		createPopup: function () {
			// Check if the local storage contains a completed game
			if (!localStorage.seen)
				setTimeout(() => {
					this.openHelpModal();
				}, 500);
		},
	},
	computed: {
		// Map Vuex function for light mode
		...mapGetters(["lightMode"]),
	},
	watch: {
		// Light mode styling on toggle
		lightMode: function () {
			this.$updateLightMode("#navbar");
		},
	},
	mounted: function () {
		this.createPopup();
		this.$updateLightMode("#navbar");
	},
};
</script>

<style lang="scss" scoped>
#navbar {
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
		font-size: 2rem;
		line-height: 2rem;
		letter-spacing: 5px;

		#home-link {
			color: $accent-color;
			text-decoration: none;
		}
	}
}

#navbar.light-mode {
	border-bottom: 2px solid $light-accent-color;

	.button-container > .nav-button > .button-icon {
		filter: invert(100%);
	}

	#site-title > #home-link {
		color: $light-accent-color;
	}
}

// Mobile design
@media screen and (max-width: $mobile) {
	#navbar > #site-title {
		line-height: 2rem;
		letter-spacing: 0;
	}
}
</style>
