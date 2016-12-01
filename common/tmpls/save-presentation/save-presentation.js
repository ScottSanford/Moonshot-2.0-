angular.module('moonshotApp')

.controller('SavePresentationCtrl', function($scope, $rootScope, $uibModalInstance, Mfly, $localStorage){

	$scope.savePresentation = function(_collectionName) {
		var slides = $localStorage.slides;
		
		Mfly.createCollection(_collectionName).then(function(response){
			_.each(slides, function(obj){
				console.log(response.id);				
				Mfly.addItemToCollection(response.id, obj.id);
			});
		});
		
		$rootScope.$broadcast('updateList');
		$uibModalInstance.dismiss('cancel');
	};

	$scope.cancelClick = function() {
		$uibModalInstance.dismiss('cancel');
	};

});