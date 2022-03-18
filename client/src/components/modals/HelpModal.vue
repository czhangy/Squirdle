<template>
	<Modal id="help-modal" ref="help-modal" modalID="help-modal">
		<div id="help">
			<button
				v-if="page !== 0"
				@click="setPage(-1)"
				id="page-nav"
				class="left"
			>
				<i class="left arrow" />
			</button>
			<button
				v-if="page !== 4"
				@click="setPage(1)"
				id="page-nav"
				class="right"
			>
				<i class="right arrow" />
			</button>
			<div id="page" v-if="page === 0">
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
					After each guess, the color of the tiles will change to show
					how close your guess was.
				</p>
			</div>
			<div id="page" v-if="page === 1">
				<h2 id="help-header">EXAMPLES</h2>
				<div class="tile-container">
					<div class="tile">
						<img
							src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/bulbasaur.png"
							alt="Box Sprite"
							class="demo-sprite"
						/>
					</div>
					<div class="tile">I</div>
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
					<div class="tile"><p>9</p></div>
				</div>
				<p class="help-text">
					The mystery Pokémon is from a generation more than 1 away
					from your guess.
				</p>
				<br />
				<div class="tile-container">
					<div class="tile">
						<img
							src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/charmander.png"
							alt="Box Sprite"
							class="demo-sprite"
						/>
					</div>
					<div class="hint tile">I</div>
					<div class="tile">
						<img
							src="https://www.serebii.net/pokedex-bw/type/fire.gif"
							alt="Type 1 Plaque"
						/>
					</div>
					<div class="tile">I</div>
					<div class="tile"><p>10</p></div>
				</div>
				<p class="help-text">
					The mystery Pokémon is from a generation 1 away from your
					guess.
				</p>
				<br />
				<div class="tile-container">
					<div class="tile">
						<img
							src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/squirtle.png"
							alt="Box Sprite"
							class="demo-sprite"
						/>
					</div>
					<div class="correct tile">I</div>
					<div class="tile">
						<img
							src="https://www.serebii.net/pokedex-bw/type/water.gif"
							alt="Type 1 Plaque"
						/>
					</div>
					<div class="tile">I</div>
					<div class="tile">
						<p>8</p>
					</div>
				</div>
				<p class="help-text">The mystery Pokémon is from Gen 1!</p>
			</div>
			<div id="page" v-if="page === 2">
				<h2 id="help-header">EXAMPLES</h2>
				<div class="tile-container">
					<div class="tile">
						<img
							src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/bulbasaur.png"
							alt="Box Sprite"
							class="demo-sprite"
						/>
					</div>
					<div class="tile">I</div>
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
					<div class="tile"><p>9</p></div>
				</div>
				<p class="help-text">
					The mystery Pokémon's type doesn't match your guess.
				</p>
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
					<div class="hint tile">
						<img
							src="https://www.serebii.net/pokedex-bw/type/fire.gif"
							alt="Type 1 Plaque"
						/>
					</div>
					<div class="tile">I</div>
					<div class="tile"><p>10</p></div>
				</div>
				<p class="help-text">
					The mystery Pokémon's type partially matches your guess.
				</p>
				<br />
				<div class="tile-container">
					<div class="tile">
						<img
							src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/squirtle.png"
							alt="Box Sprite"
							class="demo-sprite"
						/>
					</div>
					<div class="tile">I</div>
					<div class="correct tile">
						<img
							src="https://www.serebii.net/pokedex-bw/type/water.gif"
							alt="Type 1 Plaque"
						/>
					</div>
					<div class="tile">I</div>
					<div class="tile">
						<p>8</p>
					</div>
				</div>
				<p class="help-text">The mystery Pokémon is a Water type!</p>
			</div>
			<div id="page" v-if="page === 3">
				<h2 id="help-header">EXAMPLES</h2>
				<div class="tile-container">
					<div class="tile">
						<img
							src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/bulbasaur.png"
							alt="Box Sprite"
							class="demo-sprite"
						/>
					</div>
					<div class="tile">I</div>
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
					<div class="tile"><p>9</p></div>
				</div>
				<p class="help-text">
					The mystery Pokémon's evolution stage is more than 1 away
					from your guess.
				</p>
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
					<div class="tile">
						<img
							src="https://www.serebii.net/pokedex-bw/type/fire.gif"
							alt="Type 1 Plaque"
						/>
					</div>
					<div class="hint tile">I</div>
					<div class="tile"><p>10</p></div>
				</div>
				<p class="help-text">
					The mystery Pokémon's evolution stage is 1 away from your
					guess.
				</p>
				<br />
				<div class="tile-container">
					<div class="tile">
						<img
							src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/squirtle.png"
							alt="Box Sprite"
							class="demo-sprite"
						/>
					</div>
					<div class="tile">I</div>
					<div class="tile">
						<img
							src="https://www.serebii.net/pokedex-bw/type/water.gif"
							alt="Type 1 Plaque"
						/>
					</div>
					<div class="correct tile">I</div>
					<div class="tile">
						<p>8</p>
					</div>
				</div>
				<p class="help-text">The mystery Pokémon is in Stage 1!</p>
			</div>
			<div id="page" v-if="page === 4">
				<h2 id="help-header">EXAMPLES</h2>
				<div class="tile-container">
					<div class="tile">
						<img
							src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/bulbasaur.png"
							alt="Box Sprite"
							class="demo-sprite"
						/>
					</div>
					<div class="tile">I</div>
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
					<div class="tile"><p>9</p></div>
				</div>
				<p class="help-text">
					The length of the mystery Pokémon's name is more than 2 away
					from your guess.
				</p>
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
					<div class="tile">
						<img
							src="https://www.serebii.net/pokedex-bw/type/fire.gif"
							alt="Type 1 Plaque"
						/>
					</div>
					<div class="hint tile">I</div>
					<div class="tile"><p>10</p></div>
				</div>
				<p class="help-text">
					The length of the mystery Pokémon's name is within 2 of your
					guess.
				</p>
				<br />
				<div class="tile-container">
					<div class="tile">
						<img
							src="https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/squirtle.png"
							alt="Box Sprite"
							class="demo-sprite"
						/>
					</div>
					<div class="tile">I</div>
					<div class="tile">
						<img
							src="https://www.serebii.net/pokedex-bw/type/water.gif"
							alt="Type 1 Plaque"
						/>
					</div>
					<div class="correct tile">I</div>
					<div class="tile">
						<p>8</p>
					</div>
				</div>
				<p class="help-text">
					The mystery Pokémon's name is 8 letters long!
				</p>
			</div>
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
	data() {
		return {
			page: 0,
		};
	},
	methods: {
		openModal: function () {
			this.$refs["help-modal"].openModal();
		},
		// Page control
		setPage: function (inc) {
			this.page += inc;
		},
	},
};
</script>

<style lang="scss" scoped>
#help {
	height: 100%;
	width: 100%;

	#page-nav {
		background: none;
		border: none;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;

		.arrow {
			border: solid white;
			border-width: 0 3px 3px 0;
			display: inline-block;
			// Arrow sizing
			padding: 8px;
		}
	}

	.left {
		left: 16px;
		transform: rotate(135deg);
		-webkit-transform: rotate(135deg);
	}

	.right {
		right: 16px;
		transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg);
	}

	#page {
		padding: 0 20px;

		#help-header {
			font-family: $alt-font;
			line-height: 1.5rem;
			font-size: 1.5rem;
			letter-spacing: 2px;
			color: white;
			text-decoration: underline;
			margin-bottom: 32px;
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
			margin: 8px auto;
			width: 77.5%;

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

		.help-text {
			color: white;
			font-size: 0.9rem;
		}
	}
}
</style>
