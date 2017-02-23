(function() {
	'use strict';

	angular.module('paymentApp.controllers')
		.controller('PaymentFormController', PaymentFormController);

	PaymentFormController.$inject = ['cardService', 'paymentService', '$scope', '$sce', '$window'];

	function PaymentFormController(cardService, paymentService, $scope, $sce, $window) {

		$scope.showError = function(model) {
			return model.$error.required && $scope.paymentForm.$submitted;
		};

		$scope.showRequired = function(model) {
			return (model.$error.required && $scope.paymentForm.$submitted) ||
				(model.$error.required && !model.$pristine);
		};

		$scope.disabled = true;

		$scope.edit = function($event) {
			$event.preventDefault();
			$scope.disabled = !$scope.disabled;
		};

		//---------------------------payment transfer----------------------------

		$scope.payment = {
			amount: '',
			type: '',
			currency: '',
			nameOnCard: '',
			cardNumber: '',
			expiryDate: '',
			securityCode: '',
			createdAt: ''
		};

		$scope.renderAmount = function(value, currency) {
			var value = value || '';

			if (!value) currency = '';

			switch (currency) {
				case 'dollar':
					currency = '&#36;';
					break;
				case 'pound':
					currency = '&#163;';
					break;
				case 'euro':
					currency = '&#128;';
					break;
				case 'rouble':
					currency = 'P';
					break;
			}

			return $sce.trustAsHtml(' ' + value + ' ' + currency);
		};

		$scope.pay = function(valid) {
			if (!valid) return;

			if ($scope.payment.cardNumber.length !== 16) return;

			$scope.payment.createdAt = Date.now();

			paymentService.pay($scope.payment).success(function(response) {
				if (response.status === 200) {
					$window.location.href = '/payment-process/completed';
				} else if (response.status === 401) {
					$window.location.href = '/payment-process/canceled';
				}
			});
		};

		//---------------------------card----------------------------

		$scope.dateMask = new RegExp('^(0[1-9]|1[0-2])\/([0-9]{2})$', 'g');

		$scope.CARD = {
			"type": "none",
			"first_number": "",
			"card_number_length": 16,
			"security_code_lenght": 0,
			"logo": "",
			"hint": "images/card_tooltips/none.png"
		};

		$scope.$watch('payment.cardNumber', function(card_num) {
			var num_input;
			var first_num;

			if (!card_num) {
				$scope.CARD.logo = '';
				$scope.CARD.hint = 'images/card_tooltips/none.png';
				return;
			}

			num_input = angular.element(document.querySelector('#cardNumber'));

			if ($scope.isInvalid()) {
				num_input.removeClass('ng-valid');
				num_input.addClass('error');
			} else {
				num_input.addClass('ng-valid');
				num_input.removeClass('error');
			}

			if (card_num.length !== 1) return;

			first_num = card_num[0];

			$scope.getCardDescription(first_num);
		});

		$scope.isInvalid = function() {
			var card_num = $scope.payment.cardNumber;
			var card_regex;

			if (!card_num) return;

			if (card_num.length !== $scope.CARD.card_number_length) return;

			card_regex = new RegExp($scope.CARD.regex);

			return !card_num.match(card_regex);
		};

		$scope.getCardDescription = function(first_num) {
			var card = '';

			switch (first_num) {
				case '3':
					card = 'amex';
					break;
				case '4':
					card = 'visa';
					break;
				case '5':
					card = 'mastercard';
					break;
				case '6':
					card = 'discover';
					break;
				default:
					card = 'none';
			}

			cardService.getCardInfo(card).success(function(data) {
				$scope.CARD = data;
				$scope.payment.type = $scope.CARD.type;
			});
		};

	}

})();