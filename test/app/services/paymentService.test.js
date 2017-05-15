describe('PaymentService tests', function () {
    'use strict';

    var $httpBackend;
    var service;

    var API = '/payment-process';

    beforeEach(angular.mock.module('paymentApp.services'));

    beforeEach(inject(function (_$httpBackend_, _paymentService_) {
        $httpBackend = _$httpBackend_;
        service = _paymentService_;
    }));

    describe('#pay', function () {
        var mockResponse = {};
        var payment = {};

        beforeEach(function () {
            $httpBackend
                .whenPOST(API)
                .respond(mockResponse);
        });

        it('should execute payment transaction', function () {
            service.pay(payment).then(function (response) {
                expect(response.data).toEqual(mockResponse);
            });

            $httpBackend.flush();
        });
    });
});