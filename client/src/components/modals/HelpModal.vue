<template>
	<Modal id="help-modal" ref="help-modal" modalID="help-modal">
		<div id="help">
			<h2 id="help-header">HOW TO PLAY</h2>
			<p class="help-text">
				Guess the <strong>SQUIRDLE</strong> in 6 tries
				<br />
				(hint: it's probably <em>not</em> Squirtle)
				<br />
				<br />
				Each guess must be a valid Pokémon.
				<br />
				<br />
				After each guess, the color of the tiles will change to show how
				close your guess was.
			</p>
			<hr />
			<p class="help-text"><strong>Examples:</strong></p>
			<br />
			<div class="tile-container">
				<div class="tile">
					<img
						src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/bulbasaur.png"
						alt="Box Sprite"
                        class="demo-sprite"
					/>
				</div>
				<div class="tile hint">I</div>
				<div class="tile">
					<img
						src="https://www.serebii.net/pokedex-bw/type/grass.gif"
						alt="Type 1 Plaque"
					/><img
						src="https://www.serebii.net/pokedex-bw/type/poison.gif"
						alt="Type 2 Plaque"
					/>
				</div>
				<div class="tile">I</div>
				<div class="tile"><p class="color-text">GREEN</p></div>
			</div>
			<p class="help-text">The Pokémon's generation is within 1.</p>
			<br />
			<div class="tile-container">
				<div class="tile">
					<img
						src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/charmander.png"
						alt="Box Sprite"
                        class="demo-sprite"
					/>
				</div>
				<div class="tile">I</div>
				<div class="tile hint">
					<img
						src="https://www.serebii.net/pokedex-bw/type/fire.gif"
						alt="Type 1 Plaque"
					/>
				</div>
				<div class="tile">I</div>
				<div class="tile"><p class="color-text">RED</p></div>
			</div>
			<p class="help-text">The Pokémon's type is partially correct.</p>
			<br />
			<div class="tile-container">
				<div class="tile correct">
					<img
						src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/squirtle.png"
						alt="Box Sprite"
                        class="demo-sprite"
					/>
				</div>
				<div class="tile correct">I</div>
				<div class="tile correct">
					<img
						src="https://www.serebii.net/pokedex-bw/type/water.gif"
						alt="Type 1 Plaque"
					/>
				</div>
				<div class="tile correct">I</div>
				<div class="tile correct"><p class="color-text">BLUE</p></div>
			</div>
			<p class="help-text">The Pokémon is Squirtle!</p>
		</div>
	</Modal>
</template>

<script>
// Import global component
import Modal from "@/components/global/Modal.vue";

export default {
	name: "HelpModal",
	components: {
		Modal,
	},
	methods: {
		openModal: function () {
			this.$refs["help-modal"].openModal();
		},
	},
};
</script>

<style lang="scss" scoped>
#help {
	height: 100%;
	width: 100%;

	#help-header {
		font-family: $alt-font;
		line-height: 1.5rem;
		font-size: 1.5rem;
		letter-spacing: 2px;
		color: white;
		text-decoration: underline;
		margin-bottom: 16px;
	}

	.help-text {
		color: white;
	}

	hr {
		display: block;
		margin: 12px 0;
		height: 1px;
		background: white;
		border: none;
	}

	.tile-container {
		display: flex;
		justify-content: space-between;
		margin: 0 auto;
		width: 70%;
		margin-bottom: 8px;

		.tile {
			border: 1px solid $tile-color;
			height: 45px;
			width: 45px;
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: center;
			font-size: 1.5rem;
			color: white;
			line-height: 45px;
            font-family: $alt-font;

            .demo-sprite {
                margin-top: -30px;
            }

			.color-text {
				font-size: 0.7rem;
			}
		}

		.hint {
			border: none;
			background: $hint-color;
		}

		.correct {
			border: none;
			background: $correct-color;
		}
	}
}
</style>
