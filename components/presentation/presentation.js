angular.module('moonshotApp')

.controller('PresentationCtrl', function($scope, $location, Mfly, $stateParams, $state, $localStorage){

  $scope.goToCards = function () {
        $location.url('/cards');
    };

  $scope.toggle = function () {
      $scope.openMenu = true;
  };

  // COLLECTIONS VIEW

  $scope.slides = $localStorage.slides;
  var index = parseInt($stateParams.index);
  
  $scope.slideIndex = index;

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
      // MULTI PAGE DOCUMENT
      if (selectedItem.pages > 0) {
        isMultiPageDocument(selectedItem);
      } 
      // SINGLE PAGE DOCUMENT
      else {

        for (var i = 0; i < $scope.slides.length; i++) {
          if ($stateParams.itemId === $scope.slides[i].id) {
            
            var nextSlideInd = i + 1;
            
            var nextSlide   = $scope.slides[nextSlideInd].id;
            if (nextSlideInd > $scope.slides.length) {
              console.log('youve reached the limit');
            }

            $state.go('presentation', {itemId: nextSlide, collection: collection});
            
          }
        }

      }
  };

  function isMultiPageDocument(slide){
    var pageNum = Number($stateParams.page);
    if (pageNum === slide.pages) {
      // GO TO NEXT SLIDE IN PRESENTATION
      var sameId = _.findWhere($scope.slides, {id: itemId});
      var idIndex = _.indexOf(sameId);
      var nextIndex = idIndex + 1;

      var nextItemId = $scope.slides[nextIndex].id;

      $location.url('/presentation/' + nextItemId + '?collection=' + collection);
    } else {
      var pageNumber = pageNum + 1;
      $location.url('/presentation/' + slide.id + '?collection=' + collection + '&page=' + pageNumber);
    }
  };



});