angular.module('moonshotApp')

.controller('PresentationCtrl', function($scope, $location, $stateParams, $state, Mfly, Present, $localStorage, $mdDialog){ 

  // SHOW FIRST SLIDE
  initCurrentItem();
  function initCurrentItem() {
    $scope.isItemAvailable = false;
    Present.showCurrentItem().then(function(data){
      $scope.isItemAvailable = true;
      $scope.slide = data;
      $scope.slides = Present.data;
    });
  }

  // PRESENTATION CONTROLS
  $scope.goToSelectedItem = function(slugId) {
    Present.getSelectedItem(slugId);
  };

  $scope.previousSlide = function() {
 
  };

  $scope.nextSlide = function() {
    Present.goToNextSlide();
  };


  $scope.isSideNavOpen = false;
  $scope.openPresMenu = function() {
      $scope.isSideNavOpen = !$scope.isSideNavOpen;
  };


  // creates a new collection from the presentation list 
  $scope.createNewCollection = function(itemId , ev) {
    $mdDialog.show({
      controller: 'AddToCollectionCtrl',
      templateUrl: 'common/tmpls/add-to-collection/add-to-collection-modal.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true, 
      locals: {
        item: itemId
      }
    }).then(function() {
        
    });
  };




});