angular.module('myDirectives', [])

.directive('navBar', function($location, $mdDialog){
	return {

		restrict: 'E', 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/navbar/navbar.html', 
		link: function(scope, element, attrs) {

			scope.goToTimeline = function() {
				$location.url('/timeline');
			};

			scope.goToSearch = function() {
				$location.url('/search');
			};
			
		    scope.openGifs = function(ev) {
		        $mdDialog.show({
		          controller: 'GifsCtrl',
		          templateUrl: 'common/tmpls/gifs/gifs-modal.html',
		          parent: angular.element(document.body),
		          targetEvent: ev,
		          clickOutsideToClose:true
		        }).then(function() {
		            
		        });
		    };

			scope.closeInteractive = function () {
		        mflyCommands.close();
		    };
		    
			scope.goToSettings = function() {
				$location.url('/settings');
			};

			// scope.goToCollections = function () {
		 //        $location.url('/collections');
		 //    };



		}

	}
})

// TIMELINE
.directive('userCard', function($location){
	return {

		restrict: 'E', 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/timeline/user-card.html'
	}
})

.directive('weatherCard', function($location){
	return {

		restrict: 'E', 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/timeline/weather-card.html'
	}
})

.directive('filterCard', function($location){
	return {

		restrict: 'E', 
		scope: {
			card: '='
		},
		replace:true,
		templateUrl: 'common/tmpls/timeline/filter-card.html'
	}
})


.directive('pHeader', function($location, $stateParams, Mfly, $uibModal){
	return {

		restrict: 'E',
		scope: {
			slide: '=', 
			current: '='
		},
		transclude: true,
		templateUrl: 'common/tmpls/presentation/presentation-header.html', 
		link: function(scope, element, attrs) {

			// goes back home
			scope.goToTimeline = function() {
				$location.url('/timeline');
			};		

			// creates a new collection from the presentation list 
			scope.createNewCollection = function() {
				$uibModal.open({
		            templateUrl: 'common/tmpls/save-presentation/save-presentation.html',
		            controller: 'SavePresentationCtrl'		            
		        });
			};
		}

	}
})

.directive('pFooter', function($location){
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

.directive('skyIcon', function($location){
	return {
		restrict: 'E', 
		link: function(scope, element, attrs) {
			var canvas = document.createElement( "canvas" );
		      canvas.height = 50;
		      canvas.width = 50;
		      var skycons = new Skycons({"color": "#999"});
		      var iconType = attrs['iconType'];
		      // ...or by the canvas DOM element itself.
		      skycons.add(canvas, iconType || 'Rain');
		    
		      // if you're using the Forecast API, you can also supply
		      // strings: "partly-cloudy-day" or "rain".
		    
		      // start animation!
		      skycons.play();
		      
		      if ( element[0].nodeType === 8 ) {
		          element.replaceWith( canvas );
		      } else {
		          element[0].appendChild( canvas );
		      }
		}

	}
})

.directive('sticky', function($mdSticky){
	return {
		restrict: 'A', 
		link: function(scope, element, attrs) {
			$mdSticky(scope, element);
		}

	}
})


