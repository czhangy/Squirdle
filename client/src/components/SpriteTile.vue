<template>
	<div class="sprite-tile"></div>
</template>

<script>
export default {
	name: "SpriteTile",
};
</script>

<style lang="scss" scoped>
.sprite-tile {
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
