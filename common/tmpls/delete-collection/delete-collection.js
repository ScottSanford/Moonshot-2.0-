angular.module('moonshotApp')

.controller('DeleteCollectionCtrl', function($scope, $state, $location, $rootScope, Mfly, collectionId, $mdDialog){

	$scope.deleteCollection = function() {
		console.log(collectionId);
		mflyCommands.deleteCollection(collectionId, false);
		// not updating list
		$rootScope.$broadcast('updateList');
		if ($state.current.name === 'details') {
			$location.url('/collections');
		}
	};

	$scope.closeDialog = function() {
		$mdDialog.cancel();
	};

});