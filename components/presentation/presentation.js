angular.module('moonshotApp')

.controller('PresentationCtrl', function($scope, Mfly, $localStorage, $stateParams){

  $scope.goToCards = function () {
        $location.url('/cards');
    };

  $scope.toggle = function () {
      $scope.openMenu = true;
  };

  // COLLECTIONS VIEW

  $scope.slides = $localStorage.slides;
  $scope.slideIndex = 0;

  $scope.showSinglePageDocument = false;
  $scope.showMultiPageDocument  = false;


  // BEGIN: SLIDE
  var itemId = $stateParams.itemId;
  Mfly.getItem(itemId).then(function(item){
    if (item.pages > 0) {
      $scope.showMultiPageDocument = true;
      mflyCommands.embed($('.slide-item'), item.id, 3);
    }
      $scope.slide = item.resourceUrl;
  });


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

  // BEGIN: MULTI-PAGE DOCUMENT

  $scope.previousPage = function(pageNumber) {
    console.log(pageNumber);
  };

  $scope.nextPage = function(pageNumber) {
    console.log(pageNumber);
  };
  
  // next slide
  // grab collection id from params
  // mflyCommands.getCollection(id)


});