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
		app.config.globalProperties.$formatDexNum = (num) => {
			return num.toString().padStart(3, "0");
		};
	},
};
