angular.module('moonshotApp')

.controller('CardsCtrl', function($scope){

	$scope.toggle = function () {
        $scope.openMenu = true;
    }

});