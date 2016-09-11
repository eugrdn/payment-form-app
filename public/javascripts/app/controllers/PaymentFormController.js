(function() {
	angular.module('paymentApp.controllers')
		.controller('PaymentFormController', PaymentFormController);

	PaymentFormController.$inject = ['cardService', 'paymentService', '$scope', '$sce', '$window'];

	function PaymentFormController(cardService, paymentService, $scope, $sce, $window) {

		//---------------------------initialization----------------------------

		$scope.showError = function(model) {
			return (model.$error.required && $scope.paymentForm.$submitted);
		};

		$scope.showRequired = function(model) {
			return (model.$error.required && $scope.paymentForm.$submitted) ||
				(model.$error.required && !model.$pristine);
		};

		$scope.dateMask = new RegExp('^(0[1-9]|1[0-2])\/([0-9]{2})$', 'g');

		$scope.CARD = {
			type: 0,
			first_number: '',
			card_number_length: 16,
			security_code_lenght: 3,
			logo: '',
			hint: '../images/card_tooltips/none.png'
		};

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

		$scope.disabled = true;

		//--------------------validation-------------------------

		$scope.edit = function($event) {
			$event.preventDefault();
			$scope.disabled = !$scope.disabled;
		};

		$scope.$watch('payment.cardNumber', function(card_num) {
			if (!card_num) return;
			if (card_num.length != 1) return;
			var first_num = card_num[0];
			cardService.getCardInfo(first_num).success(function(data) {
				$scope.CARD = data;
				$scope.payment.type = $scope.CARD.type;
			});
		});

		$scope.renderAmount = function(value, currency) {
			var value = value || '';
			if (!value)
				currency = '';
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
			if ($scope.payment.cardNumber.length != 16) return;
			$scope.payment.createdAt = Date.now();
			paymentService.pay($scope.payment).success(function(response) {
				if (response.status == 200) {
					$window.location.href = '/payment-process/completed';
				}
				if (response.status == 401) {
					$window.location.href = '/payment-process/canceled';
				}
			});
		};


	}
})();