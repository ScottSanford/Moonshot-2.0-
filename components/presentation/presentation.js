angular.module('moonshotApp')

.controller('PresentationCtrl', function($scope, $stateParams, Mfly){

  $scope.goToCards = function () {
        $location.url('/cards');
    };

  $scope.toggle = function () {
      $scope.openMenu = true;
  };

  // COLLECTIONS VIEW

  var sid = $stateParams.sid;

  $scope.currentIndex = 0;
  Mfly.getItem(sid).then(function(item){
  	 $scope.slide = item;
  });

  $scope.previousSlide = function(i) {
  	$scope.currentIndex--;
  };

  $scope.nextSlide = function(i) {
  	$scope.currentIndex++;
  };


});