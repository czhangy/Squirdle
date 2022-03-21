<template>
	<div class="game-tile">
		<div class="game-tile-inner">
			<div class="game-tile-front" />
			<div class="game-tile-back">
				<img v-if="tileType === SPRITE" class="tile-sprite" alt="Box Sprite" />
                <p v-if="tileType === TEXT" class="tile-text" />
				<img
					v-if="tileType === MONOTYPE || tileType === DUALTYPE"
					class="monotype"
					alt="Type 1 Plaque"
				/>
				<img
					v-if="tileType === DUALTYPE"
					class="dualtype"
					alt="Type 2 Plaque"
				/>
			</div>
		</div>
	</div>
</template>

<script>
// Import global constants
import { SPRITE, TEXT, MONOTYPE, DUALTYPE } from "@/constants.js";

export default {
	name: "GameTile",
	props: {
		tileType: {
			type: Number,
			required: true,
		},
	},
    data() {
        return {
            // Global constants
            SPRITE,
            TEXT,
            MONOTYPE,
            DUALTYPE,
        };
    }
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
