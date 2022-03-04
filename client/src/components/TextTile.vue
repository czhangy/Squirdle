<template>
	<div class="text-tile">
		<div class="text-tile-inner">
			<div class="text-tile-front" />
			<div class="text-tile-back">
                <p class="text"></p>
            </div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TextTile",
};
</script>

<style lang="scss" scoped>
.text-tile {
    // 3D effects
	background-color: transparent;
	// Tile sizing
	height: 65px;
	width: 65px;

	.rotated {
        // Animate
		transform: rotateX(180deg);
	}

	.text-tile-inner {
		// Positioning
		position: relative;
		// Sizing
		width: 100%;
		height: 100%;
		// Animate
		transition: transform 0.8s;
		transform-style: preserve-3d;

		.text-tile-front,
		.text-tile-back {
            // Positioning
            position: absolute;
			// Sizing
			width: 100%;
			height: 100%;
			// Hide back
			-webkit-backface-visibility: hidden;
			backface-visibility: hidden;
		}

		.text-tile-front {
			// Border
			border: 1px solid $tile-color;
			box-sizing: border-box;
		}

        .text-tile-back {
            // Animate
            transform: rotateX(180deg);
            // Centering
            display: flex;
            justify-content: center;
            align-items: center;
            // Tile styling
            background-color: $tile-color;
            // Typography
            font-size: 2rem;
            color: white;
            font-weight: bold;

        }

        .hint {
            // Tile styling
            background-color: $hint-color;
        }

        .correct {
            // Tile styling
            background-color: $correct-color;
        }
	}
}
</style>
