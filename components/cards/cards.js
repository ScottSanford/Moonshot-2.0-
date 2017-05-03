angular.module('moonshotApp')

.controller('CardsCtrl', function($scope, $timeout, $location, Mfly, ItemIcons, MoonshotData, $localStorage, $mdSidenav, $sessionStorage, $state){

    // BEGIN: GET 6 MOONSHOT FOLDERS
    $scope.MoonshotData = MoonshotData;

    MoonshotData.getFolders();

    $scope.getFolderItems = function(_folderId) {

        Mfly.getFolder(_folderId).then(function(folderItems){   
    
            var mIcons = ItemIcons.material();
            
            folderItems.forEach(function(_item){
                mIcons.forEach(function(icon){
                    if (_item.type == icon.type) {
                        _item['icon'] = icon.icon;
                    }
                });

                // check and balance if the card is turned 
                // over that it remains checked. 
                var isSel = false;

                if(MoonshotData.cards[_folderId].itemsObj[_item.id] && 
                    MoonshotData.cards[_folderId].itemsObj[_item.id].hasOwnProperty('isItemSelected') && 
                    MoonshotData.cards[_folderId].itemsObj[_item.id].isItemSelected){
          
                    isSel = true;

                }
                _item.isItemSelected = isSel;

                MoonshotData.cards[_folderId].itemsObj[_item.id] = _item;
             
            });
            
        });

    };

    $scope.resetCollection = function() {
        MoonshotData.resetCollection();
    };

    // Sort
    $scope.openSort = function() {
        $mdSidenav('right').toggle();
    };

    $scope.sortList = $localStorage.slides;

    $scope.connectLists = function() {
        $scope.$broadcast('updateSortList');
    };

    $scope.$on('updateSortList', function(){
        $scope.sortList = $localStorage.slides;
    });

    $scope.sortableOptions = {
        handle: '> .myHandle',
        axis: 'y',
        stop: function(event, ui) {
            var item   = ui.item.scope().item;
            var newIndex = ui.item.sortable.dropindex;

            MoonshotData.presentation = $scope.sortList;
            $localStorage.slides = $scope.sortList;

        }
    };


});


