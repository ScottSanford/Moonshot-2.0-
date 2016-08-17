angular.module('moonshotApp')

.controller('CardsCtrl', function($scope, $location){

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

});