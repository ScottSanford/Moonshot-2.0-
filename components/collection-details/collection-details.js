angular.module('moonshotApp')

.controller('CollectionDetailCtrl', function($scope, $location, $stateParams, Mfly, ItemIcons){

    $scope.goToCollectionList = function() {
        $location.url('/collections');
    };

    $scope.toggle = function () {
        $scope.openMenu = true;
    };


    // COLLECTION VIEW
    var collectionName    = $stateParams.name;
    var collectionId      = $stateParams.id;

    $scope.collectionName = collectionName;

    function showCollectionDetails(id) {
        Mfly.getCollection(id).then(function(items){
            
            items.forEach(function(item){
                
                ItemIcons.forEach(function(icon){                     
                    if (item.type == icon.type) {
                        item['icon'] = icon.icon;
                    }
                });
                
            });

            $scope.selectedCollection = items;

        });
    }

    showCollectionDetails(collectionId);

    $scope.sortableOptions = {
        handle: '.myHandle',
        stop: function(event, ui) {
            var itemId   = ui.item.scope().item.id;
            console.log(itemId);
            var newIndex = ui.item.sortable.dropindex;
            console.log(collectionId);
            mflyCommands.reorderItemInCollection('44fc80a55bf844a6aee21aec72e12158', 'f61ef3521a9b458eb757b619e2e4c39eproduct122386', 0);
        }
    };

    $scope.removeItemFromCollection = function(_itemId) {
        mflyCommands.removeItemFromCollection(collectionId, _itemId);
    };


});