angular.module('moonshotApp')

.controller('CollectionsCtrl', function($scope, $location){

	$scope.goToCards = function () {
        $location.url('/cards');
    }

    $scope.toggle = function () {
        $scope.openMenu = true;
    }

});