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

.directive('presentationHeader', function($location, $stateParams, Mfly){
	return {

		restrict: 'E',
		scope: {
			slide: '=', 
			current: '='
		},
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/presentation/presentation-header.html', 
		link: function(scope, element, attrs) {
			scope.toggle = function () {
		        scope.openMenu = true;
		        console.log('clicked');
		    };

			scope.getCurrentSlide = function(index, id) {
				var cid = $stateParams.collection;
				
				Mfly.getCollection(cid).then(function(data){
					data.forEach(function(obj){
						if (obj.id === id) {
							scope.current = index;
							$location.url('/presentation/' + id + '?collection=' + cid + '&index=' + index);
						}
					})
				});
			};
		}

	}
})

.directive('presentationFooter', function($location){
	return {

		restrict: 'E', 
		scope: {
			slide: '=', 
			current: '='
		},
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/presentation/presentation-footer.html', 
		link: function(scope, element, attrs) {
			scope.toggle = function () {
		        scope.openMenu = true;
		        console.log('clicked');
		    };
		}

	}
})