angular.module('moonshotApp')

.controller('CollectionDetailCtrl', function(
        $scope, $window, $location, 
        $stateParams, Mfly, $uibModal, 
        $localStorage, ItemIcons){

    $scope.goToCollectionList = function() {
        $location.url('/collections');
    };

    $scope.toggle = function () {
        $scope.openMenu = true;
    };

    var cid = $stateParams.cid;  
    // ITEMS TAB

    Mfly.getCollections().then(function(collections){
        
        collections.forEach(function(collection){
            if (collection.id === cid) {
                
                $scope.cName     = collection.name;
                $scope.cCreated  = collection.created;
                $scope.cModified = collection.modified;

            }
        });

    });

    function showCollectionDetails(id) {
        Mfly.getCollection(id).then(function(items){
            
            $scope.selectedCollection = items;

        });
    }

    showCollectionDetails(cid);

    $scope.goToPath = function(item) {
        mflyCommands.openFolder(item.id);
    };

    $scope.sortableOptions = {
        handle: '.myHandle',
        stop: function(event, ui) {
            var itemId   = ui.item.scope().item.id;
            var newIndex = ui.item.sortable.dropindex;

            mflyCommands.reorderItemInCollection(cid, itemId, newIndex);
        }
    };

    $scope.removeItemFromCollection = function(_itemId) {
        mflyCommands.removeItemFromCollection(cid, _itemId);
        $window.location.reload();
    };

    // EDIT TAB

    $scope.deleteClick = function() {
        $uibModal.open({
            templateUrl: 'common/tmpls/delete-collection/delete-collection.html',
            controller: 'DeleteCollectionCtrl',
            resolve: {
                collectionID: function() {
                    return cid;
                }
            }
        });
    };  

    $scope.playCollection = function() {

        
        Mfly.getCollection(cid).then(function(collection){
            
            var firstItem = _.head(collection);

            Mfly.getItem(firstItem).then(function(item){
                if (item.pages >= 1) {
                    $location.url('/presentation/' + firstItem + '?collection=' + cid + '&page=' + 1 + '&index=' + 0);
                }
            });
            
            $localStorage.slides = collection;

            collection.forEach(function(item){
                
                ItemIcons.forEach(function(icon){     
                    if (item.type == icon.type) {
                        item['icon'] = icon.icon;
                    }

                });

            });

                
            $location.url('/presentation/' + firstItem.id + '?collection=' + cid + '&index=' + 0);
                
        });


    };



});