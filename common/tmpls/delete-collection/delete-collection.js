angular.module('moonshotApp')

.controller('DeleteCollectionCtrl', function($scope, $rootScope, $uibModal, $uibModalInstance, collectionID, Mfly){

	console.log('Collection ID ', collectionID);

	$scope.deleteCollection = function() {
		mflyCommands.deleteCollection(collectionID, false);
		$rootScope.$broadcast('updateList');
		$uibModalInstance.dismiss('cancel');
	};

	$scope.cancelClick = function() {
		$uibModalInstance.dismiss('cancel');
	};

});