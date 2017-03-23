angular.module('moonshotApp')

.controller('PresentationCtrl', function($scope, $location, $stateParams, $state, Mfly, Present, $localStorage, $mdDialog){ 
  $scope.currentSlug = $stateParams.slug;
  // SHOW FIRST SLIDE
  initCurrentItem();
  function initCurrentItem() {
    $scope.isItemAvailable = false; // container
    $scope.isFirstPageAvailable = false; // single item
    $scope.isItemInteractive = false; // interactive

    Present.getCurrentItem().then(function(data){

      // check which type of item is being rendered
      if ($stateParams.type === 'interactive') {
        $scope.isItemInteractive = true;
        $scope.verticalAlign = 'stretch';
        mflyCommands.embed($('iFrame#current-slide-interactive'), data.id);
      } else if (data.pages > 1) {
        $scope.isFirstPageAvailable = true;
        $scope.itemPages       = Present.getPageRange(data.pages);
        $scope.selectedItem    = {id: 0, pageNum: parseInt($stateParams.page)};
        mflyCommands.embed($('img#current-slide'), data.id, $stateParams.page);
        $scope.verticalAlign = 'center';
        $scope.slide = data;
      } else {
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

  $scope.previousSlide = function() {
      Present.goToPreviousSlide();
  };

  $scope.nextSlide = function(slide) {
    Present.goToNextSlide(slide);
  };

  $scope.getPageNumber = function(number) {
    console.log(number);
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