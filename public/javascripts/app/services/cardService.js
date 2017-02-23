(function() {
	'use strict';
	
	angular.module('paymentApp.services')
		.factory('cardService', cardService);

	cardService.$inject = ['$http'];

	function cardService($http) {
		var factory = {};

		factory.getAll = function() {
			return $http.get('/api/cards');
		};

		factory.getCardInfo = function(card) {
			return $http.post('/api/cards/id', {
				type: card
			});
		};

		return factory;
	}

})();