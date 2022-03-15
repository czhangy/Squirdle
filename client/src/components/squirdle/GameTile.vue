<template>
	<div class="game-tile">
		<div class="game-tile-inner">
			<div class="game-tile-front" />
			<div class="game-tile-back">
				<img v-if="type === 'sprite'" class="sprite" alt="Box Sprite" />
				<img
					v-if="type === 'monotype' || type === 'dualtype'"
					class="monotype"
					alt="Type 1 Plaque"
				/>
				<img
					v-if="type === 'dualtype'"
					class="dualtype"
					alt="Type 2 Plaque"
				/>
				<p v-if="type === 'color'" class="text small-text"></p>
				<p v-if="type === 'text'" class="text"></p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "GameTile",
	props: {
		type: {
			type: String,
			default: "text",
		},
	},
};
</script>

<style lang="scss" scoped>
.game-tile {
	background-color: transparent;
	height: 65px;
	width: 65px;
    z-index: $default;

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

            .sprite {
                // Adjust for sprite
                margin-top: -12px;
            }

			.text {
				font-size: 2rem;
                font-family: $alt-font;
                color: white;
			}

			.small-text {
				font-size: 0.8rem;
				text-transform: uppercase;
			}
		}

		.hint {
			background-color: $hint-color;
		}

		.correct {
			background-color: $correct-color;
		}
	}
}
</style>
