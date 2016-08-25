angular.module('myDirectives', [])

.directive('navBar', function($location){
	return {

		restrict: 'E', 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/navbar/navbar.html', 
		link: function(scope, element, attrs) {
			scope.toggle = function () {
		        scope.openMenu = true;
		    };

			scope.goToSearch = function() {
				$location.url('/search');
			};
		}

	}
})