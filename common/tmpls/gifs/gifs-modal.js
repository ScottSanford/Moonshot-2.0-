angular.module('moonshotApp')

.controller('GifsCtrl', function($scope, $http, $mdDialog){

	var apiKey = 'dc6zaTOxFJmzC';
	var url    = 'https://api.giphy.com/v1/gifs/search';
	var tags   = ['just do it', 'thumbs up', 'you can do this', 'motivation', 'motivation speech'];
	var random = tags[Math.floor(Math.random() * tags.length)];
	var params = {
		api_key: apiKey, 
		q: random, 
		limit:100
	};


	function getGif(url, params){
		$scope.noGifs      = false;
		$http({
			method: 'GET', 
			url: url, 
			params: params
		}).success(function(response){
			var randomGif = response.data[Math.floor(Math.random() * response.data.length)];
			$scope.giphy = randomGif.images.original;
		}).error(function(error){
			$scope.noGifs      = true;
			$scope.errorGif    = 'common/img/michael-scott.gif';
		})
	};

	getGif(url, params);

	$scope.getNextGif = function() {
		getGif(url, params);
	};

	$scope.closeDialog = function() {
		$mdDialog.cancel();
	};

});