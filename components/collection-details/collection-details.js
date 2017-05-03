angular.module('moonshotApp')

.controller('CollectionDetailCtrl', function(
        $scope, $window, $location, $stateParams, 
        Mfly, ItemIcons, $uibModal, 
        $localStorage, $mdDialog, MoonshotData, $state){

    var cid = $stateParams.collectionID;  
    var deviceType = mflyCommands.getDeviceType();

    console.log($location.url());

    // returns overview of collections
    Mfly.getCollections().then(function(collections){
        for (var i = 0; i < collections.length; i++) {
            // iOS returns slug 
            // web returns id
            if ((deviceType === 'web' || deviceType == 'desktop') && cid === collections[i].id) {
                $scope.cName     = collections[i].name;
                $scope.cCreated  = collections[i].created;
                $scope.cModified = collections[i].modified;
                Mfly.getCollection(cid).then(function(items){
                    $scope.selectedCollection = items;
                });
            } else if (deviceType === 'mobile' &&  cid === collections[i].slug) {
                $scope.cName     = collections[i].name;
                $scope.cCreated  = collections[i].created;
                $scope.cModified = collections[i].modified;
                Mfly.getCollection(collections[i].id).then(function(items){
                    $scope.selectedCollection = items;
                });
            }

            
        }

    });

    $scope.goToPath = function(item) {
        mflyCommands.openFolder(item.id);
    };

    // sort items in collection
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
            
            var mIcons = ItemIcons.material();

            collection.forEach(function(item){
                
                mIcons.forEach(function(icon){     
                    if (item.type == icon.type) {
                        item['icon'] = icon.icon;
                    }

                });

            });

            MoonshotData.playCollection(collection);
                
        });


    };



});