angular.module('moonshotApp')

.controller('ShareItemCtrl', function($scope, $window, $uibModalInstance, item, Mfly){

	$scope.item = item;

	Mfly.getShare(item.id).then(function(data){
		$scope.shareLink = data.url;
	});

	$scope.deviceType = mflyCommands.getDeviceType();

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

	$scope.cancelClick = function() {
		$uibModalInstance.dismiss('cancel');
	}

});