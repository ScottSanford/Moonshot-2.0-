

angular.module('moonshotApp')

.controller('ReportsCtrl', function($scope, Reporting, Mfly, Weather, darkSky, $q){

    jQuery(function ($) {
        $(".tile").height($("#tile1").width());
        $(".carousel").height($("#tile1").width());
        $(".item").height($("#tile1").width());
        
        $(window).on('resize', function () {
            if (this.resizeTO) {
                clearTimeout(this.resizeTO);
            }
            this.resizeTO = setTimeout(function () {
                $(this).trigger('resizeEnd');

            }, 10);
        });

        $(window).on('resizeEnd', function () {
            $(".tile").height($("#tile1").width());
            $(".carousel").height($("#tile1").width());
            $(".item").height($("#tile1").width());
        });
    });

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

    Mfly.getInteractiveInfo().then(function(data){
      $scope.user = data;
    });

    Mfly.getRecentlyCreatedContent().then(function(data){
      $scope.newItems = data.length;
    })

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

    var date = Date.now();
    $scope.currentDate = date;




});


