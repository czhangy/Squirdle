<template>
	<div id="medals">
		<Medal v-for="(medal, i) in medals" :key="i" :medal="medal" />
	</div>
</template>

<script>
// Import local components
import Medal from "@/components/profile/Medal.vue";

export default {
	name: "Medals",
	components: {
		Medal,
	},
	props: {
		caught: {
			type: Array,
			required: true,
		},
		seen: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			medals: [
                {
					title: "COLLECTOR",
					desc: "Catch 50 Pokémon",
					type: "bronze",
				},
                {
					title: "ASH KETCHUM",
					desc: "Catch 200 Pokémon",
					type: "silver",
				},
                {
					title: "POKÉMON MASTER",
					desc: "Complete the Pokédex",
					type: "gold",
				},
                {
					title: "RESEARCHER",
					desc: "See 50 Pokémon",
					type: "bronze",
				},
                {
					title: "WORLD TRAVELER",
					desc: "See 200 Pokémon",
					type: "silver",
				},
                {
					title: "POKÉMON PROFESSOR",
					desc: "See every Pokémon",
					type: "gold",
				},
				{
					title: "CATCHING SPREE",
					desc: "Achieve a streak of 10",
					type: "bronze",
				},
                {
					title: "TRAINER BARRY",
					desc: "Achieve a streak of 25",
					type: "silver",
				},
                {
					title: "TOWER TYCOON PALMER",
					desc: "Achieve a streak of 50",
					type: "gold",
				},
                {
					title: "CHAMPION BLUE",
					desc: "Capture all Kanto Pokémon",
					type: "gold",
				},
                {
					title: "CHAMPION LANCE",
					desc: "Capture all Johto Pokémon",
					type: "gold",
				},
                {
					title: "CHAMPION STEVEN",
					desc: "Capture all Hoenn Pokémon",
					type: "gold",
				},
                {
					title: "CHAMPION CYNTHIA",
					desc: "Capture all Sinnoh Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER WHITNEY",
					desc: "Capture 25 Normal-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER ERIKA",
					desc: "Capture 25 Grass-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER BLAINE",
					desc: "Capture 25 Fire-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER MISTY",
					desc: "Capture 25 Water-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER LT. SURGE",
					desc: "Capture 25 Electric-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER GIOVANNI",
					desc: "Capture 25 Ground-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER PRYCE",
					desc: "Capture 25 Ice-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER FALKNER",
					desc: "Capture 25 Flying-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER BROCK",
					desc: "Capture 25 Rock-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER BYRON",
					desc: "Capture 25 Steel-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER CHUCK",
					desc: "Capture 25 Fighting-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER MORTY",
					desc: "Capture 25 Ghost-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER MARNIE",
					desc: "Capture 25 Dark-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER SABRINA",
					desc: "Capture 25 Psychic-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER KOGA",
					desc: "Capture 25 Poison-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER CLAIRE",
					desc: "Capture 25 Dragon-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER VALERIE",
					desc: "Capture 25 Fairy-type Pokémon",
					type: "gold",
				},
                {
					title: "GYM LEADER BUGSY",
					desc: "Capture 25 Bug-type Pokémon",
					type: "gold",
				},
                {
					title: "YOUNGSTER JOEY",
					desc: "Capture a Rattata",
					type: "gold",
				},
			],
		};
	},
};
</script>

<style lang="scss" scoped>
#medals {
	margin: 0 auto;
	margin-top: 10px;
	width: 350px;
	height: 350px;
	overflow-y: scroll;
}

::-webkit-scrollbar {
	// Disable scrollbar
	display: none;
}
</style>
