angular.module('moonshotApp')

.controller('CollectionsCtrl', 
    function($scope, $window, $location, 
             $stateParams, Mfly, ItemIcons, 
             $uibModal, PresentationService){

	$scope.goToCards = function () {
        $location.url('/cards');
    };

    $scope.toggle = function () {
        $scope.openMenu = true;
    };

    // COLLECTIONS VIEW
    
    Mfly.getCollections().then(function(collections){
        $scope.collections = collections;
    });

    $scope.$on("updateList",function(){
        $window.location.reload();
    });

    $scope.createNewCollection = function() {
        $uibModal.open({
            templateUrl: 'common/tmpls/new-collection/new-collection.html',
            controller: 'NewCollectionCtrl'
        });
    };

    $scope.deleteCollection = function(id){
        $uibModal.open({
            templateUrl: 'common/tmpls/delete-collection/delete-collection.html',
            controller: 'DeleteCollectionCtrl',
            resolve: {
                collectionID: function() {
                    return id;
                }
            }
        });
    };


});