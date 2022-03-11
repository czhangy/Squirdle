<template>
	<Modal id="settings-modal" ref="settings-modal" modalID="settings-modal">
		<div id="settings">
			<h2 id="settings-header">SETTINGS</h2>
			<p class="settings-text">
				lol imagine if i had any settings to implement
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
		openModal: function () {
			this.$refs["settings-modal"].openModal();
		},
	},
};
</script>

<style lang="scss" scoped>
#settings {
	// Sizing
	height: 100%;
	width: 100%;

	#settings-header {
		// Typography
		font-family: $alt-font;
		font-size: 1.5rem;
		line-height: 1.5rem;
		letter-spacing: 2px;
		color: white;
		text-decoration: underline;
		// Spacing
		margin-bottom: 16px;
	}

	.settings-text {
		// Typography
		color: white;
	}
}
</style>
