angular.module('moonshotApp')

.controller('SearchCtrl', function($scope, $location, Mfly, ItemIcons){

	$scope.toggle = function () {
        $scope.openMenu = true;
    };

    //

    $scope.getSearch = function(_term) {
		Mfly.search(_term).then(function(results){
			
			results.forEach(function(item){
            	
            	ItemIcons.forEach(function(icon){
                    
                    if (item.type == icon.type) {
                        item['icon'] = icon.icon;
                    }

            	});

        	});

			$scope.showSearchResults = true;
        	$scope.results = results;

		});
    };

    $scope.toggleItem = function(item) {
    	$scope.toggleSearchResult = item.id;
    	$scope.selectedResult = item;
    }

});