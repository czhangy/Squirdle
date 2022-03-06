const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
    dex_num: {
        type: Number,
        required: true,
        unique: true,
    },
	gen: {
		type: Number,
		required: true,
	},
	type_1: {
		type: String,
		required: true,
	},
	type_2: {
		type: String,
		default: "",
	},
	stage: {
		type: Number,
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema, "pokemon");
module.exports = Pokemon;
