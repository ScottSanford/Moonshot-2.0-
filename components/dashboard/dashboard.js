

angular.module('moonshotApp')

.controller('DashboardCtrl', function($scope, $timeout, $location, Mfly, Weather){

    function getTimeOfDay() {
      var today = new Date()
      var curHr = today.getHours()

      if (curHr < 12) {
        return "Good Morning";
      } else if (curHr < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    };

    $scope.timeOfDay = getTimeOfDay();

    // USER
    Mfly.getInteractiveInfo().then(function(data){
      $scope.user = data;
    });

    // NEW ITEMS
    Mfly.getRecentlyCreatedContent().then(function(data){
      $scope.newItems = data.length;
    });

    // CARDS
    $scope.goToCards = function() {
        $location.url('/cards');
    };

    // COLLECTIONS
    Mfly.getCollections().then(function(data){
      $scope.collectionsLength = data.length;
    });

    $scope.goToCollections = function() {
      $location.url('/collections');
    };

    // FOLDER 
    $scope.goToHierarchy = function() {
      $location.url('/hierarchy');
    };

    // WEATHER
    $scope.showSpinnerWeather = true;
    $scope.showWeather = false;

    Weather.getCurrent().then(function(data){
     
      var skycons = new Skycons({color:"#FFF"});
      skycons.add('weatherIcon', data.currently.icon);
      skycons.play();
      
      $timeout(function(){
        $scope.showSpinnerWeather = false;
        $scope.showWeather = true;
        $scope.weather = data;
      }, getRandomLoadTime(1500,3000));

    });

    Weather.getDaily().then(function(data){
      $scope.showSpinnerWeather = false;

      $scope.dailyWeather = data.daily.data;   
    });

    function getRandomLoadTime(min, max) {
      return Math.random() * (max - min) + min;
    }

    // SETTINGS
    $scope.goToSettings = function() {
      $location.url('/settings');
    };

});


