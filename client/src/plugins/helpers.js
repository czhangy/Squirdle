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
	},
};
