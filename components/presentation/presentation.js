angular.module('moonshotApp')

.controller('PresentationCtrl', function($scope, $stateParams, Mfly, presentation){

	$scope.goToCards = function () {
        $location.url('/cards');
    };

  $scope.toggle = function () {
      $scope.openMenu = true;
  };

  // COLLECTIONS VIEW



});