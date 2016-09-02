angular.module('moonshotApp')

.controller('PresentationCtrl', function($scope, $location, Mfly, $stateParams, $localStorage){

  $scope.goToCards = function () {
        $location.url('/cards');
    };

  $scope.toggle = function () {
      $scope.openMenu = true;
  };

  // COLLECTIONS VIEW

  $scope.slides = $localStorage.slides;

  $scope.slideIndex = 0;

  // BEGIN: SLIDE
  var itemId     = $stateParams.itemId;
  var collection = $stateParams.collection;
  var page       = $stateParams.page;
  var selectedItem;

  Mfly.getItem(itemId).then(function(item){
    selectedItem = item;
    if (item.pages > 0) {
      mflyCommands.embed($('.slide-item'), item.id, page);
    } else {
      $scope.slide = item.resourceUrl;
    }
      
  });


  $scope.previousSlide = function() {

  };

  $scope.nextSlide = function() {
      if (selectedItem.pages > 0) {
        isMultiPageDocument(selectedItem);
      } else {
        console.log('some code will go here');
      }
  };

  function isMultiPageDocument(slide){
    var pageNum = Number($stateParams.page);
    if (pageNum === slide.pages) {
      console.log('same page number');
      // GO TO NEXT SLIDE IN PRESENTATION
      var sameId = _.findWhere($scope.slides, {id: itemId});
      var idIndex = _.indexOf(sameId);
      var nextIndex = idIndex + 1;

      var nextItemId = $scope.slides[nextIndex].id;
      
      $location.url('/presentation/' + nextItemId + '?collection=' + collection);
    } else {
      console.log('lower page number');
      var pageNumber = page + 1;
      $location.url('/presentation/' + slide.id + '?collection=' + collection + '&page=' + pageNumber);
    }
  };



});