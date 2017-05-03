angular.module('moonshotApp')

.controller('PresentationCtrl', function($scope, $location, $stateParams, $state, Mfly, Present, $localStorage, $mdDialog){ 
  $scope.currentSlug = $stateParams.slug;
  // SHOW FIRST SLIDE
  initCurrentItem();
  function initCurrentItem() {
    $scope.isItemAvailable       = false; // container
    $scope.isFirstPageAvailable  = false; // single item
    $scope.isItemInteractive     = false; // interactive
    $scope.showMultiPageSelector = false; // multipage dropdown
    $scope.verticalAlign         = 'center';

    Present.getCurrentItem().then(function(data){

      // check which type of item is being rendered
      // is item an Interactive? 
      if ($stateParams.type === 'interactive' || $stateParams.type === 'zip') {
        $scope.isItemInteractive = true;
        $scope.verticalAlign = 'stretch';
        mflyCommands.embed($('iFrame#current-slide-interactive'), data.id);
      } 
      // is item a multi-page document? 
      else if (data.pages > 1) {
        $scope.isFirstPageAvailable = true;
        $scope.itemPages       = Present.getPageRange(data.pages);
        var selItemID = parseInt($stateParams.page) - 1;
        $scope.selectedItem    = {id: selItemID, pageNum: parseInt($stateParams.page)};
        $scope.showMultiPageSelector = true;
        mflyCommands.embed($('img#current-slide'), data.id, parseInt($stateParams.page));
        $scope.verticalAlign = 'stretch';
        $scope.slide = data;
      } 
      // is item a single page document? 
      else {
        $scope.isFirstPageAvailable = true;
        $scope.slide = data;
        $scope.verticalAlign = 'center';
      }
      
      // hide loading spinner
      $scope.isItemAvailable = true;
      // make sure sidenav is up to date with all slides
      $scope.slides = $localStorage.slides;

    });
  }

  // PRESENTATION CONTROLS
  $scope.goToSelectedItem = function(item) {
    Present.setSelectedItem(item);
  };

  $scope.previousSlide = function(slide) {
      Present.goToPreviousSlide(slide);
  };

  $scope.nextSlide = function(slide) {
    Present.goToNextSlide(slide);
  };

  $scope.getPageNumber = function(number) {
    Present.setMultiPageItemURL($stateParams.slug, number.pageNum);
  };





  $scope.isSideNavOpen = false;
  $scope.openPresMenu = function() {
      $scope.isSideNavOpen = !$scope.isSideNavOpen;
  };


  // creates a new collection from the presentation list 
  $scope.createNewCollection = function(item , ev) {
    $mdDialog.show({
      controller: 'AddToCollectionCtrl',
      templateUrl: 'common/tmpls/add-to-collection/add-to-collection-modal.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true, 
      locals: {
        item: item
      }
    }).then(function() {
        
    });
  };




});