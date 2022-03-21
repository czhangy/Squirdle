<template>
	<Modal id="settings-modal" ref="settings-modal" modalID="settings-modal">
		<div id="settings">
			<h2 id="settings-header">SETTINGS</h2>
			<p class="settings-text">
				lol imagine if i had any settings to implement
			</p>
			<hr id="separator" />
            <a href="/profile" class="settings-button">GO TO PROFILE</a>
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
	}

	#separator {
		height: 2px;
		background: $accent-color;
		border: none;
		margin: 16px 0;
	}

    .settings-button {
        color: $main-color;
        text-decoration: none;
        padding: 16px;
        font-family: $alt-font;
        font-size: 1.2rem;
        line-height: 1.2rem;
        display: inline-block;
        background: $accent-color;
    }
}
</style>
