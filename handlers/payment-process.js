var Transfer = require('../models/payment_transfer.js');
var User = require('../models/user.js');

exports.post = function(req, res) {
	var user = req.body.payment;
	var query = {
		cardNumber: parseInt(user.cardNumber),
		type: user.type,
		nameOnCard: user.nameOnCard,
		expiryDate: user.expiryDate,
		securityCode: parseInt(user.securityCode)
	};

	User.findOne(query, function(err, _user) {
		var convertedAmount;
		var previousBankAccountValue;
		
		if (err) return res.send(err);

		if (!_user)
			return res.send({
				status: 401
			});

		convertedAmount = _user.convertAmount(user.currency, user.amount);

		if (!_user.isPaymentPossible(convertedAmount))
			return res.send({
				status: 401
			});

		previousBankAccountValue = _user.bank_account_value;

		_user.bank_account_value -= convertedAmount;
		
		_user.save(function(err) {
			if (err) return res.send(err);
		});

		new Transfer({
			bank_account_value_before: previousBankAccountValue,
			bank_account_value_after: _user.bank_account_value,
			cardNumber: _user.cardNumber,
			nameOnCard: _user.nameOnCard,
			amount: user.amount,
			currency: user.currency,
			createdAt: user.createdAt
		}).save(function(err) {
			if (err) return res.send(err);
		});

		return res.send({
			status: 200
		});
	});
};
