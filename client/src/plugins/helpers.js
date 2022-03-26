export default {
    install: (app) => {
        // Translate integers to roman numerals
        app.config.globalProperties.$intToRoman = (num) => {
            switch (num) {
                case 1:
                    return "I";
                case 2:
                    return "II";
                case 3:
                    return "III";
                case 4:
                    return "IV";
                case 5:
                    return "V";
                case 6:
                    return "VI";
                case 7:
                    return "VII";
                case 8:
                    return "VIII";
            }
        };
        // Pad dex numbers with zeroes at the front
        app.config.globalProperties.$formatDexNum = (num) => {
            return num.toString().padStart(3, "0");
        };
        // Translate edge cases
        app.config.globalProperties.$translateName = (name) => {
            if (name === "mr. mime") return "mr.mime";
            else if (name === "mime jr.") return "mime_jr";
            else if (name === "farfetch’d") return "farfetchd";
            else if (name === "nidoran♀") return "nidoran_f";
            else if (name === "nidoran♂") return "nidoran_m";
            else return name;
        };
        // Set light mode on mount and watch
        app.config.globalProperties.$updateLightMode = (component) => {
            if (localStorage.lightMode && JSON.parse(localStorage.lightMode))
                document.querySelector(component).classList.add("light-mode");
            else
                document
                    .querySelector(component)
                    .classList.remove("light-mode");
        };
        // Check for correct and close generation
        app.config.globalProperties.$isCorrectGen = (pokemon, target) => {
            return pokemon.gen === target.gen;
        };
        app.config.globalProperties.$isCloseGen = (pokemon, target) => {
            return Math.abs(pokemon.gen - target.gen) === 1;
        };
        // Check for correct and close typing
        app.config.globalProperties.$isCorrectType = (pokemon, target) => {
            return (
                pokemon.type_1 === target.type_1 &&
                pokemon.type_2 === target.type_2
            );
        };
        app.config.globalProperties.$isCloseType = (pokemon, target) => {
            return (
                pokemon.type_1 === target.type_2 ||
                pokemon.type_1 === target.type_1 ||
                pokemon.type_2 === target.type_1 ||
                (pokemon.type_2 === target.type_2 && pokemon.type_2 !== "")
            );
        };
        // Check for correct and close stage
        app.config.globalProperties.$isCorrectStage = (pokemon, target) => {
            return pokemon.stage === target.stage;
        };
        app.config.globalProperties.$isCloseStage = (pokemon, target) => {
            return Math.abs(pokemon.stage - target.stage) === 1;
        };
        // Check for correct and close name length
        app.config.globalProperties.$isCorrectLength = (pokemon, target) => {
            return pokemon.name.length === target.name.length;
        };
        app.config.globalProperties.$isCloseLength = (pokemon, target) => {
            return Math.abs(pokemon.name.length - target.name.length) <= 2;
        };
    },
};
