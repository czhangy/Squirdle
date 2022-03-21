// Import global library
import { createStore } from "vuex";

// Import modules
import game from "@/store/modules/game.js";
import pokemon from "@/store/modules/pokemon.js";

export default createStore({
	modules: {
        game,
		pokemon,
	},
});
