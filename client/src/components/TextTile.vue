<template>
	<div class="text-tile"></div>
</template>

<script>
export default {
	name: "TextTile",
};
</script>

<style lang="scss" scoped>
.text-tile {
	// Tile sizing
	box-sizing: border-box;
	height: 65px;
	width: 65px;
	// Border
	border: 1px solid $accent-color;
	// Centering
	justify-self: center;
}
</style>
