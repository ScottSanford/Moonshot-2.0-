angular.module('moonshotApp')

.controller('CollectionsCtrl', 
    function($scope, $window, $location, $stateParams, Mfly, 
             ItemIcons, $uibModal, $mdDialog){
   
    // COLLECTIONS VIEW 
    Mfly.getCollections().then(function(collections){
        $scope.collections = collections;
    });

    $scope.$on("updateList",function(){
        $window.location.reload();
    });

    $scope.createNewCollection = function(ev) {
        $mdDialog.show({
          controller: 'NewCollectionCtrl',
          templateUrl: 'common/tmpls/new-collection/new-collection.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true
        }).then(function() {

        });
    };

    $scope.deleteCollection = function(ev, id){
        $mdDialog.show({
          controller: 'DeleteCollectionCtrl',
          templateUrl: 'common/tmpls/delete-collection/delete-collection.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true, 
          locals: {
            collectionId: id
          }
        }).then(function() {
            
        });
    };


});