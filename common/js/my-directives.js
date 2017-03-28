angular.module('myDirectives', [])


.directive('topToolbar', function($location, $state, $mdDialog, Mfly, $mdMedia, $mdSidenav){
	return {

		restrict: 'E', 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/toolbar/toolbar.html', 
		link: function(scope, element, attrs) {

			scope.isSideNavOpen   = true;
			scope.showSearch      = true;

		  	scope.openNavigationMenu = function() {
		    	$mdSidenav('left').toggle();
		  	};
			

			var pageTitle = $state.current.name;

  			scope.pageTitle = pageTitle;

  			// USER
			Mfly.getInteractiveInfo().then(function(data){
			    var user       = data.displayName;
			    var firstName  = user.substr(0,user.indexOf(' '));
			    scope.userName = firstName;
			});
			
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

		    var currentName   = $state.current.name;
		    if (currentName == 'search') {
		    	scope.showSearch = true;
		    };
		    // perform a search query
		    scope.getSearch = function(term){
		    	$location.url('search/' + term);
		    };

			scope.goToSettings = function() {
				$location.url('/settings');
			};
			
			scope.closeInteractive = function () {
		        mflyCommands.close();
		    };

		    // sync status notifications
		    scope.isDeviceMobile = function(item) {
				var deviceType = mflyCommands.getDeviceType();
				// change to 'web' for development
				// change to 'mobile' for production
				if (deviceType === 'mobile') {
					return true;
				} else {
					return false;
				}
			};

			function getDeviceOnlyInfo() {
				var deviceType = mflyCommands.getDeviceType();
				if (deviceType === 'mobile') {
					mflyCommands.getSyncStatus().done(function(data){
						var total = data.total;
						var value = data.complete;
						var percentage = (value * 100) / total;
						scope.percentageNum = percentage;
					});

					mflyCommands.getDownloadStatus().done(function(data){
						var progress = data.progress * 100;
						
						scope.progressPercentage = progress;
					});
					scope.showWifi = false;
					mflyCommands.getOnlineStatus().done(function(data){
						var status = data.status;
						if (status === 'offline') {
							scope.showWifi = true;
						}
					})
				} else {
					return;
				}
			}

			getDeviceOnlyInfo();
			


		    
		}

	}
})

.directive('sidebarMenu', function($location, $mdDialog, $mdSidenav){
	return {

		restrict: 'E', 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/sidebar-menu/sidebar-menu.html', 
		link: function(scope, element, attrs) {
			
			scope.isDeviceMobile = function(item) {
				var deviceType = mflyCommands.getDeviceType();
				if (deviceType === 'mobile' && item.name === 'Upload') {
					return true;
				} else {
					return false;
				}
			};

			var leftMenu = [
			    {name: 'Dashboard', icon: 'home', state: 'dashboard'},
			    {name: 'Inside Mediafly', icon: 'folder', state: 'hierarchy'},
			    {name: 'Collections', icon: 'featured_play_list', state: 'collections'},
			    {name: 'Present', icon: 'star', state: 'present'},
			    {name: 'Upload', icon: 'file_upload', state: 'upload'}
			];

			scope.menu = leftMenu;

		}
	}
})

// DASHBOARD

.directive('dashPresent', function($location, $mdDialog){
	return {

		restrict: 'E', 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/dashboard/present.html', 
		link: function(scope, element, attrs) {

		}

	}
})

.directive('dashCollections', function($location, $mdDialog){
	return {

		restrict: 'E', 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/dashboard/collections.html', 
		link: function(scope, element, attrs) {

		}

	}
})

.directive('dashFolders', function($location, $mdDialog){
	return {

		restrict: 'E', 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/dashboard/folders.html', 
		link: function(scope, element, attrs) {

		}

	}
})

.directive('dashRecommended', function($location, $mdDialog){
	return {

		restrict: 'E', 
		replace: true, 
		transclude: true,
		templateUrl: 'common/tmpls/dashboard/recommended.html', 
		link: function(scope, element, attrs) {
			scope.goToPath = function(item) {

		        if (item.type == "folder") {
		          $location.url('hierarchy/' + item.id );
		        } else {
		          mflyCommands.openItem(item.id);
		        }
		        
		    };

		    scope.openShareModal = function(selectedItem, ev) {

		        $mdDialog.show({
		          controller: 'ShareItemCtrl',
		          templateUrl: 'common/tmpls/share-item/share-item-modal.html',
		          parent: angular.element(document.body),
		          targetEvent: ev,
		          clickOutsideToClose:true, 
		          locals: {
		            item: selectedItem
		          }
		        }).then(function() {
		            
		        });

		    };

		    scope.openCollectionModal = function(selectedItem, ev) {
		        
		        $mdDialog.show({
		          controller: 'AddToCollectionCtrl',
		          templateUrl: 'common/tmpls/add-to-collection/add-to-collection-modal.html',
		          parent: angular.element(document.body),
		          targetEvent: ev,
		          clickOutsideToClose:true, 
		          locals: {
		            item: selectedItem
		          }
		        }).then(function() {
		            
		        });
		       
		    };
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

			scope.isSideNavOpen = true;
			scope.openPresMenu = function() {
				console.log(scope.isSideNavOpen);
		    	scope.isSideNavOpen = !scope.isSideNavOpen;
		  	};

			// goes back home
			scope.goToTimeline = function() {
				$location.url('/dashboard');
			};	

			// goes back to cards
			scope.goToCards = function() {
				$location.url('/cards');
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


