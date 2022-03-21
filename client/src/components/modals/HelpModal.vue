<template>
	<Modal id="help-modal" ref="help-modal" modalID="help-modal">
		<div id="help">
			<button
				v-if="page !== 1"
				@click="setPage(-1)"
				class="page-nav left-nav"
			>
				<i class="left-arrow nav-arrow" />
			</button>
			<button
				v-if="page !== 5"
				@click="setPage(1)"
				class="page-nav right-nav"
			>
				<i class="right-arrow nav-arrow" />
			</button>
			<div id="page-1" class="page show display">
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
			<div id="page-2" class="page right-page">
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
					<div class="tile">9</div>
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
					<div class="tile">10</div>
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
					<div class="tile">8</div>
				</div>
				<p class="help-text">The mystery Pokémon is from Gen 1!</p>
			</div>
			<div id="page-3" class="page right-page">
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
					<div class="tile">9</div>
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
					<div class="tile">10</div>
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
					<div class="tile">8</div>
				</div>
				<p class="help-text">The mystery Pokémon is a Water type!</p>
			</div>
			<div id="page-4" class="page right-page">
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
					<div class="tile">9</div>
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
					<div class="tile">8</div>
				</div>
				<p class="help-text">The mystery Pokémon is in Stage 1!</p>
			</div>
			<div id="page-5" class="page right-page">
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
					<div class="tile">10</div>
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
					<div class="tile">8</div>
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
			page: 1,
		};
	},
	methods: {
        // Modal control
		openModal: function () {
			this.$refs["help-modal"].openModal();
		},
		// Page control
		setPage: function (inc) {
			this.page += inc;
			const curPage = document.getElementById(`page-${this.page - inc}`);
			// Fade out
			curPage.classList.remove("show");
			// Move to correct side
			if (inc > 0) curPage.classList.add("left-page");
			else curPage.classList.add("right-page");
			setTimeout(() => {
				// Remove from flow
				curPage.classList.remove("display");
				const newPage = document.getElementById(`page-${this.page}`);
				// Add to flow and fade in
				newPage.classList.add("display");
				setTimeout(() => {
					newPage.classList.add("show");
					// Remove from prior side
					if (inc > 0) newPage.classList.remove("right-page");
					else newPage.classList.remove("left-page");
				}, 50);
			}, 250);
		},
	},
};
</script>

<style lang="scss" scoped>
#help {
	height: 100%;
	width: 100%;

	.page-nav {
		background: none;
		border: none;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;

		.nav-arrow {
			border: solid $accent-color;
			border-width: 0 3px 3px 0;
			display: inline-block;
			// Arrow sizing
			padding: 8px;
		}

		.left-arrow {
			transform: rotate(135deg);
			-webkit-transform: rotate(135deg);
		}

		.right-arrow {
			transform: rotate(-45deg);
			-webkit-transform: rotate(-45deg);
		}
	}

	.left-nav {
		left: 16px;
	}

	.right-nav {
		right: 16px;
	}

	.page {
		width: 80%;
		margin: 0 auto;
		transition: all 0.25s ease;
		opacity: 0;
		display: none;

		#help-header {
			font-family: $alt-font;
			line-height: 1.5rem;
			font-size: 1.5rem;
			letter-spacing: 2px;
			color: $accent-color;
			text-decoration: underline;
			margin-bottom: 32px;
		}

		.separator {
			display: block;
			margin: 12px 0;
			height: 1px;
			background: $accent-color;
			border: none;
		}

		.tile-container {
			display: flex;
			justify-content: space-between;
			margin: 8px auto;
			width: 85%;

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
			color: $accent-color;
			font-size: 0.9rem;
		}
	}

	.left-page {
		transform: translateX(-30px);
	}

	.right-page {
		transform: translateX(30px);
	}

	.show {
		opacity: 1;
	}

	.display {
		display: block;
	}
}
</style>
