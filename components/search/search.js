angular.module('moonshotApp')

.controller('SearchCtrl', function($scope, $timeout, $location, $uibModal, Mfly, ItemIcons, $mdDialog, $stateParams){
    var qTerm = $stateParams.term;

    // $scope.getSearch = function(qTerm) {
        if (qTerm) {
            $scope.showSpinner        = true;
            $scope.isSearchTrue       = false;
            $scope.showSuggestedItems = false;
            $scope.showItemResults    = false;
            
            $scope.showFolderIcon  = true;
            $scope.noSearchResults = false;
            $scope.searchTerm      = '';

            Mfly.search(qTerm).then(function(results){
                
                if (results.length == 0) {

                    $timeout(function(){
                        $scope.showSpinner        = false;
                        $scope.showSuggestedItems = false;
                        $scope.showItemResults    = false;
                        $scope.noSearchResults    = true;
                        $scope.term = qTerm;
                    }, getRandomLoadTime(500,2000));

                } else {
                    // highlight first item
                    var first = _.first(results);
                    $scope.selectedResult = first;
             
                    results.forEach(function(item, index, array){
                        
                        // add folder count
                        if (item.type == 'folder') {
                            Mfly.getFolder(item.id).then(function(data){
                                $scope.folderCount = data.length;
                            });
                        };

                        var mIcons = ItemIcons.material();

                        mIcons.forEach(function(icon){
                            
                            if (item.type == icon.type) {
                                item['icon'] = icon.icon;
                            }

                        });


                    });
                    
                    $timeout(function() {

                        $scope.showSpinner        = false;
                        $scope.term               = qTerm;
                        $scope.isSearchTrue       = true;
                        $scope.showSuggestedItems = false;
                        $scope.noSearchResults    = false;
                        $scope.showItemResults    = true;
                        $scope.showFolderIcon     = true;
                        $scope.results            = results;

                    },getRandomLoadTime(500,2000));

                } 

                function getRandomLoadTime(min, max) {
                  return Math.random() * (max - min) + min;
                }

            });
        }
        
    // };

    $scope.getItems = function() {
        $scope.showFolderResults = false;
        $scope.showGrid          = false;
        $scope.showItemResults   = true;
        $scope.showFolderIcon    = true;
    };

    $scope.getFolders = function() {
        $scope.showItemResults   = false;
        $scope.showGrid          = false;
        $scope.showFolderResults = true;
        $scope.showFolderIcon    = false;
    };

    $scope.getImages = function() {
        $scope.showItemResults   = false;
        
        $scope.showGrid          = true;
        $scope.showFolderResults = false;
        $scope.showFolderIcon    = false;
    };

    $scope.selectedChipIndex = 'firstChipAll';
    $scope.getSearchType = function(filterType, index) {
        
        $scope.selectedChipIndex = index;

        if (filterType == 'all' && index == 'firstChipAll') {
            $scope.selectedChipIndex = 'firstChipAll';
            $scope.searchType = null;
        } else {
            $scope.searchType = {
                type: filterType
            };
        }
    };

    $scope.selectedIndex = 0;
    $scope.selectItem = function(item, index) {
        if ($scope.selectedIndex === null) {
          $scope.selectedIndex = index;
        }
        else if ($scope.selectedIndex === index) {
          $scope.selectedIndex = null;
        }
        else {
          $scope.selectedIndex = index;
        }

    	$scope.selectedResult = item;
    };

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
        console.log(selectedItem);
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