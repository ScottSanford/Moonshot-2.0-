angular.module('moonshotApp')

.controller('TimelineCtrl', function($scope, $location, $timeout, Mfly, Weather){

    // LEFT

    // RIGHT
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
      console.log("user data brah", data);
      $scope.user = data;
    });

    // COLLECTIONS
    Mfly.getCollections().then(function(data){
      $scope.collectionsLength = data.length;
    });

    // WEATHER
    $scope.showSpinnerWeather = true;
    $scope.showWeather = false;

    Weather.getCurrent().then(function(data){
     
      var skycons = new Skycons({color:"#999"});
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

});


