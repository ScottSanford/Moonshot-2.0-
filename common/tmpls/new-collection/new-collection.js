angular.module('moonshotApp')

.controller('NewCollectionCtrl', function($scope, $rootScope, Mfly){

	$scope.createCollection = function(_collectionName) {
		Mfly.createCollection(_collectionName).then(function(response){
		});
		$rootScope.$broadcast('updateList');
	};

	$scope.cancelClick = function() {

	};

});