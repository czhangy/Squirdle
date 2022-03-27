<template>
	<Modal id="settings-modal" ref="settings-modal" modalID="settings-modal">
		<div id="settings">
			<div id="main-page" class="page show display">
				<h2 id="settings-header">SETTINGS</h2>
				<div class="setting">
					<p class="settings-text">Light Mode</p>
					<ToggleSwitch :onClick="toggleLightMode" />
				</div>
				<div class="setting">
					<p class="settings-text">Hard Mode</p>
					<ToggleSwitch :onClick="toggleHardMode" />
				</div>
				<div id="settings-buttons">
					<div id="buttons-row">
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
					<button
						id="feedback-button"
						class="settings-button"
						@click="setPage('main-page', 'feedback-page')"
					>
						SEND FEEDBACK
					</button>
				</div>
			</div>
			<div id="feedback-page" class="page right-page">
				<button
					id="back-button"
					@click="setPage('feedback-page', 'main-page')"
				>
					←
				</button>
				<FeedbackForm />
			</div>
		</div>
	</Modal>
</template>

<script>
// Vuex for settings persistence
import { mapMutations, mapGetters } from "vuex";

// Import global components
import Modal from "@/components/global/Modal.vue";
import ToggleSwitch from "@/components/global/ToggleSwitch.vue";
import FeedbackForm from "@/components/global/FeedbackForm.vue";

export default {
	name: "SettingsModal",
	components: {
		Modal,
		ToggleSwitch,
		FeedbackForm,
	},
	methods: {
		// Map Vuex functions for mode toggle
		...mapMutations(["setLightMode", "setHardMode"]),
		// Modal controls
		openModal: function () {
			this.$refs["settings-modal"].openModal();
		},
		closeModal: function () {
			this.$refs["settings-modal"].closeModal();
		},
		// Toggle switch controls
		toggleLightMode: function () {
			const toggle = document.getElementsByClassName("toggle-switch")[0];
			// Toggle state
			this.setLightMode(!this.lightMode);
			// Change toggle switch display
			if (this.lightMode) toggle.classList.add("active");
			else toggle.classList.remove("active");
		},
		toggleHardMode: function () {
			const toggle = document.getElementsByClassName("toggle-switch")[1];
			// Toggle state
			this.setHardMode(!this.hardMode);
			// Change toggle switch display
			if (this.hardMode) toggle.classList.add("active");
			else toggle.classList.remove("active");
		},
		// Initializes toggle switches to stored position
		initToggleSwitches: function () {
			const toggles = document.getElementsByClassName("toggle-switch");
			// Use local storage since Vuex isn't updated at mount
			if (localStorage.lightMode && JSON.parse(localStorage.lightMode))
				toggles[0].classList.add("active");
			if (localStorage.hardMode && JSON.parse(localStorage.hardMode))
				toggles[1].classList.add("active");
		},
		// Handle share button click
		handleShare: function () {
			// Show confirmation text
			document.getElementById("share-text").style.opacity = "1";
			// Copy share text to clipboard
			return navigator.clipboard.writeText(
				`I've caught ${
					localStorage.caught
						? JSON.parse(localStorage.caught).length
						: 0
				} Pokémon in Squirdle!\nTry it out yourself here: https://squirdle.herokuapp.com`
			);
		},
		// Handle page nav
		setPage: function (oldID, newID) {
			const curPage = document.getElementById(oldID);
			// Fade out
			curPage.classList.remove("show");
			// Move to correct side
			if (oldID === "main-page") curPage.classList.add("left-page");
			else curPage.classList.add("right-page");
			setTimeout(() => {
				// Remove from flow
				curPage.classList.remove("display");
				const newPage = document.getElementById(newID);
				// Add to flow and fade in
				newPage.classList.add("display");
				setTimeout(() => {
					newPage.classList.add("show");
					// Remove from prior side
					if (newID === "feedback-page")
						newPage.classList.remove("right-page");
					else newPage.classList.remove("left-page");
				}, 50);
			}, 250);
		},
	},
	computed: {
		// Map Vuex functions for mode checking
		...mapGetters(["lightMode", "hardMode"]),
	},
	watch: {
		// Light mode styling on toggle
		lightMode: function () {
			this.$updateLightMode("#settings");
		},
	},
	mounted: function () {
		this.initToggleSwitches();
		this.$updateLightMode("#settings");
	},
};
</script>

<style lang="scss" scoped>
#settings {
	height: 100%;
	width: 100%;
	color: $accent-color;
	position: relative;

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
		margin-top: 48px;

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
			cursor: pointer;
		}

		#buttons-row {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;

			#profile-button {
				width: 190px;
				text-decoration: none;
			}

			#share-button {
				width: 150px;
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
		}

		#feedback-button {
			width: 100%;
		}
	}

	#back-button {
		position: absolute;
		top: 0;
		left: 0;
		background: none;
		border: none;
		color: $accent-color;
		font-size: 1.2rem;
		line-height: 1.2rem;
		cursor: pointer;
	}

	.page {
		display: none;
		transition: all 0.25s ease;
		opacity: 0;
	}

	.left-page {
		transform: translateX(-30px);
	}

	.right-page {
		transform: translateX(30px);
	}

	.show {
		opacity: 1;
	}

	.display {
		display: block;
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

	#back-button {
		color: $light-accent-color;
	}
}

// Sticky hover
@media (hover: hover) {
	#settings {
		#settings-buttons {
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
	}

	#settings.light-mode {
		#settings-buttons {
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
}
</style>
