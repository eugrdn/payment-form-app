(function() {

	angular.module('paymentApp.controllers')
		.controller('MainController', MainController);

	MainController.$injector = [];

	function MainController($scope, $sce) {

		$scope.payment = {
			amount: '',
			currency: '',
			nameOnCard: '',
			cardNumber: '',
			expiryDate: '',
			securityCode: '',
			createdAt: ''
		};

		$scope.cur = '';

		$scope.disabled = true;

		$scope.clearSession = function(payment) {
			for (let prop in payment) {
				payment[prop] = '';
			}
		};

		$scope.edit = function($event) {
			$event.preventDefault();
			$scope.disabled = !$scope.disabled;
		};

		$scope.pay = function(valid) {
			if (!valid) return;
			//debug
				console.log($scope.payment);
			$scope.clearSession($scope.payment);
		};


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
					currency = '₽';
					break;
			}
			return $sce.trustAsHtml(' ' + value + ' ' + currency);
		};
	}

})();