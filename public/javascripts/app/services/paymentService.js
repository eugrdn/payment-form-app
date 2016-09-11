(function() {
	angular.module('paymentApp.services')
		.factory('paymentService', paymentService);

	paymentService.$inject = ['$http'];

	function paymentService($http) {
		var factory = {};
		factory.pay = function(payment) {
			return $http.post('/payment-process', {
				payment: {
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