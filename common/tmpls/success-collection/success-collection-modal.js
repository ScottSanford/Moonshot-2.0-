angular.module('moonshotApp')

.controller('SuccessCollectionModalCtrl', function($scope, $timeout, $uibModalInstance, collection, Mfly){

	$scope.collectionName = collection;

	$timeout(function(){
		$uibModalInstance.dismiss('cancel');
	}, 3000);

});