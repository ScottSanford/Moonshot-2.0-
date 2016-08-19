angular.module('moonshotApp')

.controller('SearchCtrl', function($scope, $location, Mfly, ItemIcons){

	$scope.toggle = function () {
        $scope.openMenu = true;
    };

    //

    $scope.getSearch = function(_term) {
        $scope.searchTerm = '';
		Mfly.search(_term).then(function(results){
			
			var first = _.first(results);
			$scope.toggleSearchResult = first.id;
			$scope.selectedResult = first;
			$scope.showSelectedResult = true;
			
			results.forEach(function(item, index, array){
            	
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
    	console.log(item);
    	$scope.toggleSearchResult = item.id;
    	$scope.selectedResult = item;
    };

    $scope.goToPath = function(item) {
        mflyCommands.openFolder(item.id);
    }

});