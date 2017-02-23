var mongoose = require('mongoose');
var User = require('./models/user.js');

module.exports = function() {
	User.find(function(err, users) {
		
		if (users.length) return;

		new User({
			bank_account_value: 1000000000,
			type: 'visa',
			nameOnCard: 'MARK ZUCKERBERG',
			cardNumber: 4444444444444444,
			expiryDate: "0444",
			securityCode: 444
		}).save();

		new User({
			bank_account_value: 100,
			type: 'amex',
			nameOnCard: 'PAVEL TECH',
			cardNumber: 3733333333333333,
			expiryDate: "0333",
			securityCode: 3333
		}).save();

	});

};