angular.module('moonshotApp')

.controller('AddToCollectionCtrl', function($scope, $uibModalInstance, item, Mfly){

	Mfly.getShare(item.id).then(function(data){
		$scope.shareLink = data.url;
	});

	$scope.createCollection = function(collectionName) {
		Mfly.createCollection(collectionName).then(function(response){
			Mfly.addItemToCollection(response.id, item.id).then(function(res){
				console.log(res);
			});		
		});
	};

	$scope.cancelClick = function() {
		$uibModalInstance.dismiss('cancel');
	};

});