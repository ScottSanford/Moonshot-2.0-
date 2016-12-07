angular.module('myDirectives', [])

.directive('navBar', function($location){
	return {

		restrict: 'E', 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/navbar/navbar.html', 
		link: function(scope, element, attrs) {

			scope.goToCards = function() {
				$location.url('/cards');
			}

			scope.goToCollections = function () {
		        $location.url('/collections');
		    };

			scope.goToSearch = function() {
				$location.url('/search');
			};

			scope.closeInteractive = function () {
		        mflyCommands.close();
		    };
		}

	}
})

.directive('presentationHeader', function($location, $stateParams, Mfly, $uibModal){
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

			if ($stateParams.collection == undefined) {
				scope.isCardPresentation = true;
			};

			scope.toggle = function () {
		        scope.openMenu = true;
		        console.log('clicked');
		    };

			scope.getCurrentSlide = function(index, id) {
				var cid = $stateParams.collection;
				if (cid) {
					Mfly.getCollection(cid).then(function(data){
						data.forEach(function(obj){
							if (obj.id === id) {
								scope.current = index;
								$location.url('/presentation/' + id + '?collection=' + cid + '&index=' + index);
							}
						})
					});
				} else {
					scope.current = index;
					$location.url('/presentation/' + id + '?index=' + index);
				}
			};

			scope.createNewCollection = function() {
				$uibModal.open({
		            templateUrl: 'common/tmpls/save-presentation/save-presentation.html',
		            controller: 'SavePresentationCtrl'		            
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

.directive('itemTab', function($location){
	return {

		restrict: 'E', 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/search/item-tab.html'
	}
})

.directive('folderTab', function($location){
	return {

		restrict: 'E', 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/search/folder-tab.html'
	}
})

.directive('suggestedItems', function($location){
	return {

		restrict: 'E', 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/search/suggested-items.html'
	}
})

.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
})

