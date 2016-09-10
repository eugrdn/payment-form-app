var mongoose = require('mongoose');

var paymentSchema = mongoose.Schema({
    bank_account_value_before : Number,
    bank_account_value_after : Number,
    cardNumber: Number,
    nameOnCard: String,
    amount: Number,
    currency: String,
    createdAt: Number
});

var Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;