var history = require('../models/payment_transfer.js');
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

    User.findOne(query, function (err, _user) {
        if(err)
            return res.send(err);

        if(!_user)
            return res.json({message: 'takogo pacana net'});

        if(!_user.isPaymentPossible(user.amount))
            return res.json({message: 'bomj'});

        var previousBankAccountValue = _user.bank_account_value;
        var convertedAmount = _user.convertAmount(user.currency,user.amount);
        _user.bank_account_value -= convertedAmount;

        console.log('Converted amount : '+convertedAmount);
        console.log('new Account value:' + _user.bank_account_value);

        _user.save(function (err) {
            if(err)
                return res.send(err);
        });

        new history({
            bank_account_value_before : previousBankAccountValue,
            bank_account_value_after : _user.bank_account_value,
            cardNumber: _user.cardNumber,
            nameOnCard: _user.nameOnCard,
            amount: user.amount,
            currency: user.currency,
            createdAt: user.createdAt
        }).save(function (err) {
            if(err)
                return res.send(err);
        });

        return res.json({message : 'platej sdelan'});
    });
};
