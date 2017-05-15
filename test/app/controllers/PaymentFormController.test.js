describe('PaymentFormController tests', function () {
    'use strict';

    var controller;
    var scope;
    var sce;

    beforeEach(angular.mock.module('paymentApp.controllers'));
    beforeEach(angular.mock.module('paymentApp.services'));

    beforeEach(module(function ($provide) {
        $provide.factory('paymentService', function ($q) {
            return {
                pay: jasmine.createSpy('pay').and.returnValue($q.resolve())
            }
        });

        $provide.factory('cardService', function ($q) {
            return {
                getCardInfo: jasmine.createSpy('getCardInfo').and.returnValue($q.resolve())
            }
        });
    }));

    beforeEach(inject(function (_$rootScope_, _$controller_, _$sce_) {
        scope = _$rootScope_.$new();
        sce = _$sce_;
        controller = _$controller_('PaymentFormController', {$scope: scope});
    }));

    describe('Payment transfer tests', function () {
        it('should contain Payment model', function () {
            expect(scope.payment).toBeDefined();
        });

        describe('Scope #renderAmount tests', function () {
            var mockInput = [
                {value: 1, currency: 'dollar'},
                {value: 1, currency: 'pound'},
                {value: 1, currency: 'euro'},
                {value: 1, currency: 'rouble'}
            ];

            describe('it should set payment `value` and convert `currency` to valid value depending on input value', function () {
                it('should convert dollar currency to valid HTML code', function () {
                    var dollarResult = scope.renderAmount(mockInput[0].value, mockInput[0].currency);
                    expect(sce.getTrustedHtml(dollarResult)).toEqual(' 1 &#36;');
                });

                it('should convert pound currency to valid HTML code', function () {
                    var poundResult = scope.renderAmount(mockInput[1].value, mockInput[1].currency);
                    expect(sce.getTrustedHtml(poundResult)).toEqual(' 1 &#163;');
                });

                it('should convert euro currency to valid HTML code', function () {
                    var euroResult = scope.renderAmount(mockInput[2].value, mockInput[2].currency);
                    expect(sce.getTrustedHtml(euroResult)).toEqual(' 1 &#128;');
                });

                it('should convert rouble currency to valid HTML code', function () {
                    var roubleResult = scope.renderAmount(mockInput[3].value, mockInput[3].currency);
                    expect(sce.getTrustedHtml(roubleResult)).toEqual(' 1 P');
                });
            });
        });

        describe('Scope #pay tests', function () {
            it('should not call paymentService #pay if payment data is invalid', inject(function (paymentService) {
                var isCardValid = false;

                scope.pay(isCardValid);

                expect(paymentService.pay).not.toHaveBeenCalled();

            }));

            it('should call paymentService #pay if payment data is valid', inject(function (paymentService) {
                var isCardValid = true;
                scope.payment.cardNumber = '1111111111111111';

                scope.pay(isCardValid);

                expect(paymentService.pay).toHaveBeenCalled();
            }));
        });
    });

    describe('Scope card model tests', function () {
        describe('card model defaults', function () {
            it('should have `dateMask` property', function () {
                expect(scope.dateMask).toBeDefined();
            });

            it('should have default values of all props', function () {
                var defaultCardModel = {
                    type: 'none',
                    first_number: '',
                    card_number_length: 16,
                    security_code_lenght: 0,
                    logo: '',
                    hint: 'images/card_tooltips/none.png'
                };

                expect(scope.CARD).toEqual(defaultCardModel);
            });
        });
        describe('Scope #isInvalid tests', function () {
            it('should identify invalidation of current card number depending on card type', function () {
                scope.CARD.regex = '^4[0-9]{12}(?:[0-9]{3})?$';
                scope.CARD.card_number_length = 16;

                scope.payment.cardNumber = '1111111111111111';
                expect(scope.isInvalid()).toBe(true);


                scope.payment.cardNumber = '4444444444444444';
                expect(scope.isInvalid()).toBe(false);
            });
        });
        describe('Scope #getCardDescription tests', function () {
            it('should call cardService #getCardInfo with type card depending on first_num argument', inject(function (cardService) {
                var first_num = '3';
                var expectedCardType = 'amex';

                scope.getCardDescription(first_num);

                expect(cardService.getCardInfo).toHaveBeenCalledWith(expectedCardType);
            }));
        });
        describe('Scope #edit tests', function () {
            var mockEvent = new Event('click');

            it('should set `disabled` flag conversely', function () {
                scope.disabled = false;

                scope.edit(mockEvent);
                expect(scope.disabled).toBe(true);

                scope.edit(mockEvent);
                expect(scope.disabled).toBe(false);
            });
        });
    });
});