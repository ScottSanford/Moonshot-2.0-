angular.module('moonshotApp')

.controller('AddToCollectionCtrl', function($scope, $uibModal, item, Mfly, $mdDialog){

	Mfly.getShare(item.id).then(function(data){
		$scope.shareLink = data.url;
	});

	Mfly.getCollections().then(function(collections){
		$scope.collections = collections;
	});

	$scope.selectedCollection = null;

	$scope.createCollection = function(selectedCollection, newCollection) {
		if (typeof selectedCollection === 'object' && selectedCollection) {
			Mfly.addItemToCollection(selectedCollection.id, item.id).then(function(res){
				// close Modal
				$mdDialog.cancel();
				// open Success Modal
				$uibModal.open({
		            templateUrl: 'common/tmpls/success-collection/success-collection-modal.html',
		            controller: 'SuccessCollectionModalCtrl',
		            backdrop: false,
		            resolve: {
		                collection: function() {
		                    return selectedCollection;
		                }
		            }
		        });
			});		
		} else if (newCollection && typeof newCollection == "string") {

			Mfly.createCollection(newCollection).then(function(response){
				Mfly.addItemToCollection(response.id, item.id).then(function(res){
					// close Modal
					$mdDialog.cancel();
					// open Success Modal
					$uibModal.open({
			            templateUrl: 'common/tmpls/success-collection/success-collection-modal.html',
			            controller: 'SuccessCollectionModalCtrl',
			            backdrop: false,
			            resolve: {
			                collection: function() {
			                    return response;
			                }
			            }
			        });
				});		
			});
			
		} else {
			$scope.pageError = true;
		};
 		

	};

	$scope.addItemToCollection = function(collection) {
		console.log(collection);
	
	};

	$scope.closeDialog = function() {
		$mdDialog.cancel();
	};

});