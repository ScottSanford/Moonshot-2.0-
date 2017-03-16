angular.module('moonshotApp')

.controller('HierachyDetailsCtrl', function($scope, $location, $stateParams, Mfly, ItemIcons, $mdDialog){

    var mIcons = ItemIcons.material();
    var hid = $stateParams.hid;

    // SUBHEADER
    Mfly.getItem(hid).then(function(data){
      $scope.folder = data;
    });

    // DISPLAY ITEMS
    Mfly.getFolder(hid).then(function(hierarchy){
      
      hierarchy.forEach(function(_item){
                
                mIcons.forEach(function(icon){
                    if (_item.type == icon.type) {
                        _item['icon'] = icon.icon;
                    }
                });
        });

        $scope.items = hierarchy;

    });

    $scope.goToFolder = function(item) {
      if (item.name == 'Home') {
        $location.url('/hierarchy');
      } else {
        var folderUrl = '/hierarchy/' + item.id;
        $location.url(folderUrl);
      }
    };

    $scope.goToItem = function(item) {
      if (item.type !== 'folder') {
        mflyCommands.openItem(item.id);
      } else {
        var folderUrl = '/hierarchy/' + item.id;
        $location.url(folderUrl);
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


