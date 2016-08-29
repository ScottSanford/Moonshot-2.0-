angular.module('moonshotApp')

.controller('PresentationCtrl', function($scope, $stateParams, Mfly, presentation){

  console.log(presentation);

	$scope.goToCards = function () {
        $location.url('/cards');
    };

    $scope.toggle = function () {
        $scope.openMenu = true;
    };

    // COLLECTIONS VIEW
    var createdCollectionId = $stateParams.createdCollection;
   
   	Mfly.getCollection(createdCollectionId).then(function(items){
   		console.log(items);
   		$scope.slides = items[0];
   	});



});