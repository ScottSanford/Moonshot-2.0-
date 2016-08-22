angular.module('moonshotApp')

.controller('CollectionsCtrl', function($scope, $window, $location, $stateParams, Mfly, ItemIcons, $uibModal){

	$scope.goToCards = function () {
        $location.url('/cards');
    };

    $scope.goToCollectionList = function() {
        $location.url('/collections');
    };

    $scope.toggle = function () {
        $scope.openMenu = true;
    };

    // COLLECTIONS VIEW
    
    Mfly.getCollections().then(function(collections){
        console.log(collections);
        $scope.collections = collections;

    });

    $scope.$on("updateList",function(){
        $window.location.reload();
    });

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

    // COLLECTION VIEW

    var collectionId = $stateParams.id;
    function showCollectionDetails(id) {
        Mfly.getCollection(id).then(function(items){
            ItemIcons.forEach(function(icon){                     
                if (items.type == icon.type) {
                    items['icon'] = icon.icon;
                }
            });
            console.log('Collection Items', items);
            $scope.selectedCollection = items;
        });
    }

    showCollectionDetails(collectionId);



});