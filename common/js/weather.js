angular.module('moonshotApp')
    .factory('Weather',function ($http, $q, darkSky) {
    	
    	var Weather = {};

        Weather.getCurrent = function() {
            var deferred = $q.defer();
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude

                darkSky.getCurrent(lat, lng).then(function(data){
                    
                    deferred.resolve(data);
                });
            });

            return deferred.promise;
        };

        Weather.getDaily = function() {
            var deferred = $q.defer();
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude

                darkSky.getDailyForecast(lat, lng).then(function(data){
                    
                    deferred.resolve(data);

                });
            });

            return deferred.promise;
        };

    	return Weather;

    });
