(function() {

	angular.module('paymentApp.directives')
		.directive('stopCcp', stopCCP)
		.directive('capitalize', capitalize)
		.directive('nameValid', nameValidate)
		.directive('amountMask', amountMask)
		.directive('dateMask', dateMask)
		.directive('cardMask', cardMask);

	capitalize.$inject = [];

	function nameValidate() {
		return {
			restict: 'A',
			require: 'ngModel',
			link: function(scope, elt, attrs, ngModel) {

				elt.bind('keypress', function(e) {
					if (e.charCode > 31 && (e.charCode < 65 || e.charCode > 90) &&
						(e.charCode < 97 || e.charCode > 122) && e.charCode != 32) {
						return e.preventDefault();
					}
					return true;
				});

				ngModel.$parsers.push(function(val) {
					if (val == undefined)
						val = '';
					var clean = val.replace(/[^(?! )a-zA-z]+/g, '').replace(/\s{2,}/, ' ');
					if (val !== clean) {
						ngModel.$setViewValue(clean);
						ngModel.$render();
					}
					return clean;
				});

			}
		}
	}

	capitalize.$inject = [];

	function capitalize() {
		return {
			restict: 'A',
			require: 'ngModel',
			link: function(scope, elt, attrs, ngModel) {

				ngModel.$parsers.push(function(val) {
					if (val == undefined)
						val = '';
					var capitalized = val.toUpperCase();
					if (capitalized !== val) {
						ngModel.$setViewValue(capitalized);
						ngModel.$render();
					}
					return capitalized;
				});
			}
		}
	}

	stopCCP.$inject = [];

	function stopCCP() {
		return {
			restict: 'A',
			scope: {},
			link: function(scope, elt) {

				elt.on('cut copy paste', function(event) {
					event.preventDefault();
				});
			}
		};
	}

	amountMask.$inject = [];

	function amountMask() {
		return {
			restict: 'A',
			require: 'ngModel',
			link: function(scope, elt, attrs, ngModel) {

				ngModel.$parsers.unshift(function(val) {
					if (val == undefined)
						val = '';
					var amount = val.replace(/^0[0-9]/g, '');
					if (val !== amount) {
						ngModel.$setViewValue(amount);
						ngModel.$render();
					}
					return amount;
				});
			}
		}
	}

	dateMask.$inject = [];

	function dateMask() {
		return {
			restict: 'A',
			require: 'ngModel',
			link: function(scope, elt, attrs, ngModel) {

				elt.bind('input', function(e) {
					var target = e.target;
					if (target.value.length == 2 && target.value.indexOf('/') == -1)
						target.value = target.value.replace(/(.{2})/, '$1/');
				});

				ngModel.$parsers.push(function(val) {
					if (val == undefined || val.length != 5)
						return;
					return val.replace(/\//g, '');
				});


			}
		}
	}

	cardMask.$inject = [];

	function cardMask() {
		return {
			restict: 'A',
			require: 'ngModel',
			link: function(scope, elt, attrs, ngModel) {

				elt.bind('input', function(e) {
					e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
				});

				ngModel.$parsers.push(function(val) {
					if (val == undefined)
						val = '';
					return val.replace(/\s/g, '');
				});
			}
		}
	}

})();