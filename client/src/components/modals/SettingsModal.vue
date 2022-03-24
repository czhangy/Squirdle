<template>
	<Modal id="settings-modal" ref="settings-modal" modalID="settings-modal">
		<div id="settings">
			<h2 id="settings-header">SETTINGS</h2>
			<div class="setting">
				<p class="settings-text">Light Mode</p>
				<Slider :onClick="toggleLightMode" />
			</div>
			<div class="setting">
				<p class="settings-text">Hard Mode</p>
				<Slider :onClick="toggleHardMode" />
			</div>
			<div id="settings-buttons">
				<router-link
					to="/profile"
					id="profile-button"
					class="settings-button"
					@click="closeModal"
					>GO TO PROFILE</router-link
				>
				<button
					id="share-button"
					class="settings-button"
					@click="handleShare"
				>
					<img
						src="@/assets/icons/share.png"
						alt=""
						id="share-icon"
					/>
					SHARE
					<p id="share-text">Copied to clipboard!</p>
				</button>
			</div>
		</div>
	</Modal>
</template>

<script>
// Vuex for settings persistence
import { mapMutations, mapGetters } from "vuex";

// Import global components
import Modal from "@/components/global/Modal.vue";
import Slider from "@/components/global/Slider.vue";

export default {
	name: "SettingsModal",
	components: {
		Modal,
		Slider,
	},
	methods: {
		// Map Vuex functions for light/hard mode toggle
		...mapMutations(["setLightMode", "setHardMode"]),
		// Modal controls
		openModal: function () {
			this.$refs["settings-modal"].openModal();
		},
		closeModal: function () {
			this.$refs["settings-modal"].closeModal();
		},
		// Slider control
		toggleLightMode: function () {
			const slider = document.getElementsByClassName("slider")[0];
			// Toggle on
			if (!this.lightMode) {
				slider.classList.add("active");
				localStorage.setItem("lightMode", "true");
				this.setLightMode(true);
			} else {
				slider.classList.remove("active");
				localStorage.setItem("lightMode", "false");
				this.setLightMode(false);
			}
		},
		toggleHardMode: function () {
			const slider = document.getElementsByClassName("slider")[1];
			// Toggle on
			if (!this.hardMode) {
				slider.classList.add("active");
				localStorage.setItem("hardMode", "true");
				this.setHardMode(true);
			} else {
				slider.classList.remove("active");
				localStorage.setItem("hardMode", "false");
				this.setHardMode(false);
			}
		},
		// Initializes sliders to stored position
		initSliders: function () {
			const sliders = document.getElementsByClassName("slider");
			// Use local storage as Vuex isn't updated at mount
			if (JSON.parse(localStorage.lightMode))
				sliders[0].classList.add("active");
			if (JSON.parse(localStorage.hardMode))
				sliders[1].classList.add("active");
		},
		// Share site
		handleShare: function () {
			// Show text
			document.getElementById("share-text").style.opacity = "1";
			// Copy to clipboard
			return navigator.clipboard.writeText(
				`I've caught ${
					localStorage.caught
						? JSON.parse(localStorage.caught).length
						: 0
				} Pokémon in Squirdle!\nTry it out yourself here: https://squirdle.herokuapp.com`
			);
		},
	},
	computed: {
		// Map Vuex functions for light/hard mode checking
		...mapGetters(["lightMode", "hardMode"]),
	},
	watch: {
		lightMode: function () {
			this.$updateLightMode("#settings");
		},
	},
	mounted: function () {
		// Set sliders to initial position
		this.initSliders();
		this.$updateLightMode("#settings");
	},
};
</script>

<style lang="scss" scoped>
#settings {
	height: 100%;
	width: 100%;
	color: $accent-color;

	#settings-header {
		font-family: $alt-font;
		font-size: 1.5rem;
		line-height: 1.5rem;
		letter-spacing: 2px;
		text-decoration: underline;
		margin-bottom: 32px;
	}

	.setting {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 16px;

		.settings-text {
			text-align: left;
			letter-spacing: 1px;
			width: 30%;
		}
	}

	#settings-buttons {
		display: flex;
		justify-content: space-between;
		margin-top: 48px;

		#profile-button {
			width: 190px;
			text-decoration: none;
		}

		#share-button {
			width: 150px;
			cursor: pointer;
			position: relative;

			#share-icon {
				height: 24px;
				margin-right: 16px;
			}

			#share-text {
				font-size: 0.8rem;
				letter-spacing: 1px;
				position: absolute;
				top: -24px;
				font-family: $main-font;
				color: $accent-color;
				opacity: 0;
			}
		}

		.settings-button {
			color: $accent-color;
			height: 50px;
			font-family: $alt-font;
			font-size: 1.2rem;
			line-height: 1.2rem;
			background: transparent;
			border: 2px solid $accent-color;
			// Center button text
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}

#settings.light-mode {
	color: $light-accent-color;

	#settings-buttons {
		#share-button {
			#share-icon {
				filter: invert(100%);
			}

			#share-text {
				color: $light-accent-color;
			}
		}

		.settings-button {
			color: $light-accent-color;
			border-color: $light-accent-color;
		}
	}
}

// Sticky hover
@media (hover: hover) {
	#settings > #settings-buttons {
		.settings-button:hover {
			background: $accent-color;
			color: $main-color;
		}

		#share-button:hover {
			#share-icon {
				filter: invert(100%);
			}
		}
	}

	#settings.light-mode > #settings-buttons {
		.settings-button:hover {
			background: $light-accent-color;
			color: $light-main-color;
		}

		#share-button:hover {
			#share-icon {
				filter: none;
			}
		}
	}
}
</style>
