<template>
	<div id="medals">
		<Medal
			v-for="(medal, i) in medals"
			:key="i"
			:obtained="obtained[i]"
			:medal="medal"
		/>
	</div>
</template>

<script>
// Vuex for light mode
import { mapGetters } from "vuex";

// Import local components
import Medal from "@/components/profile/Medal.vue";

export default {
	name: "Medals",
	components: {
		Medal,
	},
	props: {
        // Dex indices of all caught Pokemon
		caught: {
			type: Array,
			required: true,
		},
        // Dex indices of all seen Pokemon
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
					title: "RIVAL BARRY",
					desc: "Achieve a streak of 25",
					type: "silver",
				},
				{
					title: "TOWER TYCOON PALMER",
					desc: "Achieve a streak of 50",
					type: "gold",
				},
				{
					title: "PLAIN BADGE",
					desc: "Capture 25 Normal-type Pokémon",
					type: "gold",
				},
				{
					title: "RAINBOW BADGE",
					desc: "Capture 25 Grass-type Pokémon",
					type: "gold",
				},
				{
					title: "VOLCANO BADGE",
					desc: "Capture 25 Fire-type Pokémon",
					type: "gold",
				},
				{
					title: "CASCADE BADGE",
					desc: "Capture 25 Water-type Pokémon",
					type: "gold",
				},
				{
					title: "THUNDER BADGE",
					desc: "Capture 25 Electric-type Pokémon",
					type: "gold",
				},
				{
					title: "EARTH BADGE",
					desc: "Capture 25 Ground-type Pokémon",
					type: "gold",
				},
				{
					title: "GLACIER BADGE",
					desc: "Capture 25 Ice-type Pokémon",
					type: "gold",
				},
				{
					title: "ZEPHYR BADGE",
					desc: "Capture 25 Flying-type Pokémon",
					type: "gold",
				},
				{
					title: "BOULDER BADGE",
					desc: "Capture 25 Rock-type Pokémon",
					type: "gold",
				},
				{
					title: "MINERAL BADGE",
					desc: "Capture 25 Steel-type Pokémon",
					type: "gold",
				},
				{
					title: "STORM BADGE",
					desc: "Capture 25 Fighting-type Pokémon",
					type: "gold",
				},
				{
					title: "FOG BADGE",
					desc: "Capture 25 Ghost-type Pokémon",
					type: "gold",
				},
				{
					title: "DARK BADGE",
					desc: "Capture 25 Dark-type Pokémon",
					type: "gold",
				},
				{
					title: "MARSH BADGE",
					desc: "Capture 25 Psychic-type Pokémon",
					type: "gold",
				},
				{
					title: "SOUL BADGE",
					desc: "Capture 25 Poison-type Pokémon",
					type: "gold",
				},
				{
					title: "RISING BADGE",
					desc: "Capture 25 Dragon-type Pokémon",
					type: "gold",
				},
				{
					title: "FAIRY BADGE",
					desc: "Capture 25 Fairy-type Pokémon",
					type: "gold",
				},
				{
					title: "HIVE BADGE",
					desc: "Capture 25 Bug-type Pokémon",
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
					title: "YOUNGSTER JOEY",
					desc: "Capture a Rattata",
					type: "gold",
				},
			],
			obtained: [],
		};
	},
	methods: {
        // Checks requirements for each medal
		checkMedalReqs: function () {
			// Catch total medals
			if (localStorage.caught) {
				const caught = JSON.parse(localStorage.caught);
				if (caught.length >= 50) this.obtained[0] = true;
				if (caught.length >= 200) this.obtained[1] = true;
				if (caught.length === 493) this.obtained[2] = true;
			}
			// Seen total medals
			if (localStorage.seen) {
				const seen = JSON.parse(localStorage.seen);
				if (seen.length >= 50) this.obtained[3] = true;
				if (seen.length >= 200) this.obtained[4] = true;
				if (seen.length === 493) this.obtained[5] = true;
			}
			// Streak medals
			if (localStorage.maxStreak) {
				if (localStorage.maxStreak >= 10) this.obtained[6] = true;
				if (localStorage.maxStreak >= 25) this.obtained[7] = true;
				if (localStorage.maxStreak === 50) this.obtained[8] = true;
			}
			// Type medals
			if (
				localStorage.normal &&
				JSON.parse(localStorage.normal).length >= 25
			)
				this.obtained[9] = true;
			if (
				localStorage.grass &&
				JSON.parse(localStorage.grass).length >= 25
			)
				this.obtained[10] = true;
			if (localStorage.fire && JSON.parse(localStorage.fire).length >= 25)
				this.obtained[11] = true;
			if (
				localStorage.water &&
				JSON.parse(localStorage.water).length >= 25
			)
				this.obtained[12] = true;
			if (
				localStorage.electric &&
				JSON.parse(localStorage.electric).length >= 25
			)
				this.obtained[13] = electric;
			if (
				localStorage.ground &&
				JSON.parse(localStorage.ground).length >= 25
			)
				this.obtained[14] = true;
			if (localStorage.ice && JSON.parse(localStorage.ice).length >= 25)
				this.obtained[15] = true;
			if (
				localStorage.flying &&
				JSON.parse(localStorage.flying).length >= 25
			)
				this.obtained[16] = true;
			if (localStorage.rock && JSON.parse(localStorage.rock).length >= 25)
				this.obtained[17] = true;
			if (
				localStorage.steel &&
				JSON.parse(localStorage.steel).length >= 25
			)
				this.obtained[18] = true;
			if (
				localStorage.fighting &&
				JSON.parse(localStorage.fighting).length >= 25
			)
				this.obtained[19] = true;
			if (
				localStorage.ghost &&
				JSON.parse(localStorage.ghost).length >= 25
			)
				this.obtained[20] = true;
			if (localStorage.dark && JSON.parse(localStorage.dark).length >= 25)
				this.obtained[21] = true;
			if (
				localStorage.psychic &&
				JSON.parse(localStorage.psychic).length >= 25
			)
				this.obtained[22] = true;
			if (
				localStorage.poison &&
				JSON.parse(localStorage.poison).length >= 25
			)
				this.obtained[23] = true;
			if (
				localStorage.dragon &&
				JSON.parse(localStorage.dragon).length >= 25
			)
				this.obtained[24] = true;
			if (
				localStorage.fairy &&
				JSON.parse(localStorage.fairy).length >= 25
			)
				this.obtained[25] = true;
			if (localStorage.bug && JSON.parse(localStorage.bug).length >= 25)
				this.obtained[26] = true;
			if (
				localStorage.kanto &&
				JSON.parse(localStorage.kanto).length === 151
			)
				this.obtained[27] = true;
			if (
				localStorage.johto &&
				JSON.parse(localStorage.johto).length === 100
			)
				this.obtained[28] = true;
			if (
				localStorage.hoenn &&
				JSON.parse(localStorage.hoenn).length === 135
			)
				this.obtained[29] = true;
			if (
				localStorage.sinnoh &&
				JSON.parse(localStorage.sinnoh).length === 107
			)
				this.obtained[30] = true;
			// Rattata check
			if (
				localStorage.caught &&
				JSON.parse(localStorage.normal).includes(18)
			)
				this.obtained[31] = true;
		},
        // Updates light mode styling on each medal
		updateLightMode: function () {
			const medals = document.getElementsByClassName("medal");
			if (JSON.parse(localStorage.lightMode))
				for (let i = 0; i < medals.length; i++)
					medals[i].classList.add("light-mode");
            else
                for (let i = 0; i < medals.length; i++)
					medals[i].classList.remove("light-mode");
		},
	},
	computed: {
		// Map Vuex functions for light mode
		...mapGetters(["lightMode"]),
	},
	watch: {
        // Light mode styling on toggle
		lightMode: function () {
			this.updateLightMode();
		},
	},
	mounted: function () {
		this.checkMedalReqs();
        // Next tick to style after re-rendering of obtained medals
        this.$nextTick(() => this.updateLightMode());
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
