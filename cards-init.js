var mongoose = require('mongoose');
var Card = require('./models/card.js');

module.exports = function() {
	Card.find(function(err, cards) {
		if (cards.length) return;

		new Card({
			type: 'amex',
			first_number: 3,
			card_number_length: 16,
			security_code_lenght: 4,
			logo: 'https://s26.postimg.org/k0sfx51x1/amex.png',
			hint: '../images/card_tooltips/amex.png',
			regex: '^3[47][0-9]{0,}$'
		}).save();

		new Card({
			type: 'discover',
			first_number: 6,
			card_number_length: 16,
			security_code_lenght: 3,
			logo: 'https://s26.postimg.org/g5p1ukir9/discover.png',
			hint: '../images/card_tooltips/nonamex.png',
			regex: '^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$'
		}).save();

		new Card({
			type: 'mastercard',
			first_number: 5,
			card_number_length: 16,
			security_code_lenght: 3,
			logo: 'https://s26.postimg.org/iw2z5i4tx/mastercard.png',
			hint: '../images/card_tooltips/nonamex.png',
			regex: '^5[1-5][0-9]{14}$'
		}).save();

		new Card({
			type: 'visa',
			first_number: 4,
			card_number_length: 16,
			security_code_lenght: 3,
			logo: 'https://s26.postimg.org/crgipaj1x/visa.png',
			hint: '../images/card_tooltips/nonamex.png',
			regex: '^4[0-9]{12}(?:[0-9]{3})?$'
		}).save();

		new Card({
			type: 'none',
			first_number: '',
			card_number_length: 16,
			security_code_lenght: 0,
			logo: '',
			hint: '../images/card_tooltips/none.png',
			regex: ''
		}).save();

	});

};