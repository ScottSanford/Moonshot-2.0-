angular.module('moonshotApp')

.controller('PresentationCtrl', function($scope, $stateParams, Mfly){

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
   	});



});