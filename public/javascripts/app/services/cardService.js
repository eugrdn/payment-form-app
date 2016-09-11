(function() {
	angular.module('paymentApp.services')
		.factory('cardService', cardService);

	cardService.$inject = ['$http'];

	function cardService($http) {
		var factory = {};
		factory.getAll = function() {
			return $http.get('/api/cards');
		};
		factory.getCardInfo = function(first_num) {
			return $http.post('/api/cards/id', {
				fn: first_num
			});
		};
		return factory;
	}

})();