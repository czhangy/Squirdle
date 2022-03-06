<template>
	<div id="settings">
		<h2 id="settings-header">SETTINGS</h2>
		<p class="settings-text">
			lol imagine if i had any settings to implement
		</p>
	</div>
</template>

<script>
export default {
	name: "Settings",
};
</script>

<style lang="scss" scoped>
#settings {
	// Sizing
	height: 100%;
	width: 100%;

	#settings-header {
		// Typography
		font-size: 1.5rem;
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
