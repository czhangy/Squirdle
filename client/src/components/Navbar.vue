<template>
	<div id="navbar">
		<button id="help">
			<img src="@/assets/icons/help.png" alt="Help" id="help-icon" />
		</button>
		<h1 id="title">SQUIRDLE</h1>
		<button id="settings">
			<img
				src="@/assets/icons/settings.png"
				alt="Settings"
				id="settings-icon"
			/>
		</button>
	</div>
</template>

<script>
export default {
	name: "Navbar",
};
</script>

<style lang="scss" scoped>
#navbar {
	// Bar styling
	background: $main-color;
	// Sizing
	max-width: 100vw;
	height: $navbar-height;
	// Border
	border-bottom: 2px solid $accent-color;
	// Layout
	display: flex;
	justify-content: space-between;
	align-items: center;
	// Spacing
	padding: 0 16px;

	button {
		// Remove default styling
		background: transparent;
		border: none;
		// Clickable
		cursor: pointer;

        img {
            // Icon sizing
            height: 24px;
            width: 24px;
        }
	}

	#title {
		// Typography
		color: $accent-color;
		font-weight: bold;
		font-size: 3rem;
		letter-spacing: 3px;
	}
}

// Mobile design
@media screen and (max-width: 600px) {
	#navbar > #title {
		font-size: 2rem;
	}
}
</style>