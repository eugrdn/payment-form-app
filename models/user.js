var mongoose = require('mongoose');
var DOLLAR = 1.12528,
    POUND = 0.84631,
    RUB = 72.3355;

var userSchema = mongoose.Schema({
    bank_account_value: Number,
    type: String,
    nameOnCard: String,
    cardNumber: Number,
    expiryDate: String,
    securityCode: Number
});

userSchema.methods.isPaymentPossible = function(amount){
    return this.bank_account_value > amount ? true : false;
};

userSchema.methods.convertAmount = function(currency, amount){
    var _amount = amount;
    switch (currency) {
        case 'dollar':
            _amount = convertToDollar(_amount);
            break;
        case 'pound':
            _amount = convertToPound(_amount);
            break;
        case 'rouble':
            _amount = convertToRUB(_amount);
            break;
        case 'euro':
            break;
    }
    return _amount;
};

var convertToDollar = function(amount){
    return Math.round(amount * DOLLAR);
};

var convertToPound = function(amount){
    return Math.round(amount * POUND);
};

var convertToRUB = function(amount){
    return Math.round(amount * RUB);
};

var User = mongoose.model('User', userSchema);
module.exports = User;