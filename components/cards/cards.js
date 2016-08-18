angular.module('moonshotApp')

.controller('CardsCtrl', function($scope, $location, Mfly){

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
            item.items = folderItems;
        });
    };

    $scope.viewCardItem = function(_itemId) {
        console.log(_itemId);
    }


});