angular.module('moonshotApp')

.controller('CollectionsCtrl', function($scope, $location, Mfly, ItemIcons){

	$scope.goToCards = function () {
        $location.url('/cards');
    };

    $scope.toggle = function () {
        $scope.openMenu = true;
    };

    //

    Mfly.getCollections().then(function(collections){
    	
    	Mfly.getCollection(collections[0].id).then(function(items){

    		items.forEach(function(item){
	    		ItemIcons.forEach(function(icon){
	                        
		            if (item.type == icon.type) {
		                item['icon'] = icon.icon;
		            }

		        });
    		});

	        console.log(items);

    		$scope.selectedCollection = items;
    	});

    	$scope.collections = collections;
    });

});