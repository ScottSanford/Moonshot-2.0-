angular.module('moonshotApp')

.controller('FilteredSearchCtrl', function($scope, $state, $location, $mdDialog, Mfly, $localStorage){

	var formats = [
		{format:'Folder', value: 'folder'},
		{format:'PDF', value: 'pdf'},
		{format:'Video', value: 'video'},
		{format:'Image', value: 'jpg'},
		{format:'Interactive', value: 'interactive'}
	];

	$scope.formats = formats;

	$scope.createFilter = function(key, format) {
		var filterObj = {
			keywords: key, 
			type: format
		};

		// $localStorage.filteredSearch = filterObj;
		// $scope.filterObj = filterObj;
		$mdDialog.hide(filterObj);
	};

	$scope.closeDialog = function() {
		$mdDialog.cancel();
	};

});