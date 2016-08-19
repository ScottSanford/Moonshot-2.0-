angular.module('moonshotApp')

.controller('ShareItemCtrl', function($scope, $location, item, Mfly){

	Mfly.getShare(item.id).then(function(data){
		$scope.shareLink = data.url;
	});

});