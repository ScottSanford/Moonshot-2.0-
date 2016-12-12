angular.module('moonshotApp')

.controller('CardsCtrl', function($scope, $location, Mfly, ItemIcons, MoonshotData, $localStorage, $mdSidenav, $http, $sessionStorage){

    $scope.openSort = function() {
        $mdSidenav('left').toggle();
    };  

    var lsSlides = $localStorage.slides;

    $scope.sortList = lsSlides;

    // BEGIN: GET 6 MOONSHOT FOLDERS
    $scope.MoonshotData = MoonshotData;

    
    MoonshotData.getFolders();

    $scope.getFolderItems = function(_folderId) {

        Mfly.getFolder(_folderId).then(function(folderItems){   
        console.log(folderItems); 
            
            folderItems.forEach(function(_item){
                
                ItemIcons.forEach(function(icon){
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

    $scope.viewCardItem = function(_itemId) {
        // open in modal
        Mfly.openItem(_itemId);
    }



});