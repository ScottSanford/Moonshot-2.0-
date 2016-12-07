angular.module('moonshotApp')

.controller('CardsCtrl', function($scope, $location, Mfly, ItemIcons, MoonshotData, $localStorage, $mdSidenav, $http, $sessionStorage){

    var user = "ssanford@mediafly.com";
    var pass = "Kiyo$aki123";

    var url = "https://accounts.mediafly.com/api/3.0/authentication/authenticate?username=" + user + "&password=" + pass;
    
    var token = $sessionStorage.token;
    
    // if (!token) {
    //     $http.post(url)
    //         .success(function(data){
    //             $sessionStorage.token = data.accessToken;
                
    //         })
    // } else {
    //     var id = 'f61ef3521a9b458eb757b619e2e4c39eproduct267820';
    //     var params = {
    //         accessToken: token, 
    //         productId: id,
    //         daterangefrom: '01/1/2016', 
    //         daterangeto: '12/01/2016'
    //     }
    //     var warehouseUrl = "https://warehouseapi.mediafly.com/reports/data/ViewsByUser";

    //     $http({
    //         method: 'GET', 
    //         url: warehouseUrl, 
    //         params: params 
    //     }).success(function(data){
    //         console.log(data);
    //     }).error(function(response, status){
    //         console.log("res:: ", response, status);
    //     })
    // }




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