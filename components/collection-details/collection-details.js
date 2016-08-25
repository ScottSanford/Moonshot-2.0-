angular.module('moonshotApp')

.controller('CollectionDetailCtrl', function($scope, $window, $location, $stateParams, Mfly, ItemIcons){

    $scope.goToCollectionList = function() {
        $location.url('/collections');
    };

    $scope.toggle = function () {
        $scope.openMenu = true;
    };


    // COLLECTION VIEW
    var collectionName = $stateParams.name;
    var collectionId   = $stateParams.id;

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
            console.log(items);
            $scope.selectedCollection = items;

        });
    }

    showCollectionDetails(collectionId);

    $scope.goToPath = function(item) {
        mflyCommands.openFolder(item.id);
    };

    $scope.sortableOptions = {
        handle: '.myHandle',
        stop: function(event, ui) {
            var itemId   = ui.item.scope().item.id;
            var newIndex = ui.item.sortable.dropindex;

            mflyCommands.reorderItemInCollection(collectionId, itemId, newIndex);
        }
    };

    $scope.removeItemFromCollection = function(_itemId) {
        mflyCommands.removeItemFromCollection(collectionId, _itemId);
        $window.location.reload();
    };


});