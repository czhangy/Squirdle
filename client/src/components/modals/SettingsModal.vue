<template>
	<Modal id="settings-modal" ref="settings-modal" modalID="settings-modal">
		<div id="settings">
			<h2 id="settings-header">SETTINGS</h2>
			<p class="settings-text">
				lol imagine if i had any settings to implement
			</p>
			<hr class="separator" />
			<p class="settings-text">Check me out at:</p>
			<div id="settings-links">
				<a
					href="https://github.com/czhangy"
					target="_blank"
					class="icon-link"
					><img
						src="@/assets/icons/github.png"
						alt="GitHub"
						class="social-icon"
				/></a>
				<a
					href="https://www.linkedin.com/in/charles-zhang-14746519b/"
					target="_blank"
					class="icon-link"
					><img
						src="@/assets/icons/linkedin.png"
						alt="LinkedIn"
						class="social-icon"
				/></a>
				<a href="https://czhangy.io" target="_blank" class="icon-link"
					><img
						src="@/assets/icons/personal-site.png"
						alt="Personal Site"
						class="social-icon"
				/></a>
			</div>
			<hr class="separator" />
			<p class="settings-text">
				This app was created with the help of
				<br />
				<a href="https://serebii.net" target="_blank" class="text-link"
					>Serebii</a
				>,
				<a href="https://pokeapi.co/" target="_blank" class="text-link"
					>PokéAPI</a
				>, and
				<a
					href="https://projectpokemon.org/home/"
					target="_blank"
					class="text-link"
					>Project Pokémon</a
				>
			</p>
		</div>
	</Modal>
</template>

<script>
// Import global component
import Modal from "@/components/global/Modal.vue";

export default {
	name: "SettingsModal",
	components: {
		Modal,
	},
	methods: {
		// Modal control
		openModal: function () {
			this.$refs["settings-modal"].openModal();
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

		.text-link {
			color: $accent-color;
		}
	}

	.separator {
		height: 2px;
		background: $accent-color;
		border: none;
		margin: 16px 0;
	}

	#settings-links {
		margin-top: 16px;
		display: flex;
		justify-content: space-evenly;

		.social-icon {
			height: 32px;
		}
	}
}
</style>
