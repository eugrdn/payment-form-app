(function() {

	angular.module('paymentApp.directives')
		.directive('stopCcp', stopCCP)
		.directive('capitalize', capitalize)
		.directive('nameValid', nameValidate)
		.directive('onlyDigits', onlyDigits)
		.directive('cardMask', cardMask);


	capitalize.$injector = [];

	function nameValidate() {
		return {
			restict: 'A',
			require: 'ngModel',
			link: function(scope, elt, attrs, ngModel) {

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

	capitalize.$injector = [];

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

	onlyDigits.$injector = [];

	function onlyDigits() {
		return {
			restict: 'AE',
			require: 'ngModel',
			link: function(scope, elt, attrs, ngModel) {
				ngModel.$parsers.unshift(function(val) {
					if (val == undefined)
						val = '';
					var clean = val.replace(/[^0-9]/g, '');
					if (val !== clean) {
						ngModel.$setViewValue(clean);
						ngModel.$render();
					}
					return clean;
				});
			}
		}
	}

	stopCCP.$injector = [];

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

	cardMask.$injector = [];

	function cardMask() {
		//TODO
	}


})();