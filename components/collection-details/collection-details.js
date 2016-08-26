angular.module('moonshotApp')

.controller('CollectionDetailCtrl', function($scope, $window, $location, $stateParams, Mfly, ItemIcons, $uibModal){

    $scope.goToCollectionList = function() {
        $location.url('/collections');
    };

    $scope.toggle = function () {
        $scope.openMenu = true;
    };

    var collectionName     = $stateParams.name;
    var collectionId       = $stateParams.id;  
    var collectionCreated  = $stateParams.created;
    var collectionModified = $stateParams.modified;

    // ITEMS TAB

    $scope.collectionName = collectionName;
    $scope.collectionCreated = collectionCreated;
    $scope.collectionModified = collectionModified;

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

    // EDIT TAB

    $scope.deleteClick = function() {
        $uibModal.open({
            templateUrl: 'common/tmpls/delete-collection/delete-collection.html',
            controller: 'DeleteCollectionCtrl',
            resolve: {
                collectionID: function() {
                    return collectionId;
                }
            }
        });
    };  

    $scope.playCollection = function() {

    };



});