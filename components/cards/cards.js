angular.module('moonshotApp')

.controller('CardsCtrl', function($scope, $location, Mfly, ItemIcons){

	$scope.goToSearch = function() {
		$location.url('/search');
	};

	$scope.toggle = function () {
        $scope.openMenu = true;
    }

    $scope.goToCollections = function() {
    	$location.url('/collections');
    };

    $scope.quitMoonshot = function() {
    	mflyCommands.close();
    };

    // 

    Mfly.search('@Moonshot').then(function(data){
        $scope.cards = data;
    });

    $scope.getFolderItems = function(_folderId) {
        // variable to prevent another card showing it's items
        var item = this;
        
        Mfly.getFolder(_folderId).then(function(folderItems){

            folderItems.forEach(function(item){
                ItemIcons.forEach(function(icon){
                    if (item.type == icon.type) {
                        item['icon'] = icon.icon;
                        item['isItemSelected'] = false;
                    }
                });
            });

            $scope.itemsSelectedCount = function() {
                var count = 0;
                folderItems.forEach(function(item){
                    count += item.isItemSelected ? 1 : 0;
                });
                return count; 
            };  

            item.items = folderItems;
        });
    };

    $scope.viewCardItem = function(_itemId) {
        console.log(_itemId);
    }

    $scope.selectItem = function(){
        $scope.isItemSelected = !$scope.isItemSelected;
    };


});