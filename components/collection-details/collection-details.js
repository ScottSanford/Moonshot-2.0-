angular.module('moonshotApp')

.controller('CollectionDetailCtrl', function(
        $scope, $window, $location, $stateParams, Mfly, $uibModal, 
        $localStorage, ItemIcons, $mdDialog){

    $scope.goToCollectionList = function() {
        $location.url('/collections');
    };

    $scope.toggle = function () {
        $scope.openMenu = true;
    };

    var cid = $stateParams.cid;  
    // ITEMS TAB


    function showCollectionDetails(id) {
        
        Mfly.getCollections().then(function(collections){
            
            collections.forEach(function(collection){
                if (collection.id === cid) {
                    console.log(collection);
                    $scope.cName     = collection.name;
                    $scope.cCreated  = collection.created;
                    $scope.cModified = collection.modified;

                }
            });

        });

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

    $scope.deleteClick = function(ev) {
        $mdDialog.show({
          controller: 'DeleteCollectionCtrl',
          templateUrl: 'common/tmpls/delete-collection/delete-collection.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true, 
          locals: {
            collectionId: cid
          }
        }).then(function() {
            
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