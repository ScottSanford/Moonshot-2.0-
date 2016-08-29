angular.module('moonshotApp')

.controller('DeleteCollectionCtrl', function($scope, $state, $location, $rootScope, $uibModal, $uibModalInstance, cid, Mfly){

	console.log('Collection ID ', cid);

	$scope.deleteCollection = function() {

		mflyCommands.deleteCollection(cid, false);
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