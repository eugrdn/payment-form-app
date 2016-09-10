var mongoose = require('mongoose');
var Card = require('./models/card.js');

module.exports = function () {
    Card.find(function (err, cards) {
        if(cards.length) return;

        new Card({
            type : 'American Express',
            first_number : 3,
            card_number_length : 16,
            security_code_lenght : 4,
            logo : 'https://s26.postimg.org/k0sfx51x1/amex.png',
            hint : '../images/card_tooltips/amex.png'
        }).save();

        new Card({
            type : 'Discover Card',
            first_number : 6,
            card_number_length : 16,
            security_code_lenght : 3,
            logo : 'https://s26.postimg.org/g5p1ukir9/discover.png',
            hint : '../images/card_tooltips/nonamex.png'
        }).save();

        new Card({
            type : 'MasterCard',
            first_number : 5,
            card_number_length : 16,
            security_code_lenght : 3,
            logo : 'https://s26.postimg.org/iw2z5i4tx/mastercard.png',
            hint : '../images/card_tooltips/nonamex.png'
        }).save();

        new Card({
            type : 'Visa',
            first_number : 4,
            card_number_length : 16,
            security_code_lenght : 3,
            logo : 'https://s26.postimg.org/crgipaj1x/visa.png',
            hint : '../images/card_tooltips/nonamex.png'
        }).save();
    });

};