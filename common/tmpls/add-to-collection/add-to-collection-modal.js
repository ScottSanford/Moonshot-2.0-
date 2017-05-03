angular.module('moonshotApp')

.controller('AddToCollectionCtrl', function($scope, $uibModal, item, Mfly, $mdDialog, $mdToast){

	Mfly.getShare(item.id).then(function(data){
		$scope.shareLink = data.url;
	});

	Mfly.getCollections().then(function(collections){
		$scope.collections = collections;
	});

	$scope.selectedCollection = null;

	$scope.createCollection = function(selectedCollection, newCollection) {
		// add item to an existing collection
		if (typeof selectedCollection === 'object' && selectedCollection) {
			Mfly.addItemToCollection(selectedCollection.id, item.id).then(function(res){
				// close Modal
				$mdDialog.cancel();
				// open Success Modal
				$mdToast.show({
			    	templateUrl: 'common/tmpls/success-collection/success-collection-modal.html',
			    	hideDelay: 3000,
			    	position: 'top right', 
			    	controller: 'SuccessCollectionModalCtrl',
			    	locals: {
			    		collectionName: selectedCollection.name
			    	}
			    });
			});		
		} 
		// add item to a new collection
		else if (newCollection && typeof newCollection == "string") {

			Mfly.createCollection(newCollection).then(function(response){
				Mfly.addItemToCollection(response.id, item.id).then(function(res){
					// close Modal
					$mdDialog.cancel();
					// open Success Modal
					$mdToast.show({
			    	templateUrl: 'common/tmpls/success-collection/success-collection-modal.html',
			    	hideDelay: 3000,
			    	position: 'top right', 
			    	controller: 'SuccessCollectionModalCtrl',
			    	locals: {
			    		collectionName: newCollection
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