angular.module('moonshotApp')

.controller('DeleteCollectionCtrl', function($scope, $state, $location, $rootScope, $uibModal, $uibModalInstance, Mfly, collectionID){

	$scope.deleteCollection = function() {
		mflyCommands.deleteCollection(collectionID, false);
		// not updating list
		$rootScope.$broadcast('updateList');
		$uibModalInstance.dismiss('cancel');
		if ($state.current.name === 'details') {
			$location.url('/collections');
		}
	};

	$scope.cancelClick = function() {
		$uibModalInstance.dismiss('cancel');
	};

});