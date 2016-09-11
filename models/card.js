var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
	type: String,
	first_number: Number,
	card_number_length: Number,
	security_code_lenght: Number,
	logo: String,
	hint: String
});

var Card = mongoose.model('Card', cardSchema);
module.exports = Card;