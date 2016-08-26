angular.module('moonshotApp')

.controller('DeleteCollectionCtrl', function($scope, $state, $location, $rootScope, $uibModal, $uibModalInstance, collectionID, Mfly){

	console.log('Collection ID ', collectionID);

	$scope.deleteCollection = function() {

		mflyCommands.deleteCollection(collectionID, false);
		$rootScope.$broadcast('updateList');
		$uibModalInstance.dismiss('cancel');
		if ($state.current.name === 'detail') {
			$location.url('/collections');
		}
	};

	$scope.cancelClick = function() {
		$uibModalInstance.dismiss('cancel');
	};

});