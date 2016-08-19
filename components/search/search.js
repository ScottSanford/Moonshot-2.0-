angular.module('moonshotApp')

.controller('SearchCtrl', function($scope, $location, $uibModal, Mfly, ItemIcons){

	$scope.toggle = function () {
        $scope.openMenu = true;
    };

    $scope.goToCards = function() {
        $location.url('/cards');
    }

    //

    $scope.getSearch = function(_term) {
       
        Mfly.search(_term).then(function(results){
            
            if (results.length == 0) {
                $scope.showSearchResults = false;
                $scope.noSearchResults = true;
                $scope.term = _term;
                $scope.searchTerm = '';
            } else {

                // highlight first item
                var first = _.first(results);
                $scope.toggleSearchResult = first.id;
                $scope.selectedResult = first;
         
                results.forEach(function(item, index, array){
                    
                    // add folder count
                    if (item.type == 'folder') {
                        Mfly.getFolder(item.id).then(function(data){
                            $scope.folderCount = data.length;
                        });
                    }

                    ItemIcons.forEach(function(icon){
                        
                        if (item.type == icon.type) {
                            item['icon'] = icon.icon;
                        }

                    });


                });
                
                $scope.term = _term;

                $scope.noSearchResults = false;
                $scope.showSearchResults = true;
                $scope.results = results;
                $scope.searchTerm = '';
                
            } 

		});
    };

    $scope.toggleItem = function(item) {
    	console.log(item);
    	$scope.toggleSearchResult = item.id;
    	$scope.selectedResult = item;
    };

    $scope.goToPath = function(item) {
        mflyCommands.openFolder(item.id);
    };

    $scope.openShareModal = function(selectedItem) {
        $uibModal.open({
            templateUrl: 'common/tmpls/share-item/share-item-modal.html',
            controller: 'ShareItemCtrl',
            resolve: {
                item: function() {
                    return selectedItem;
                }
            }
        });
    };

    $scope.openCollectionModal = function(selectedItem) {
        $uibModal.open({
            templateUrl: 'common/tmpls/add-to-collection/add-to-collection-modal.html',
            controller: 'AddToCollectionCtrl',
            resolve: {
                item: function() {
                    return selectedItem;
                }
            }
        });
    };

});