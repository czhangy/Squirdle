<template>
	<div class="sprite-tile">
		<div class="sprite-tile-inner">
			<div class="sprite-tile-front" />
			<div class="sprite-tile-back">
				<img
					class="sprite"
					alt="Box Sprite"
				/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "SpriteTile",
};
</script>

<style lang="scss" scoped>
.sprite-tile {
	// 3D effects
	background-color: transparent;
	// Tile sizing
	height: 65px;
	width: 65px;

	.rotated {
		// Animate
		transform: rotateX(180deg);
	}

	.sprite-tile-inner {
		// Positioning
		position: relative;
		// Sizing
		width: 100%;
		height: 100%;
		// Animate
		transition: transform 0.8s;
		transform-style: preserve-3d;

		.sprite-tile-front,
		.sprite-tile-back {
			// Positioning
			position: absolute;
			// Sizing
			width: 100%;
			height: 100%;
			// Hide back
			-webkit-backface-visibility: hidden;
			backface-visibility: hidden;
		}

		.sprite-tile-front {
			// Border
			border: 1px solid $tile-color;
			box-sizing: border-box;
		}

		.sprite-tile-back {
			// Centering
            display: flex;
            justify-content: center;
            align-items: center;
            // Tile styling
            background-color: $tile-color;
			// Animate
			transform: rotateX(180deg);
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
