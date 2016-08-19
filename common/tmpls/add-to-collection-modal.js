angular.module('moonshotApp')

.controller('AddToCollectionCtrl', function($scope, $uibModalInstance, item, Mfly){

	Mfly.getShare(item.id).then(function(data){
		$scope.shareLink = data.url;
	});

	$scope.cancelClick = function() {
		$uibModalInstance.dismiss('cancel');
	}

});