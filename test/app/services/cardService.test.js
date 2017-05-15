describe('CardService tests', function () {
    'use strict';

    var $httpBackend;
    var service;

    var API = '/api/cards';

    beforeEach(angular.mock.module('paymentApp.services'));

    beforeEach(inject(function (_$httpBackend_, _cardService_) {
        $httpBackend = _$httpBackend_;
        service = _cardService_;
    }));

    describe('#getAll', function () {
        var mockCards = [{}, {}];

        beforeEach(function () {
            $httpBackend
                .whenGET(API)
                .respond(mockCards);
        });

        it('should fetch list of exist cards', function () {
            service.getAll().then(function (response) {
                expect(response.data).toEqual(mockCards);
            });

            $httpBackend.flush();
        });
    });

    describe('#getCardInfo', function () {
        var cardId = 'visa';
        var mockCard = {
            type: 'visa',
            first_number: 4,
            card_number_length: 16,
            security_code_lenght: 3,
            logo: 'https://s26.postimg.org/crgipaj1x/visa.png',
            hint: '../images/card_tooltips/nonamex.png',
            regex: '^4[0-9]{12}(?:[0-9]{3})?$'
        };

        beforeEach(function () {
            $httpBackend
                .whenPOST(API + '/id')
                .respond(mockCard);
        });

        it('should get card by ID', function () {
            service.getCardInfo(cardId).then(function (response) {
                expect(response.data).toEqual(mockCard);
            });

            $httpBackend.flush();
        });
    });
});