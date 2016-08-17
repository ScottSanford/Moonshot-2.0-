angular.module('moonshotApp')

.controller('SearchCtrl', function($scope, $location){

	$scope.toggle = function () {
        $scope.openMenu = true;
    }

});