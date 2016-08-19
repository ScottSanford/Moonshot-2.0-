angular.module('moonshotApp')

.controller('AddToCollectionCtrl', function($scope, $uibModal, $uibModalInstance, item, Mfly){

	Mfly.getShare(item.id).then(function(data){
		$scope.shareLink = data.url;
	});

	$scope.createCollection = function(collectionName) {
		
		if (collectionName !== undefined) {
			Mfly.createCollection(collectionName).then(function(response){
				Mfly.addItemToCollection(response.id, item.id).then(function(res){
					// close Modal
					$uibModalInstance.dismiss('cancel');
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

	$scope.cancelClick = function() {
		$uibModalInstance.dismiss('cancel');
	};

});