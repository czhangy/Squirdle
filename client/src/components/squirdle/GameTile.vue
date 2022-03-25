<template>
	<div class="game-tile">
		<div class="game-tile-inner" :class="{rotated: rotated}">
			<div class="game-tile-front" />
			<div
				class="game-tile-back"
				:class="{ close: close, correct: correct }"
			>
				<p class="tile-text">{{ content }}</p>
				<div class="img-container">
					<img
						v-for="(src, i) in srcs"
						:key="i"
						:src="src"
						class="tile-img"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "GameTile",
	props: {
        // Content for text tiles
		content: {
			type: null,
			default: "",
		},
        // Src link(s) for image tiles
		srcs: {
			type: Array,
			default: [],
		},
        // If the tile contents are close to the target
		close: {
			type: Boolean,
			default: false,
		},
        // If the tile contents match the target
		correct: {
			type: Boolean,
			default: false,
		},
        // If the tile has been flipped over
        rotated: {
            type: Boolean,
            default: false,
        }
	},
};
</script>

<style lang="scss" scoped>
.game-tile {
	background-color: transparent;
	height: 65px;
	width: 65px;
	z-index: $tiles;

	.rotated {
		transform: rotateX(180deg);
	}

	.game-tile-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transition: transform 1s;
		transform-style: preserve-3d;

		.game-tile-front,
		.game-tile-back {
			position: absolute;
			width: 100%;
			height: 100%;
			// Hide back
			-webkit-backface-visibility: hidden;
			backface-visibility: hidden;
		}

		.game-tile-front {
			border: 1px solid $tile-color;
			box-sizing: border-box;
		}

		.game-tile-back {
			transform: rotateX(180deg);
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			background-color: $tile-color;

			.tile-text {
				font-size: 2rem;
				font-family: $alt-font;
				color: white;
			}

			.img-container {
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				height: 100%;
			}
		}

		.close {
			background-color: $close-color;
		}

		.correct {
			background-color: $correct-color;
		}
	}
}
</style>
