angular.module('moonshotApp')

.controller('HierachyCtrl', function($scope, $location, Mfly, ItemIcons, $mdDialog){

    var mIcons = ItemIcons.material();

    // FOR: FOLDER LIST PAGE
    Mfly.getFolder('__root__').then(function(hierarchy){
      
        hierarchy.forEach(function(_item){
                
                mIcons.forEach(function(icon){
                    if (_item.type == icon.type) {
                        _item['icon'] = icon.icon;
                    }
                });
        });

        $scope.folders = hierarchy;
        
    });

    $scope.goToPath = function(item) {

        if (item.type == "folder") {
            mflyCommands.openFolder(item.id);
        } else {
            mflyCommands.openItem(item.id);
        }
        
    };

    $scope.openShareModal = function(selectedItem, ev) {

        $mdDialog.show({
          controller: 'ShareItemCtrl',
          templateUrl: 'common/tmpls/share-item/share-item-modal.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true, 
          locals: {
            item: selectedItem
          }
        }).then(function() {
            
        });

    };

    $scope.openCollectionModal = function(selectedItem, ev) {
        
        $mdDialog.show({
          controller: 'AddToCollectionCtrl',
          templateUrl: 'common/tmpls/add-to-collection/add-to-collection-modal.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true, 
          locals: {
            item: selectedItem
          }
        }).then(function() {
            
        });
       
    };

});


