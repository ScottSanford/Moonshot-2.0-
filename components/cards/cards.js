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
        console.log(data);
        $scope.cards = data;
    });

});