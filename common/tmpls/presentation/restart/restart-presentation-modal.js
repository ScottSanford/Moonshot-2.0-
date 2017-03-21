angular.module('moonshotApp')

.controller('RestartPresCtrl', function($scope, $state, $mdDialog, Present){

	$scope.restart = function() {
		Present.getFirstItem();
		$mdDialog.hide();
	};

	$scope.exit = function() {
		$state.go('present');
		$mdDialog.hide();
	};

});