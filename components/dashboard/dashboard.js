

angular.module('moonshotApp')

.controller('ReportsCtrl', function($scope, $location, Reporting, Mfly, Weather, darkSky, $q){

    // FOR: FOLDER LIST PAGE
    // Mfly.getFolder('__root__').then(function(data){
    //   var folders = _.filter(data, function(item){
    //     if (item.type === 'folder') {
    //       return item;
    //     }
    //   });
    //   console.log("folders bro :: ", folders);
    // })

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
    Weather.getCurrent().then(function(data){
      console.log(data);
      var skycons = new Skycons({color:"#FFF"});
      skycons.add('weatherIcon', data.currently.icon);
      skycons.play();
      
      $scope.weather = data;

    });

    Weather.getDaily().then(function(data){;
      $scope.dailyWeather = data.daily.data;
    });

});


