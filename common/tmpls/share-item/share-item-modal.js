angular.module('moonshotApp')

.controller('ShareItemCtrl', function($scope, $window, item, Mfly, $mdDialog, $mdToast){

	$scope.item = item;

	Mfly.getItem(item.id).then(function(data){
		$scope.shareLinkName = data.name;
	});

	Mfly.getShare(item.id).then(function(data){
		$scope.shareLink = data.url;
	});

	$scope.deviceType = mflyCommands.getDeviceType();

	$scope.showSimpleToast = function() {
	    $mdToast.show({
	    	templateUrl: 'common/tmpls/toast/toast.html',
	    	hideDelay: 3000,
	    	position: 'top right'
	    });
	};

	$scope.closeDialog = function() {
		$mdDialog.cancel();
	};

});