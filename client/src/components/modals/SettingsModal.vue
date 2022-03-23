<template>
	<Modal id="settings-modal" ref="settings-modal" modalID="settings-modal">
		<div id="settings">
			<h2 id="settings-header">SETTINGS</h2>
			<p class="settings-text">
				lol imagine if i had any settings to implement
				<br />
				<br />
				Actual settings coming soon!
			</p>
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
// Import global components
import Modal from "@/components/global/Modal.vue";
import Slider from "@/components/global/Slider.vue";

export default {
	name: "SettingsModal",
	components: {
		Modal,
        Slider
	},
	methods: {
		// Modal controls
		openModal: function () {
			this.$refs["settings-modal"].openModal();
		},
		closeModal: function () {
			this.$refs["settings-modal"].closeModal();
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
};
</script>

<style lang="scss" scoped>
#settings {
	height: 100%;
	width: 100%;

	#settings-header {
		font-family: $alt-font;
		font-size: 1.5rem;
		line-height: 1.5rem;
		letter-spacing: 2px;
		color: $accent-color;
		text-decoration: underline;
		margin-bottom: 16px;
	}

	.settings-text {
		color: $accent-color;
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
			background: $main-color;
			border: 2px solid $accent-color;
			// Center button text
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}

// Sticky hover
@media (hover: hover) {
	#settings > #settings-buttons {
		.settings-button:hover {
			background: $accent-color;
			border: none;
			color: $main-color;
		}

		#share-button:hover {
			#share-icon {
				filter: invert(100%);
			}

			#share-text {
				// Negate bounce from border
				top: -22px;
			}
		}
	}
}
</style>
