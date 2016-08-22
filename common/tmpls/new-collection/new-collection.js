angular.module('moonshotApp')

.controller('NewCollectionCtrl', function($scope, $rootScope, $uibModalInstance, Mfly){

	$scope.createCollection = function(_collectionName) {
		Mfly.createCollection(_collectionName).then(function(response){
		});
		$rootScope.$broadcast('updateList');
		$uibModalInstance.dismiss('cancel');
	};

	$scope.cancelClick = function() {
		$uibModalInstance.dismiss('cancel');
	};

});