describe('Directives tests', function () {
    'use strict';

    var compile, scope;

    beforeEach(angular.mock.module('paymentApp.directives'));

    beforeEach(inject(function ($compile, $rootScope) {
        compile = $compile;
        scope = $rootScope.$new();
    }));

    describe('stop-cpp directive tests', function () {
        var stopCCPDirective;
        var element;

        it('should be defined', function () {
            element = angular.element('<div stop-ccp></div>');
            stopCCPDirective = compile(element)(scope);
            scope.$digest();

            expect(stopCCPDirective).toBeDefined();
        });
    });

    describe('capitalize directive tests', function () {
        var capitalizeDirective;
        var element;

        it('should be defined', function () {
            element = angular.element('<div capitalize ng-model="payment.cardNumber"></div>');
            capitalizeDirective = compile(element)(scope);
            scope.$digest();

            expect(capitalizeDirective).toBeDefined();
        });
    });

    describe('name-valid directive tests', function () {
        var nameValidDirective;
        var element;

        it('should be defined', function () {
            element = angular.element('<div name-valid ng-model="payment.cardNumber"></div>');
            nameValidDirective = compile(element)(scope);
            scope.$digest();

            expect(nameValidDirective).toBeDefined();
        });
    });

    describe('amount-mask directive tests', function () {
        var amountMaskDirective;
        var element;

        it('should be defined', function () {
            element = angular.element('<div amount-mask ng-model="payment.cardNumber"></div>');
            amountMaskDirective = compile(element)(scope);
            scope.$digest();

            expect(amountMaskDirective).toBeDefined();
        });
    });

    describe('date-mask directive tests', function () {
        var dateMaskDirective;
        var element;

        it('should be defined', function () {
            element = angular.element('<div date-mask ng-model="payment.cardNumber"></div>');
            dateMaskDirective = compile(element)(scope);
            scope.$digest();

            expect(dateMaskDirective).toBeDefined();
        });
    });

    describe('card-mask directive tests', function () {
        var cardMaskDirective;
        var element;

        it('should be defined', function () {
            element = angular.element('<div card-mask ng-model="payment.cardNumber"></div>');
            cardMaskDirective = compile(element)(scope);
            scope.$digest();

            expect(cardMaskDirective).toBeDefined();
        });
    });
});