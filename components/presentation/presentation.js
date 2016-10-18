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

    if (item.type == 'interactive') {

      mflyCommands.embed($('.slide-item'), item.id);

    } 

    else if (item.pages > 0) {

      mflyCommands.embed($('.slide-item'), item.id, page);

    } 

    else {

      $scope.slide = item.resourceUrl;
      
    }
      
  });


  $scope.previousSlide = function() {

    if (selectedItem.pages > 0) {
      multiPagePrevious(selectedItem);
    } else {
      
      for (var i = 0; i < $scope.slides.length; i++) {
        
        if ($stateParams.itemId === $scope.slides[i].id) {
          var index = parseInt($stateParams.index);
          
          var prevSlideIndex = index - 1;
          
          var nextSlide = $scope.slides[prevSlideIndex].id;

          if (prevSlideIndex > $scope.slides.length) {
            console.log('youve reached the limit');
          }

          $state.go('presentation', {itemId: nextSlide, collection: collection, index: prevSlideIndex});
          
        } 
      }

    }


  };

  $scope.nextSlide = function() {
      // MULTI PAGE DOCUMENT
      if (selectedItem.pages > 0) {
        multiPageNext(selectedItem);
      } 
      // SINGLE PAGE DOCUMENT
      else {
        console.log("length :: ", $scope.slides.length);
        for (var i = 0; i < $scope.slides.length; i++) {
          if ($stateParams.itemId === $scope.slides[i].id) {
            var index = parseInt($stateParams.index);
            
            var nextSlideIndex = index + 1;
            
            var nextSlide = $scope.slides[nextSlideIndex].id;

            if (nextSlideIndex > $scope.slides.length) {
              console.log('youve reached the limit');
            }

            $state.go('presentation', {itemId: nextSlide, collection: collection, index: nextSlideIndex});
            
          }
        }

      }
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