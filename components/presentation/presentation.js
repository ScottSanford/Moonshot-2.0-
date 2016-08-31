angular.module('moonshotApp')

.controller('PresentationCtrl', function($scope, Mfly, $localStorage){

  $scope.goToCards = function () {
        $location.url('/cards');
    };

  $scope.toggle = function () {
      $scope.openMenu = true;
  };

  // COLLECTIONS VIEW

  $scope.slides = $localStorage.slides;
  $scope.slideIndex = 0;

  $scope.previousSlide = function(i) {
    $scope.moveToPrevious = true;
  	$scope.slideIndex--;
  };

  $scope.nextSlide = function(i) {
    $scope.moveToNext = true;
  	if ($scope.slides >= $scope.slides -1) {
        $scope.slideIndex = 0;
    } else {
        $scope.slideIndex++;
    }
  };


});