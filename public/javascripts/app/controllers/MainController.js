(function() {
	MainController.$injector = [cardService];


	angular.module('paymentApp.controllers')
		.factory('cardService', cardService)
		.controller('MainController', MainController);

	MainController.$inject = ['$scope', '$sce', 'cardService'];
	function MainController($scope, $sce, cardService) {

		//---------------------------config----------------------------

		$scope.showError = function(model) {
			return (model.$error.required && $scope.paymentForm.$submitted);
		};

		$scope.showRequired = function(model) {
			return (model.$error.required && $scope.paymentForm.$submitted) ||
				(model.$error.required && !model.$pristine);
		};

		$scope.dateMask = new RegExp('^(0[1-9]|1[0-2])\/([0-9]{2})$', 'g');

		$scope.CARD = {
			type : 0,
			first_number : '',
			card_number_length : 16,
			security_code_lenght : 3,
			logo : '',
			hint : '../images/card_tooltips/none.png'
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
			if(!card_num) return;
			if(card_num.length!=1) return;
			var first_num = card_num[0];
			cardService.getCardInfo(first_num).success(function (data) {
				$scope.CARD = data;
				$scope.payment.type = $scope.CARD.type;
				console.log($scope.CARD);
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
					currency = '₽';
					break;
			}
			return $sce.trustAsHtml(' ' + value + ' ' + currency);
		};

		//payment process
		$scope.pay = function(valid) {
			if (!valid) return;
			if ($scope.payment.cardNumber.length!=16) return;
			$scope.payment.createdAt = Date.now();
			//debug
			console.log($scope.payment.amount);
			console.log($scope.payment.type);
			console.log($scope.payment.currency);
			console.log($scope.payment.nameOnCard);
			console.log($scope.payment.cardNumber);
			console.log($scope.payment.expiryDate);
			console.log($scope.payment.securityCode);
			console.log($scope.payment.createdAt);
			cardService.pay($scope.payment).success(function (data) {
				console.log(data);
			});
			$scope.clearSession($scope.payment);
		};

		$scope.clearSession = function(payment) {
			for (var prop in payment) {
				payment[prop] = '';
			}
		};

		/*
		* all cards data
		*/
		cardService.getAll().success(function (data) {
			$scope.cards = data;
		});

	}
 		// ------factory-----------------
	cardService.$inject = ['$http'];
	function cardService($http) {
		var factory = {};
		factory.getAll = function () {
			return $http.get('/api/cards');
		};
		factory.getCardInfo = function (first_num) {
			return $http.post('/api/cards/id',{fn : first_num});
		};
		factory.pay = function (payment) {
			return $http.post('/payment-process', {
				user : {
					amount: payment.amount,
					type: payment.type,
					currency: payment.currency,
					nameOnCard: payment.nameOnCard,
					cardNumber: payment.cardNumber,
					expiryDate: payment.expiryDate,
					securityCode: payment.securityCode,
					createdAt: payment.createdAt
				}
			});
		};
		return factory;
	}

})();