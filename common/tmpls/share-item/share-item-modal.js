angular.module('moonshotApp')

.controller('ShareItemCtrl', function($scope, $window, item, Mfly, $mdDialog, $mdToast){

	$scope.item = item;

	Mfly.getShare(item.id).then(function(data){
		$scope.shareLink = data.url;
	});

	$scope.deviceType = mflyCommands.getDeviceType();

	$scope.showSimpleToast = function() {
		// var pinTo = $scope.getToastPosition();

	    $mdToast.show({
	    	templateUrl: 'common/tmpls/toast/toast.html',
	    	hideDelay: 3000,
	    	position: 'top right'
	    })

	};

	$scope.sendEmail = function() {
		
		var message = "Please use this link to access your content: " + $scope.shareLink;

	    Mfly.getInteractiveInfo().then(function(info){
			var subject =  info.user + " has shared a file with you."
	        createEmail(subject, message);
	    });
	};

	function createEmail(subject, message) {
		$window.open("mailto:?subject=" + subject + "&body=" + message, "_self");
	};

	$scope.closeDialog = function() {
		$mdDialog.cancel();
	};

});