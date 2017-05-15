(function() {
	'use strict';
	
	angular.module('paymentApp.directives')
		.directive('stopCcp', stopCCP)
		.directive('capitalize', capitalize)
		.directive('nameValid', nameValidate)
		.directive('amountMask', amountMask)
		.directive('dateMask', dateMask)
		.directive('cardMask', cardMask);

	nameValidate.$inject = [];

	function nameValidate() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elt, attrs, ngModel) {

				elt.bind('keypress', function(e) {
					if (e.charCode > 31 &&
						(e.charCode < 65 || e.charCode > 90) &&
						(e.charCode < 97 || e.charCode > 122) &&
						e.charCode !== 32) {
						e.preventDefault();
					}
				});

				ngModel.$parsers.push(function(val) {
					var clean;

					if (!val) val = '';

					clean = val.replace(/[^(?! )a-zA-z]+/g, '').replace(/\s{2,}/, ' ');

					if (val !== clean) {
						ngModel.$setViewValue(clean);
						ngModel.$render();
					}

					return clean;
				});
			}
		};
	}

	capitalize.$inject = [];

	function capitalize() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elt, attrs, ngModel) {

				ngModel.$parsers.push(function(val) {
					var capitalized;

					if (!val) val = '';

					capitalized = val.toUpperCase();

					if (capitalized !== val) {
						ngModel.$setViewValue(capitalized);
						ngModel.$render();
					}

					return capitalized;
				});
			}
		};
	}

	stopCCP.$inject = [];

	function stopCCP() {
		return {
			restrict: 'A',
			scope: {},
			link: function(scope, elt) {

				elt.on('cut copy paste', function(e) {
					e.preventDefault();
				});
			}
		};
	}

	amountMask.$inject = [];

	function amountMask() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elt, attrs, ngModel) {

				ngModel.$parsers.unshift(function(val) {
					var amount;

					if (!val) val = '';

					amount = val.replace(/^0[0-9]/g, '');

					if (val !== amount) {
						ngModel.$setViewValue(amount);
						ngModel.$render();
					}

					return amount;
				});
			}
		};
	}

	dateMask.$inject = [];

	function dateMask() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elt, attrs, ngModel) {

				elt.bind('input', function(e) {
					var target = e.target;

					if (target.value.length === 2 && target.value.indexOf('/') === -1)
						target.value = target.value.replace(/(.{2})/, '$1/');
				});

				ngModel.$parsers.push(function(val) {
					if (!val || val.length !== 5) return;

					return val.replace(/\//g, '');
				});
			}
		};
	}

	cardMask.$inject = [];

	function cardMask() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elt, attrs, ngModel) {

				elt.bind('input', function(e) {
					e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
				});

				ngModel.$parsers.push(function(val) {
					if (!val) val = '';

					return val.replace(/\s/g, '');
				});
			}
		};
	}

})();