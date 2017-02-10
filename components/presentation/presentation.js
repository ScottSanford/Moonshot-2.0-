angular.module('moonshotApp')

.controller('PresentationCtrl', function(
  $scope, $location, $stateParams, $state, // angular
  Mfly, ContentService, // factories
  $localStorage){ // 3rd party modules

  // SHOW FIRST SLIDE
  initPresentation();
  function initPresentation() {
    ContentService.showItemSlide().then(function(data){
      if (data.pages > 1) {
        $scope.isItemMultiPage = true;
      } else {
        $scope.isItemMultiPage = false;
      }
      $scope.slide = data.resourceUrl;
    })
  }

  // PRESENTATION CONTROLS
  $scope.previousSlide = function() {
    ContentService.goToPreviousSlide();
  };

  $scope.nextSlide = function() {
    ContentService.goToNextSlide().then(function(data){
      console.log(data);
      $scope.slide = data.resourceUrl;
    });
  };

  function multiPageNext(slide){
    var pageNum = Number($stateParams.page);
    if (pageNum === slide.pages) {
      // GO TO NEXT SLIDE IN PRESENTATION
      var sameId = _.findWhere($scope.slides, {id: itemId});
      var idIndex = _.indexOf(sameId);
      var nextIndex = idIndex + 1;

      var nextItemId = $scope.slides[nextIndex].id;

      $location.url('/presentation/' + nextItemId + '?collection=' + collection + '&index=' + nextIndex);
    } else {
      var pageNumber = pageNum + 1;
      var sameId = _.findWhere($scope.slides, {id: itemId});
      var idIndex = _.indexOf(sameId);

      $location.url('/presentation/' + slide.id + '?collection=' + collection + '&page=' + pageNumber + '&index=' + idIndex);
    }
  };

  function multiPagePrevious(slide) {
    var pageNum = Number($stateParams.page);
    if (pageNum === 1) {
      // GO TO NEXT SLIDE IN PRESENTATION
      var sameId = _.findWhere($scope.slides, {id: itemId});
      var idIndex = _.indexOf(sameId);
      var nextIndex = idIndex - 1;

      var nextItemId = $scope.slides[nextIndex].id;

      $location.url('/presentation/' + nextItemId + '?collection=' + collection + '&index=' + nextIndex);
    } else {
      var pageNumber = pageNum - 1;
      var sameId = _.findWhere($scope.slides, {id: itemId});
      var idIndex = _.indexOf(sameId);

      $location.url('/presentation/' + slide.id + '?collection=' + collection + '&page=' + pageNumber + '&index=' + idIndex);
    }
  }



});